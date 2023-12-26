import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_PORT = 3000;
const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

type Environment = (typeof ENVIRONMENTS)[number];

export interface ApplicationConfig {
  environment: string;
  port: number;
}

const schema = Joi.object({
  environment: Joi.string()
    .valid(...ENVIRONMENTS)
    .required(),
  port: Joi.number().port().default(DEFAULT_PORT),
});

const validate = (config: ApplicationConfig) => {
  const { error } = schema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(`[Application config error]: ${error.message}`);
  }
};

const buildConfig = () => {
  const config = {
    environment: process.env['NODE_ENV'] as Environment,
    port: parseInt(process.env['PORT'] ?? `${DEFAULT_PORT}`, 10),
  };

  validate(config);
  return config;
};

export default registerAs('application', buildConfig);
