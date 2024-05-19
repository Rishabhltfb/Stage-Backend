import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Redis } from 'ioredis';

@Injectable()
export class RedisClientService {
  private readonly client: Redis;

  private logger: Logger = new Logger(RedisClientService.name, {
    timestamp: true,
  });

  constructor(private redisService: RedisService) {
    this.client = redisService.getClient();
    this.client.on('error', (err) => this.logger.error('Redis Error:', err));
    this.client.on('connect', () => this.logger.log('Connected to redis'));
    this.client.on('ready', () => this.logger.log('Redis is ready'));
    this.client.on('reconnecting', () => this.logger.log('Reconnecting redis'));
    this.client.on('end', () => this.logger.log('Redis end'));
  }

  private async onModuleDestroy() {
    await this.client.quit();
    this.logger.log('closed redis connection');
  }

  public getClient() {
    return this.client;
  }

  @Cron(CronExpression.EVERY_MINUTE)
  private ping() {
    this.client.ping();
  }
}
