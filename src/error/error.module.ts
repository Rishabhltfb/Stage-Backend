import { Module } from '@nestjs/common';
import { LoggingService } from '../log/service/log.service';
import { ErrorHandlerService } from './service/error-handler.service';
import { ErrorHelperService } from './service/error-helper.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ErrorHandlerService, LoggingService, ErrorHelperService],
  exports: [ErrorHandlerService],
})
export class ErrorHandlerModule {}
