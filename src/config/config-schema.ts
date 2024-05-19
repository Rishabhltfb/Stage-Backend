import * as Joi from 'joi';
import { redisConfigSchema } from './config-validation';

const stageServerValidationSchema = Joi.object({
  redis: redisConfigSchema,
});
export default stageServerValidationSchema;
