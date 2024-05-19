import { UnknownElementException } from '@nestjs/core/errors/exceptions/unknown-element.exception';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

export const YAML_CONFIG_FILENAME = `/${process.env.STAGE}.yaml`;

export const getConfiguration = async (configValidationSchema) => {
  const filePath = join(__dirname, YAML_CONFIG_FILENAME);
  const output = yaml.load(readFileSync(filePath, 'utf8')) as Record<
    string,
    any
  >;
  const { error } = configValidationSchema.validate(output);
  if (error) {
    throw new UnknownElementException(error.message);
  }
  return output;
};
