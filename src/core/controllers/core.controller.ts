import { Controller, Headers, Post } from '@nestjs/common';

import { ApiResponse } from 'src/interface/response/api-response';
import { setApiResponse } from 'src/util/helper/helper-function';
import { PopulateCoreDataScript } from '../scripts/populate-core-data.script';
import { AppConstants } from 'src/util/constants/app.constant';

@Controller('api/v1/core')
export class CoreController {
  constructor(
    private readonly populateCoreDataScript: PopulateCoreDataScript,
  ) {}

  /**
   * Populate user to db
   *
   * @returns {bool} - success response
   */
  @Post('populate-user')
  async populateUser(
    @Headers(AppConstants.privateApiHeaderKey) secret: string,
  ): Promise<ApiResponse> {
    const response: boolean = await this.populateCoreDataScript.populateUser(
      secret,
    );

    return setApiResponse(response);
  }
}
