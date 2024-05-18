import { ErrorMessageConstants } from 'src/util/constants/err-msg.constant';

export class MongoErrorCodes {
  static DUPLICATE_KEY = 11000;
}

export enum ErrorCodes {
  // Common
  EC_0000 = 'EC_0000',
}

// EC = Error Code
export const errorCodeMap = {
  // Common
  [ErrorCodes.EC_0000]: ErrorMessageConstants.SOMETHING_WENT_WRONG,
};
