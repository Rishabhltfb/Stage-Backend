import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { MovieService } from 'src/core/services/movie.service';
import { TvShowService } from 'src/core/services/tv-show.service';
import { ErrorCodes } from 'src/error/constants/error-codes';
import { CustomErrorException } from 'src/error/exceptions/custom-error.exception';
import { ErrorHandlerService } from 'src/error/service/error-handler.service';
import { LoggingService } from 'src/log/service/log.service';
import { AddListItemRequestBody } from '../dtos/request/add-item-req.dto';
import { AddItemResponse } from '../dtos/response/add-item-res.dto';
import { MyListResponse } from '../dtos/response/my-list-res.dto';
import { RemoveItemResponse } from '../dtos/response/remove-item-res.dto';
import { ListItem } from '../entities/list-item.entity';
import { ContentType } from '../enums/content-type.enum';
import { ListItemDto } from '../interfaces/list-item.dto';
import { ListItemRepository } from '../repositories/list-item.repository';
import { MyListHelperService } from './my-list-helper.service';

@Injectable()
export class MyListService {
  constructor(
    private movieService: MovieService,
    private tvShowService: TvShowService,
    private listItemRepository: ListItemRepository,
    private loggingService: LoggingService,
    private readonly errorHandlerService: ErrorHandlerService,
    private myListHelperService: MyListHelperService,
  ) {}

  /**
   * fetch paginated my list for the provided user
   *
   * @param {string} userId - user id to filter out my list
   * @param {number} page - page for which list needs to be fetched
   * @param {number} perPage - list items per page
   * @returns {MyListResponse} paginated my list
   */
  public async fetchMyList(
    userId: string,
    page?: number,
    perPage?: number,
  ): Promise<MyListResponse> {
    page = isNaN(page) ? 1 : page;
    perPage = isNaN(perPage) ? 5 : perPage;
    const user = new Types.ObjectId(userId);

    let listItems: ListItem[] = [];
    try {
      listItems = await this.listItemRepository.fetchMyList(
        user,
        page,
        perPage,
      );
    } catch (err) {
      this.errorHandlerService.handleError(ErrorCodes.EC_0000, err);
    }

    // generate added list item response
    const myList: MyListResponse =
      await this.myListHelperService.generateMyListResponse(
        page,
        perPage,
        listItems,
      );

    return myList;
  }

  /**
   * add new item to my list using content id
   *
   * @param {AddListItemRequestBody} addListItemRequestBody - add item request body with content id
   * @returns {AddItemResponse} add item response
   */
  public async addListItem(
    addListItemRequestBody: AddListItemRequestBody,
  ): Promise<AddItemResponse> {
    // validate if content id provided is valid
    const { contentId, contentType } = addListItemRequestBody;
    let exists: boolean = false;
    if (contentType == ContentType.MOVIE) {
      exists = await this.movieService.movieExists(contentId);
    } else {
      exists = await this.tvShowService.tvShowExists(contentId);
    }

    if (!exists) {
      throw new CustomErrorException(ErrorCodes.EC_0002);
    }

    // Invalidate my list cache
    this.myListHelperService.invalidateMyListCache();

    // prepare dto to add to db
    const listItemDto: ListItemDto =
      this.myListHelperService.convertAddItemRequestToDto(
        addListItemRequestBody,
      );

    // add list item to my list in db
    let listItem: ListItem = null;
    try {
      listItem = await this.listItemRepository.addItem(listItemDto);
    } catch (err) {
      this.errorHandlerService.handleError(ErrorCodes.EC_0000, err);
    }

    // handle null response after creation issue
    if (listItem === null) {
      this.loggingService.logActions('list item is null after creation', {
        reqBody: addListItemRequestBody,
      });
      throw new CustomErrorException(ErrorCodes.EC_0000);
    }

    // generate added list item response
    const addItemResponse: AddItemResponse =
      this.myListHelperService.generateAddListItemResponse(listItem);

    return addItemResponse;
  }

  /**
   * Delete list item from db and cache
   *
   * @param {string} id - id as unique identifier for List Item document
   * @returns {boolean} - deletion success status
   */
  public async removeListItem(id: string): Promise<RemoveItemResponse> {
    // Invalidate my list cache
    this.myListHelperService.invalidateMyListCache();

    // delete from db
    try {
      const response = await this.listItemRepository.deleteListItem(id);
      this.loggingService.debugLog('Delete from db response', response);
      const removed: boolean =
        response != null && response._id.toString() == id;

      return { removed, itemCount: removed ? 1 : 0 };
    } catch (err) {
      this.errorHandlerService.handleError(ErrorCodes.EC_0000, err);
    }
  }
}
