import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseModel } from '../../interface/repository/base.model';

@Schema({ minimize: false, timestamps: true, id: true })
export class User extends BaseModel {
  @Prop({ type: String, unique: true, required: true })
  username: string;

  @Prop({ required: true, type: Object })
  preferences: Preferences;

  @Prop({ required: true, type: Array<Object> })
  watchHistory: Array<WatchHistory>;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ username: 1 });
