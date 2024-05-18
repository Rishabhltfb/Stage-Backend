import { Injectable } from '@nestjs/common';
import { ErrorHandlerService } from 'src/error/service/error-handler.service';
import { LoggingService } from 'src/log/service/log.service';
import { AddListItemRequestBody } from '../dtos/request/add-item-req.dto';
import { ListItemDto } from '../interfaces/list-item.dto';
import { Types } from 'mongoose';
import { AppConstants } from 'src/util/constants/app.constant';
import { ListItem } from '../entities/list-item.entity';
import { AddItemResponse } from '../dtos/response/add-item-res.dto';

@Injectable()
export class MyListHelperService {
  constructor(
    private loggingService: LoggingService,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  public convertAddItemRequestToDto(
    addListItemRequestBody: AddListItemRequestBody,
  ): ListItemDto {
    const { contentId, contentType } = addListItemRequestBody;
    const userId = AppConstants.authorizedUserId;

    const listItemDto: ListItemDto = {
      user: new Types.ObjectId(userId),
      contentId,
      contentType,
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
