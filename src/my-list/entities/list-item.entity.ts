import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/core/entities/user.entity';
import { BaseModel } from 'src/interface/repository/base.model';
import { ObjectId } from 'bson';
import { ContentType } from '../enums/content-type.enum';

@Schema({ minimize: false, timestamps: true, id: true })
export class ListItem extends BaseModel {
  @Prop({ type: ObjectId, required: true, ref: User.name })
  user: User;

  @Prop({
    type: String,
    required: true,
    enum: ContentType,
  })
  contentType: ContentType;

  @Prop({ type: String, required: true })
  contentId: string;
}

export const ListItemSchema = SchemaFactory.createForClass(ListItem);
ListItemSchema.index({ user: 1 });
ListItemSchema.index({ contentId: 1 });
ListItemSchema.index({ user: 1, contentId: 1 });
