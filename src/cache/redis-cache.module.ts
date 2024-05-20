import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { RedisCacheService } from './redis-cache.service';
import { getRedisOptions } from '../config/redis-options.config';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisModule } from 'nestjs-redis';
import { RedisClientService } from './redis-client.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return await getRedisOptions({
          store: redisStore,
        });
      },
      isGlobal: true,
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return await getRedisOptions();
      },
    }),
    ScheduleModule.forRoot(),
  ],
  providers: [RedisClientService, RedisCacheService],
  exports: [RedisCacheService, RedisClientService],
})
export class RedisCacheModule {}
