import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_MONGO_PORT = 27017;

export interface MongoConfig {
  authBase: string;
  host: string;
  name: string;
  password: string;
  port: number;
  user: string;
}

const schema = Joi.object({
  authBase: Joi.string().required(),
  host: Joi.string().hostname().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
  port: Joi.number().port().default(DEFAULT_MONGO_PORT),
  user: Joi.string().required(),
});

const validate = (config: MongoConfig) => {
  const { error } = schema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(`[DB config validation error]: ${error.message}`);
  }
};

const buildDbConfig = (): MongoConfig => {
  const config: MongoConfig = {
    authBase: process.env.MONGO_AUTH_BASE!,
    host: process.env.MONGO_HOST!,
    name: process.env.MONGO_DB!,
    password: process.env.MONGO_PASSWORD!,
    port: parseInt(process.env.MONGO_PORT ?? `${DEFAULT_MONGO_PORT}`, 10),
    user: process.env.MONGO_USER!,
  };

  validate(config);
  return config;
};

export default registerAs('db', buildDbConfig);
