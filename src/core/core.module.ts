import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ErrorHandlerModule } from '../error/error.module';
import { LogModule } from '../log/log.module';
import { User, UserSchema } from './entities/user.entity';
import { CoreController } from './controllers/core.controller';
import { PopulateCoreDataScript } from './scripts/populate-core-data.script';
import { UserRepository } from './repositories/user.repository';
import { Movie, MovieSchema } from './entities/movie.entity';
import { TvShow, TvShowSchema } from './entities/tv-show.entity';
import { MovieRepository } from './repositories/movie.repository';
import { TvShowRepository } from './repositories/tv-shows.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Movie.name, schema: MovieSchema },
      { name: TvShow.name, schema: TvShowSchema },
    ]),
    LogModule,
    ErrorHandlerModule,
  ],
  controllers: [CoreController],
  providers: [
    PopulateCoreDataScript,
    UserRepository,
    MovieRepository,
    TvShowRepository,
  ],
  exports: [],
})
export class CoreModule {}
