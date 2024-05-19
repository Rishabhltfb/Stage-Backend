import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class RedisCacheService {
  private logger: Logger = new Logger(RedisCacheService.name, {
    timestamp: true,
  });

  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache, // private redisClientService: RedisClientService,
  ) {}

  async get(key): Promise<any> {
    return this.cache.get(key);
  }

  async set(key, value, ttl?: number) {
    if (ttl) {
      return this.cache.set(key, value, { ttl });
    }
    return this.cache.set(key, value);
  }

  async del(key) {
    return this.cache.del(key);
  }

  async reset() {
    return this.cache.reset();
  }
}
