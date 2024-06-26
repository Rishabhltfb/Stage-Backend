import { IsEnum, IsString } from 'class-validator';
import { ContentType } from '../../enums/content-type.enum';

export class AddListItemRequestBody {
  @IsString()
  contentId: string;

  @IsEnum(ContentType, { message: 'Please provide a valid content type' })
  contentType: ContentType;
}
