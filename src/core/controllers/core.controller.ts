import { Controller, Headers, Post } from '@nestjs/common';

import { ApiResponse } from '../../interface/response/api-response';
import { setApiResponse } from '../../util/helper/helper-function';
import { PopulateCoreDataScript } from '../scripts/populate-core-data.script';
import { AppConstants } from '../../util/constants/app.constant';

@Controller('api/v1/core')
export class CoreController {
  constructor(
    private readonly populateCoreDataScript: PopulateCoreDataScript,
  ) {}

  /**
   * Populate user to db
   *
   * @returns {String} - success/failure response
   */
  @Post('populate-user')
  async populateUser(
    @Headers(AppConstants.privateApiHeaderKey) secret: string,
  ): Promise<ApiResponse> {
    const response: String = await this.populateCoreDataScript.populateUser(
      secret,
    );

    return setApiResponse(response);
  }

  /**
   * Populate movies to db
   *
   * @returns {String} - success/failure response
   */
  @Post('populate-movies')
  async populateMovies(
    @Headers(AppConstants.privateApiHeaderKey) secret: string,
  ): Promise<ApiResponse> {
    const response: String = await this.populateCoreDataScript.populateMovies(
      secret,
    );

    return setApiResponse(response);
  }

  /**
   * Populate tv shows to db
   *
   * @returns {String} - success/failure response
   */
  @Post('populate-tvShows')
  async populateTvShows(
    @Headers(AppConstants.privateApiHeaderKey) secret: string,
  ): Promise<ApiResponse> {
    const response: String = await this.populateCoreDataScript.populateTvShows(
      secret,
    );

    return setApiResponse(response);
  }
}
