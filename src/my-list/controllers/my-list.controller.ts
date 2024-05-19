import { Body, Controller, Delete, Param, Post } from '@nestjs/common';

import { ApiResponse } from 'src/interface/response/api-response';
import { setApiResponse } from 'src/util/helper/helper-function';
import { AddListItemRequestBody } from '../dtos/request/add-item-req.dto';
import { AddItemResponse } from '../dtos/response/add-item-res.dto';
import { MyListService } from '../services/my-list.service';
import { RemoveItemResponse } from '../dtos/response/remove-item-res.dto';

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

  /**
   * Remove list item from my list
   *
   * @param {id} id - list item id as unique identifier
   * @returns {boolean} - deletion success/failure
   */
  @Delete('remove-item/:id')
  async removeListItem(@Param('id') id: string): Promise<ApiResponse> {
    const response: RemoveItemResponse =
      await this.myListService.removeListItem(id);

    return setApiResponse(response);
  }
}
