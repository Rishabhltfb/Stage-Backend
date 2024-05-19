import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/core/entities/user.entity';
import { BaseModel } from 'src/interface/repository/base.model';
import { ObjectId } from 'bson';
import { ContentType } from '../enums/content-type.enum';
import { Movie } from 'src/core/entities/movie.entity';
import { TvShow } from 'src/core/entities/tv-show.entity';

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

  @Prop({ type: ObjectId, ref: Movie.name })
  movie: Movie;

  @Prop({ type: ObjectId, ref: TvShow.name })
  tvShow: TvShow;
}

export const ListItemSchema = SchemaFactory.createForClass(ListItem);
ListItemSchema.index({ user: 1 });
