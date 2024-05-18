interface TVShowDto {
  id: string;
  title: string;
  description: string;
  genres: Genre[];
  episodes: Array<Episode>;
}

interface Episode {
  episodeNumber: number;
  seasonNumber: number;
  releaseDate: Date;
  director: string;
  actors: string[];
}
