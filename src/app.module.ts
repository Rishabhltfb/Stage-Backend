import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [],
      envFilePath: `.env.${process.env.STAGE}`,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.n5yokp0.mongodb.net/${process.env.DB_Name}`,
    ),
    CoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
