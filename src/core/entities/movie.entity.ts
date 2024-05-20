import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseModel } from '../../interface/repository/base.model';

@Schema({ minimize: false, timestamps: true, id: true })
export class Movie extends BaseModel {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Array<String>, default: [] })
  genres: Array<Genre>;

  @Prop({ type: Date })
  releaseDate: Date;

  @Prop({ type: String })
  director: string;

  @Prop({ type: Array<String>, default: [] })
  actors: Array<String>;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
