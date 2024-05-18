import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { LoggingService } from 'src/log/service/log.service';
import { ErrorHandlerService } from 'src/error/service/error-handler.service';
import { ErrorCodes } from 'src/error/constants/error-codes';
import { CustomErrorException } from 'src/error/exceptions/custom-error.exception';

@Injectable()
export class PopulateCoreDataScript {
  private apiSecret;

  constructor(
    private userRepository: UserRepository,
    private loggingService: LoggingService,
    private errorHandlerService: ErrorHandlerService,
  ) {
    this.apiSecret = process.env.API_SECRET;
  }

  /**
   * Populate the db with dummy user
   *
   */
  public async populateUser(secret: string): Promise<boolean> {
    this.validateSecret(secret);

    const favoriteGenres: Genre[] = ['Action', 'Comedy', 'SciFi'];
    const dislikedGenres: Genre[] = ['Horror'];

    const dummyUser: UserDto = {
      username: 'Rishabh',
      preferences: { dislikedGenres, favoriteGenres },
      watchHistory: [],
    };
    try {
      const createdUser = await this.userRepository.save(dummyUser);
      this.loggingService.logInfo('Created dummy user', createdUser);
      return true;
    } catch (err) {
      this.errorHandlerService.handleError(ErrorCodes.EC_0000, err);
    }
    return false;
  }

  private validateSecret(secret: string): boolean {
    if (secret != this.apiSecret) {
      throw new CustomErrorException(ErrorCodes.EC_0001);
    }
    return true;
  }
}
