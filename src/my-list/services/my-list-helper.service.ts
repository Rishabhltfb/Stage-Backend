import { Injectable } from '@nestjs/common';
import { ErrorHandlerService } from '../../error/service/error-handler.service';
import { LoggingService } from '../../log/service/log.service';
import { AddListItemRequestBody } from '../dtos/request/add-item-req.dto';
import { ListItemDto } from '../interfaces/list-item.dto';
import { Types } from 'mongoose';
import { AppConstants } from '../../util/constants/app.constant';
import { ListItem } from '../entities/list-item.entity';
import { AddItemResponse } from '../dtos/response/add-item-res.dto';
import {
  ListItemResponse,
  MyListResponse,
} from '../dtos/response/my-list-res.dto';
import { ContentType } from '../enums/content-type.enum';
import { Movie } from '../../core/entities/movie.entity';
import { TvShow } from '../../core/entities/tv-show.entity';
import { RedisCacheService } from '../../cache';

@Injectable()
export class MyListHelperService {
  constructor(
    private loggingService: LoggingService,
    private readonly errorHandlerService: ErrorHandlerService,
    private redisCacheService: RedisCacheService,
  ) {}

  /**
   * clear my list cache from redis store
   *
   */
  public async invalidateMyListCache() {
    const allRedisKeys = await this.redisCacheService.allKeys();
    for (let index in allRedisKeys) {
      const key = allRedisKeys[index];
      if (key.includes(AppConstants.controllerKey)) {
        this.redisCacheService.del(key);
      }
    }
    this.loggingService.logInfo('Invalidated my list cache');
  }

  /**
   * generate my list response from list items entity objects
   *
   * @param {number} page - list page
   * @param {number} perPage - list items per page
   * @param {ListItem[]} list - my list items entity objects
   * @returns {MyListResponse} return my list response
   */
  public async generateMyListResponse(
    page: number,
    perPage: number,
    list: ListItem[],
  ): Promise<MyListResponse> {
    const listItemResponses: ListItemResponse[] = [];

    // populate list items with movie & tv show data usign fks
    for (let i = 0; i < list.length; i += 1) {
      let item: ListItem = list[i];
      const { contentType } = item;
      let content: Movie | TvShow = null;

      if (contentType == ContentType.MOVIE) {
        (
          await item.populate({
            path: 'movie',
            select: '-__v -updatedAt', // Excluded fields while populating
          })
        ).toObject();
        content = item.movie;
      } else {
        (
          await item.populate({
            path: 'tvShow',
            select: '-__v -updatedAt', // Excluded fields while populating
          })
        ).toObject();
        content = item.tvShow;
      }

      const listItemResponse: ListItemResponse = {
        id: item._id.toString(),
        contentType: contentType,
        content: content,
      };
      listItemResponses.push(listItemResponse);
    }

    // feed generate list to response interface
    const mylist: MyListResponse = {
      page,
      perPage,
      myList: listItemResponses,
      count: listItemResponses.length,
    };

    return mylist;
  }

  /**
   * convert add item request body to list item dto
   *
   * @param {AddListItemRequestBody} addListItemRequestBody - add list item req body
   * @returns {ListItemDto} list item dto
   */
  public convertAddItemRequestToDto(
    addListItemRequestBody: AddListItemRequestBody,
  ): ListItemDto {
    const { contentId, contentType } = addListItemRequestBody;
    const userId = AppConstants.authorizedUserId;
    const isMovie: boolean = contentType == ContentType.MOVIE;

    const listItemDto: ListItemDto = {
      user: new Types.ObjectId(userId),
      contentType,
      movie: isMovie ? new Types.ObjectId(contentId) : null,
      tvShow: isMovie ? null : new Types.ObjectId(contentId),
    };

    return listItemDto;
  }

  /**
   * generate add list item response from list item entity
   *
   * @param {ListItem} listItem - list item entity object
   * @returns {AddItemResponse} add item response
   */
  public generateAddListItemResponse(listItem: ListItem): AddItemResponse {
    const { _id: id } = listItem;

    const listItemDto: AddItemResponse = {
      id: id.toString(),
    };

    return listItemDto;
  }
}
