import { Injectable } from '@nestjs/common';
import { ErrorCodes } from 'src/error/constants/error-codes';
import { ErrorHandlerService } from 'src/error/service/error-handler.service';
import { MovieRepository } from '../repositories/movie.repository';
import { TvShowRepository } from '../repositories/tv-shows.repository';

@Injectable()
export class TvShowService {
  constructor(
    private tvShowRepository: TvShowRepository,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  /**
   * check if tv show exists in db
   *
   * @param {string} id - tv show document id
   * @returns {boolean} exists or not
   */
  public async tvShowExists(id: string): Promise<boolean> {
    try {
      const tvShow = await this.tvShowRepository.findById(id);
      return tvShow != null;
    } catch (err) {
      this.errorHandlerService.handleError(ErrorCodes.EC_0003, err);
    }
  }
}
