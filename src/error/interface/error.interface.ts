import { ErrorCodes } from '../constants/error-codes';
import { ErrorMessageConstants } from '../../util/constants/err-msg.constant';

export type ErrorLog = {
  code: number | string;
  msg: string;
  customErrorMsg: string;
  stack: any;
};

export class CustomError {
  private readonly errorCode: ErrorCodes;
  private readonly message: string;

  constructor(errorCode?: ErrorCodes, message?: string) {
    this.errorCode = errorCode;
    this.message = message ?? ErrorMessageConstants.SOMETHING_WENT_WRONG;
  }
  public getErrorCode() {
    return this.errorCode;
  }
  public getMessage() {
    return this.message;
  }
}
