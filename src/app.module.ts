import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { MyListModule } from './my-list/my-list.module';
import stageServerValidationSchema from './config/config-schema';
import { getConfiguration } from './config/get-configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        () => {
          return getConfiguration(stageServerValidationSchema);
        },
      ],
      validationSchema: stageServerValidationSchema,
      envFilePath: `.env`,
    }),
    MongooseModule.forRoot(`${process.env.MONGO_DB_URI}`),
    CoreModule,
    MyListModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
