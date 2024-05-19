import * as Joi from 'joi';

export const redisConfigSchema = Joi.object({
  host: Joi.string().required(),
  port: Joi.number().required(),
  ttl: Joi.number().default(3600).optional(),
  db: Joi.number().default(1),
  password: Joi.string().optional(),
  username: Joi.string().optional(),
  tls: Joi.boolean().optional().default(false),
});

export const configValidationSchema = Joi.object({
  redis: redisConfigSchema,
});
