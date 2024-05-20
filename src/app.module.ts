import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { MyListModule } from './my-list/my-list.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [],
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
