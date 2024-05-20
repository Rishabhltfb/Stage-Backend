import { Injectable } from '@nestjs/common';
import { ErrorCodes } from 'src/error/constants/error-codes';
import { ErrorHandlerService } from 'src/error/service/error-handler.service';
import { MovieRepository } from '../repositories/movie.repository';

@Injectable()
export class MovieService {
  constructor(
    private movieRepository: MovieRepository,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  /**
   * check if movie exists in db
   *
   * @param {string} id - movie document id
   * @returns {boolean} exists or not
   */
  public async movieExists(id: string): Promise<boolean> {
    try {
      const movie = await this.movieRepository.findById(id);
      return movie != null;
    } catch (err) {
      this.errorHandlerService.handleError(ErrorCodes.EC_0002, err);
    }
  }
}
