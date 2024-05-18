import { BadRequestException, Logger } from '@nestjs/common';
import { CustomError } from 'src/interface/error/error.interface';
import { ApiResponse } from 'src/interface/response/api-response';
import { errorCodeMap } from '../constants/error-codes';

export class CustomErrorException extends BadRequestException {
  private logger: Logger = new Logger(CustomErrorException.name, {
    timestamp: true,
  });
  constructor(errorCode: string, errorMessage?: string) {
    const errResponse: ApiResponse = {
      success: false,
      error: new CustomError(
        errorCode,
        errorMessage ?? errorCodeMap[errorCode],
      ),
    };
    super(errResponse);
    this.logger.log(`Api error response: `, errResponse);
  }
}
