import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ErrorHandlerModule } from '../error/error.module';
import { LogModule } from '../log/log.module';
import { ListItem, ListItemSchema } from './entities/list-item.entity';
import { MyListService } from './services/my-list.service';
import { MyListHelperService } from './services/my-list-helper.service';
import { MyListController } from './controllers/my-list.controller';
import { ListItemRepository } from './repositories/list-item.repository';
import { RedisCacheModule } from 'src/cache';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ListItem.name, schema: ListItemSchema },
    ]),
    LogModule,
    ErrorHandlerModule,
    RedisCacheModule,
    CoreModule,
  ],
  controllers: [MyListController],
  providers: [MyListService, MyListHelperService, ListItemRepository],
  exports: [],
})
export class MyListModule {}
