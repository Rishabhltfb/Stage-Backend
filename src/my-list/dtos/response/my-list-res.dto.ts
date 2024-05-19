import { Movie } from 'src/core/entities/movie.entity';
import { TvShow } from 'src/core/entities/tv-show.entity';
import { ListItem } from 'src/my-list/entities/list-item.entity';
import { ContentType } from 'src/my-list/enums/content-type.enum';

export interface MyListResponse {
  myList: Array<ListItemResponse>;
  count: number;
  page: number;
  perPage: number;
}

export interface ListItemResponse {
  contentType: ContentType;
  content: Movie | TvShow;
}
