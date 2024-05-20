import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BaseRepository } from '../../interface/repository/base.abstract.repository';
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
   * fetch paginated my list
   *
   * @param {number} page - the page to fetch
   * @param {number} perPage - number of items per page
   * @returns {ListItem[]} - list of items
   */
  public async fetchMyList(
    userId: Types.ObjectId,
    page: number,
    perPage: number,
  ): Promise<ListItem[]> {
    // Validate page and perPage parameters
    if (page < 1 || perPage < 1) {
      throw new Error(
        'Invalid pagination parameters. Page and perPage must be positive integers.',
      );
    }

    // Filter by userId - for user specific items
    const query = { user: userId };

    // Calculate pagination offset based on page and perPage
    const offset = (page - 1) * perPage;

    // Fetch list items with pagination and sorting by creation date (descending)
    const myList = await this.listItemModel
      .find(query)
      .sort({ createdAt: -1 }) // Sort by creation date in descending order
      .skip(offset) // Apply pagination offset
      .limit(perPage); // Limit results to perPage

    return myList;
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
