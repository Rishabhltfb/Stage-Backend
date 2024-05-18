import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ErrorHandlerModule } from '../error/error.module';
import { LogModule } from '../log/log.module';
import { User, UserSchema } from './entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    LogModule,
    ErrorHandlerModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class CoreModule {}
