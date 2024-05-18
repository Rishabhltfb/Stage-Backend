import { Body, Controller, Post } from '@nestjs/common';

import { ApiResponse } from 'src/interface/response/api-response';
import { setApiResponse } from 'src/util/helper/helper-function';
import { AddListItemRequestBody } from '../dtos/request/add-item-req.dto';
import { AddItemResponse } from '../dtos/response/add-item-res.dto';
import { MyListService } from '../services/my-list.service';

@Controller('api/v1/my-list')
export class MyListController {
  constructor(private readonly myListService: MyListService) {}

  /**
   * Add content item to my list
   *
   * @param {AddListItemRequestBody} addListItemRequestBody - list item req body
   * @returns {AddItemResponse} - added item response data
   */
  @Post('add-item')
  async addListItem(
    @Body() addListItemRequestBody: AddListItemRequestBody,
  ): Promise<ApiResponse> {
    const response: AddItemResponse = await this.myListService.addListItem(
      addListItemRequestBody,
    );

    return setApiResponse(response);
  }
}
