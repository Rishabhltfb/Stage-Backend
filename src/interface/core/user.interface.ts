interface UserDto {
  id?: string;
  username: string;
  preferences: Preferences;
  watchHistory: Array<WatchHistory>;
}

interface Preferences {
  favoriteGenres: Genre[];
  dislikedGenres: Genre[];
}

interface WatchHistory {
  contentId: string;
  watchedOn: Date;
  rating?: number;
}
