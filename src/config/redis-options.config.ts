import { ConfigService } from '@nestjs/config';
import { AppConstants } from 'src/util/constants/app.constant';

export const getRedisOptionsWithConfig = (redisConfig, config) => {
  if (!config) {
    config = {
      ttl: redisConfig.ttl,
    };
  }
  if (!config.ttl) {
    config.ttl = redisConfig.ttl;
  }
  const options = {
    store: config.store,
    host: redisConfig.host,
    port: redisConfig.port,
    ttl: config.ttl,
    db: redisConfig.db,
    username: redisConfig.username,
    retryAttempts: 5,
    retryDelay: 30,
  };

  if (process.env.STAGE == AppConstants.prodEnv) {
    options['password'] = redisConfig.password;
  }

  if (redisConfig.tls) {
    return {
      ...options,
      tls: {},
    };
  }

  return options;
};

export const getRedisOptions = async (
  configService: ConfigService,
  config?: { store?: any; ttl?: number },
) => {
  const redisConfig = configService.get('redis');
  return getRedisOptionsWithConfig(redisConfig, config);
};
