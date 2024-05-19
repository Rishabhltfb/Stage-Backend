import { Injectable } from '@nestjs/common';
import { ErrorHandlerService } from 'src/error/service/error-handler.service';
import { LoggingService } from 'src/log/service/log.service';
import { AddListItemRequestBody } from '../dtos/request/add-item-req.dto';
import { ListItemDto } from '../interfaces/list-item.dto';
import { Types } from 'mongoose';
import { AppConstants } from 'src/util/constants/app.constant';
import { ListItem } from '../entities/list-item.entity';
import { AddItemResponse } from '../dtos/response/add-item-res.dto';
import {
  ListItemResponse,
  MyListResponse,
} from '../dtos/response/my-list-res.dto';
import { ContentType } from '../enums/content-type.enum';
import { Movie } from 'src/core/entities/movie.entity';
import { TvShow } from 'src/core/entities/tv-show.entity';

@Injectable()
export class MyListHelperService {
  constructor(
    private loggingService: LoggingService,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  public async generateMyListResponse(
    page: number,
    perPage: number,
    list: ListItem[],
  ): Promise<MyListResponse> {
    const listItemResponses: ListItemResponse[] = [];
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

  public generateAddListItemResponse(listItem: ListItem): AddItemResponse {
    const { _id: id } = listItem;

    const listItemDto: AddItemResponse = {
      id: id.toString(),
    };

    return listItemDto;
  }
}
