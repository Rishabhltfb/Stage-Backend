import { Injectable } from '@nestjs/common';
import { AddListItemRequestBody } from '../dtos/request/add-item-req.dto';
import { ListItemRepository } from '../repositories/list-item.repository';
import { LoggingService } from 'src/log/service/log.service';
import { ErrorHandlerService } from 'src/error/service/error-handler.service';
import { ListItem } from '../entities/list-item.entity';
import { AddItemResponse } from '../dtos/response/add-item-res.dto';
import { MyListHelperService } from './my-list-helper.service';
import { ErrorCodes } from 'src/error/constants/error-codes';
import { ListItemDto } from '../interfaces/list-item.dto';
import { CustomErrorException } from 'src/error/exceptions/custom-error.exception';
import { RemoveItemResponse } from '../dtos/response/remove-item-res.dto';
import { Types } from 'mongoose';
import { MyListResponse } from '../dtos/response/my-list-res.dto';

@Injectable()
export class MyListService {
  constructor(
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

    // TODO: check if exists in cache

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
    // TODO: validate if content id vaild

    const listItemDto: ListItemDto =
      this.myListHelperService.convertAddItemRequestToDto(
        addListItemRequestBody,
      );

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
    // TODO: delete entry from cache

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