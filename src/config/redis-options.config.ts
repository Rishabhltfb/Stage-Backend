import { AppConstants } from 'src/util/constants/app.constant';

export const getRedisOptionsWithConfig = (config) => {
  const username = process.env.REDIS_USERNAME;
  const db: number = +process.env.REDIS_DB;
  const port: number = +process.env.REDIS_PORT;
  const host = process.env.REDIS_HOST;
  const ttl: number = +process.env.REDIS_TTL;
  const password = process.env.REDIS_PASSWORD;
  const tls = false;
  if (!config) {
    config = {
      ttl: ttl,
    };
  }
  if (!config.ttl) {
    config.ttl = ttl;
  }

  const options = {
    store: config.store,
    host: host,
    port: port,
    ttl: config.ttl,
    db: db,
    username: username,
    retryAttempts: 5,
    retryDelay: 30,
  };

  if (process.env.STAGE == AppConstants.prodEnv) {
    options['password'] = password;
  }

  if (tls) {
    return {
      ...options,
      tls: {},
    };
  }

  return options;
};

export const getRedisOptions = async (config?: {
  store?: any;
  ttl?: number;
}) => {
  return getRedisOptionsWithConfig(config);
};
