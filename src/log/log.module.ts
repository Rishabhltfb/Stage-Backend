import { Module } from '@nestjs/common';
import { LoggingService } from './service/log.service';

@Module({
  imports: [],
  controllers: [],
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LogModule {}
