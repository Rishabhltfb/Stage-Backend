import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/interface/repository/base.abstract.repository';
import { Movie } from '../entities/movie.entity';
@Injectable()
export class MovieRepository extends BaseRepository<Movie> {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {
    super(movieModel);
  }

  /**
   * Save all the movies provided in the movie list to Movie collection
   *
   * @param {MovieDto[]} movies - movie list dtos that needs to be saved
   * @returns {Movie[]} - saved movie list documents
   */
  public async saveMovies(movies: MovieDto[]): Promise<Movie[]> {
    const createdDocuments = await this.movieModel.insertMany(movies);
    return createdDocuments;
  }
}
