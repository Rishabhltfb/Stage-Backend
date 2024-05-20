import { BadRequestException, Logger } from '@nestjs/common';
import { CustomError } from '../interface/error.interface';
import { ApiResponse } from '../../interface/response/api-response';
import { ErrorCodes, errorCodeMap } from '../constants/error-codes';

export class CustomErrorException extends BadRequestException {
  private logger: Logger = new Logger(CustomErrorException.name, {
    timestamp: true,
  });
  constructor(errorCode: ErrorCodes, errorMessage?: string) {
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
