import { Module } from '@nestjs/common';
import { LogModule } from 'src/log/log.module';
import { ErrorHandlerService } from './service/error-handler.service';
import { LoggingService } from 'src/log/service/log.service';
import { ErrorHelperService } from './service/error-helper.service';

@Module({
  imports: [LogModule],
  controllers: [],
  providers: [ErrorHandlerService, LoggingService, ErrorHelperService],
  exports: [ErrorHandlerService],
})
export class ErrorHandlerModule {}
