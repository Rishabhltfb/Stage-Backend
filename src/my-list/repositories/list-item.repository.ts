import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/interface/repository/base.abstract.repository';
import { ListItem } from '../entities/list-item.entity';
import { ListItemDto } from '../interfaces/list-item.dto';

@Injectable()
export class ListItemRepository extends BaseRepository<ListItem> {
  constructor(
    @InjectModel(ListItem.name) private listItemModel: Model<ListItem>,
  ) {
    super(listItemModel);
  }

  /**
   * add item to my list
   *
   * @param {ListItemDto} listItemDto - list item dto
   * @returns {ListItem} - added list item doc
   */
  public async addItem(listItemDto: ListItemDto) {
    return this.listItemModel.create(listItemDto);
  }

  /**
   * Delete list item from db
   *
   * @param {string} id - id as unique identifier
   * @returns {DeleteResult} - acknowledgement and delete count
   */
  public async deleteListItem(id: string) {
    return await this.listItemModel.findByIdAndDelete(id);
  }
}
