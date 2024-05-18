import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ErrorHandlerModule } from '../error/error.module';
import { LogModule } from '../log/log.module';
import { User, UserSchema } from './entities/user.entity';
import { CoreController } from './controllers/core.controller';
import { PopulateCoreDataScript } from './scripts/populate-core-data.script';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    LogModule,
    ErrorHandlerModule,
  ],
  controllers: [CoreController],
  providers: [PopulateCoreDataScript, UserRepository],
  exports: [],
})
export class CoreModule {}
