import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { LoggingService } from 'src/log/service/log.service';
import { ErrorHandlerService } from 'src/error/service/error-handler.service';
import { ErrorCodes } from 'src/error/constants/error-codes';
import { CustomErrorException } from 'src/error/exceptions/custom-error.exception';
import { dummyMovies, dummyTvShows, dummyUser } from '../data/dummy.data';
import { MovieRepository } from '../repositories/movie.repository';
import { TvShowRepository } from '../repositories/tv-shows.repository';

@Injectable()
export class PopulateCoreDataScript {
  private apiSecret;

  constructor(
    private userRepository: UserRepository,
    private movieRepository: MovieRepository,
    private tvShowRepository: TvShowRepository,
    private loggingService: LoggingService,
    private errorHandlerService: ErrorHandlerService,
  ) {
    this.apiSecret = process.env.API_SECRET;
  }

  /**
   * Populate the db with dummy user
   *
   */
  public async populateUser(secret: string): Promise<String> {
    this.validateSecret(secret);

    const user: UserDto = dummyUser;
    try {
      const createdUser = await this.userRepository.save(user);
      this.loggingService.logInfo('Created dummy user', createdUser);
      return 'Successfully populated user!';
    } catch (err) {
      this.errorHandlerService.handleError(ErrorCodes.EC_0000, err);
    }
    return 'Failed to populate user!';
  }

  /**
   * Populate the db with dummy user
   *
   */
  public async populateMovies(secret: string): Promise<String> {
    this.validateSecret(secret);
    const movies: MovieDto[] = dummyMovies;

    try {
      const createdMovieDocuments = await this.movieRepository.saveMovies(
        movies,
      );
      this.loggingService.logInfo(
        'Populated dummy movies count',
        createdMovieDocuments.length,
      );
      return 'Successfully populated movies!';
    } catch (err) {
      this.errorHandlerService.handleError(ErrorCodes.EC_0000, err);
    }
    return 'Failed to populate movies!';
  }

  /**
   * Populate the db with dummy user
   *
   */
  public async populateTvShows(secret: string): Promise<String> {
    this.validateSecret(secret);
    const tvShows: TVShowDto[] = dummyTvShows;

    try {
      const createdTvShowDocuments = await this.tvShowRepository.saveTvShows(
        tvShows,
      );
      this.loggingService.logInfo(
        'Populated dummy tv shows count',
        createdTvShowDocuments.length,
      );
      return 'Successfully populated tv shows!';
    } catch (err) {
      this.errorHandlerService.handleError(ErrorCodes.EC_0000, err);
    }
    return 'Failed to populate tv shows!';
  }

  private validateSecret(secret: string): boolean {
    if (secret != this.apiSecret) {
      throw new CustomErrorException(ErrorCodes.EC_0001);
    }
    return true;
  }
}
