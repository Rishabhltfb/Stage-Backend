import { Injectable } from '@nestjs/common';
import { CustomErrorException } from '../exceptions/custom-error.exception';
import { ErrorHelperService } from './error-helper.service';
import { LoggingService } from 'src/log/service/log.service';
import {
  ErrorCodes,
  MongoErrorCodes,
  errorCodeMap,
} from '../constants/error-codes';
import { ErrorLog } from 'src/error/interface/error.interface';

@Injectable()
export class ErrorHandlerService {
  constructor(
    private errorHelperService: ErrorHelperService,
    private loggingService: LoggingService,
  ) {}

  /**
   * Handle all types of errors
   *
   * @param {ErrorCodes} customErrorCode - custom err code
   * @param {any} err - error object
   * @throws {CustomErrorException} - handled custom error exception
   */
  public handleError(customErrorCode: ErrorCodes, err: any): void {
    if (err instanceof CustomErrorException) {
      // rethrow custom errors, need not to catch them
      throw err;
    } else if (this.errorHelperService.isMongoError(err.name)) {
      this.handleMongoErrors(customErrorCode, err);
    } else if (err instanceof Error && err.name === 'ReferenceError') {
      this.handleRefrenceError(customErrorCode, err);
    }

    // Handle all other unknown errors
    this.loggingService.logActions('unknown error', err);
    const errorLog: ErrorLog = {
      code: err.code,
      customErrorMsg: errorCodeMap[customErrorCode],
      msg: err.msg,
      stack: err.stack,
    };
    this.loggingService.logErrors('unknown error', errorLog);
    throw new CustomErrorException(customErrorCode);
  }

  // Handle MongoDB-specific errors
  private handleMongoErrors(customErrorCode: ErrorCodes, err: any): void {
    // Filter what kind of error and based on that find error code and messages
    switch (err.name) {
      case 'ValidationError': {
        // This error occurs when the validation of a document fails. It includes information about the validation errors, such as missing required fields or invalid field values.
        this.loggingService.logActions('mongo validation error:', err);
        break;
      }
      case 'CastError': {
        // This error occurs when a value cannot be cast to the expected data type defined in the schema. For example, if you try to assign a string to a number field, a CastError will be thrown.
        this.loggingService.logActions('mongo cast error:', err);
        break;
      }
      case 'MongoServerError': {
        // This error is a general MongoDB error that can occur in various situations, such as duplicate key errors, write conflicts, or issues with the database connection.
        if (err.code === MongoErrorCodes.DUPLICATE_KEY) {
          const fields = Object.keys(err.keyPattern).map((field) => {
            return field;
          });
          this.loggingService.logActions('duplicate key err:', {
            duplicateKeys: fields,
          });
        } else {
          this.loggingService.logActions('mongo server error:', err);
        }

        break;
      }
      case 'DocumentNotFoundError': {
        // This error occurs when a document cannot be found in the database based on the provided query criteria.
        this.loggingService.logActions('mongo doc not found error:', err);
        break;
      }
      case 'BulkWriteError': {
        // This error occurs when there is an error performing a bulk write operation, such as a bulk insert or update operation.
        this.loggingService.logActions('mongo bulk write error:', err);
        break;
      }
      case 'VersionError': {
        // This error occurs when there is a version conflict during document updates, indicating that the document has been modified since it was last retrieved.
        this.loggingService.logActions('mongo version error:', err);
        break;
      }
      default: {
        this.loggingService.logActions('mongo unknown error:', err);
        break;
      }
    }

    const errorLog: ErrorLog = {
      code: err.code,
      msg: '',
      customErrorMsg: errorCodeMap[customErrorCode],
      stack: err,
    };
    this.loggingService.logErrors('mongo error: ', errorLog);

    throw new CustomErrorException(customErrorCode);
  }

  // Handle JavaScript reference errors
  private handleRefrenceError(customErrorCode: ErrorCodes, err: any) {
    this.loggingService.logActions('refrence error', err);
    const errorLog: ErrorLog = {
      code: customErrorCode,
      msg: err.message,
      customErrorMsg: errorCodeMap[customErrorCode],
      stack: err.stack,
    };
    this.loggingService.logErrors('refrence error', errorLog);
    throw new CustomErrorException(customErrorCode);
  }
}
