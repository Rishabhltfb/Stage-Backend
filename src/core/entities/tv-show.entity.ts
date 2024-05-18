import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseModel } from 'src/interface/repository/base.model';

@Schema({ minimize: false, timestamps: true, id: true })
export class TvShow extends BaseModel {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Array<String>, default: [] })
  genres: Array<Genre>;

  @Prop({ required: true, type: Array<Object> })
  episodes: Array<Episode>;
}

export const TvShowSchema = SchemaFactory.createForClass(TvShow);
