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

@Injectable()
export class MyListService {
  constructor(
    private listItemRepository: ListItemRepository,
    private loggingService: LoggingService,
    private readonly errorHandlerService: ErrorHandlerService,
    private myListHelperService: MyListHelperService,
  ) {}

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
  public async deleteUser(id: string): Promise<boolean> {
    // TODO: delete entry from cache

    // delete from db
    const response = await this.listItemRepository.deleteListItem(id);
    this.loggingService.debugLog('Delete from db response', response);
    return true;
  }
}
