import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorHelperService {
  constructor() {}

  public isMongoError(errName?: string): boolean {
    if (!errName) return false;
    const mongoErrNames = [
      'VersionError',
      'BulkWriteError',
      'DocumentNotFoundError',
      'MongoServerError',
      'CastError',
      'ValidationError',
    ];

    return mongoErrNames.includes(errName);
  }
}
