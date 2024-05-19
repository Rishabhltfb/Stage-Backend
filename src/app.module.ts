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
      envFilePath: `.env.${process.env.STAGE}`,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.n5yokp0.mongodb.net/${process.env.DB_Name}`,
    ),
    CoreModule,
    MyListModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
