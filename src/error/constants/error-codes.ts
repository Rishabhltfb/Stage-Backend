import { ErrorMessageConstants } from 'src/util/constants/err-msg.constant';

export class MongoErrorCodes {
  static DUPLICATE_KEY = 11000;
}

export enum ErrorCodes {
  // Common
  EC_0000 = 'EC_0000',
  EC_0001 = 'EC_0001',
  EC_0002 = 'EC_0002',
  EC_0003 = 'EC_0003',
  EC_0004 = 'EC_0004',
  EC_0005 = 'EC_0005',
}

// EC = Error Code
export const errorCodeMap = {
  [ErrorCodes.EC_0000]: ErrorMessageConstants.SOMETHING_WENT_WRONG,
  [ErrorCodes.EC_0001]: ErrorMessageConstants.INVALID_API_SECRET,
  [ErrorCodes.EC_0002]: ErrorMessageConstants.MOVIE_NOT_AVAILABLE,
  [ErrorCodes.EC_0003]: ErrorMessageConstants.TV_SHOW_NOT_AVAILABLE,
  [ErrorCodes.EC_0004]: ErrorMessageConstants.CONTENT_NOT_AVAILABLE,
  [ErrorCodes.EC_0005]: ErrorMessageConstants.CONTENT_ALREAY_EXISTS,
};
