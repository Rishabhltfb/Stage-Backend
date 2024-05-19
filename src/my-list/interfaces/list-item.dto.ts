import { Types } from 'mongoose';
import { ContentType } from '../enums/content-type.enum';

export interface ListItemDto {
  user: Types.ObjectId;
  contentType: ContentType;
  movie?: Types.ObjectId;
  tvShow?: Types.ObjectId;
}
