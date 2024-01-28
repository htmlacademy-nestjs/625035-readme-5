import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_PORT = 3002;
const DEFAULT_MONGO_PORT = 27017;
const ENVIRONMENTS = ['development', 'production', 'stage'] as const;
const DEFAULT_RABBIT_PORT = 5672;
const DEFAULT_SMTP_PORT = 25;

type Environment = (typeof ENVIRONMENTS)[number];

export interface NotifyConfig {
  environment: string;
  port: number;
  db: {
    host: string;
    port: number;
    user: string;
    name: string;
    password: string;
    authBase: string;
  };
  rabbit: {
    host: string;
    password: string;
    user: string;
    queue: string;
    exchange: string;
    port: number;
  };
  mail: {
    host: string;
    port: number;
    user: string;
    password: string;
    from: string;
  };
}

const validationSchema = Joi.object({
  environment: Joi.string()
    .valid(...ENVIRONMENTS)
    .required(),
  port: Joi.number().port().default(DEFAULT_PORT),
  db: Joi.object({
    host: Joi.string().valid().hostname(),
    port: Joi.number().port(),
    name: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    authBase: Joi.string().required(),
  }),
  rabbit: Joi.object({
    host: Joi.string().valid().hostname().required(),
    password: Joi.string().required(),
    port: Joi.number().port().default(DEFAULT_RABBIT_PORT),
    user: Joi.string().required(),
    queue: Joi.string().required(),
    exchange: Joi.string().required(),
  }),
  mail: Joi.object({
    host: Joi.string().valid().hostname().required(),
    port: Joi.number().port().default(DEFAULT_SMTP_PORT),
    user: Joi.string().required(),
    password: Joi.string().required(),
    from: Joi.string().required(),
  }),
});

function validateConfig(config: NotifyConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Notify Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): NotifyConfig {
  const config: NotifyConfig = {
    environment: process.env['NODE_ENV'] as Environment,
    port: parseInt(process.env['PORT'] || `${DEFAULT_PORT}`, 10),
    db: {
      host: process.env['MONGO_HOST'] as string,
      port: parseInt(
        process.env['MONGO_PORT'] ?? DEFAULT_MONGO_PORT.toString(),
        10
      ),
      name: process.env['MONGO_DB'] as string,
      user: process.env['MONGO_USER'] as string,
      password: process.env['MONGO_PASSWORD'] as string,
      authBase: process.env['MONGO_AUTH_BASE'] as string,
    },
    rabbit: {
      host: process.env['RABBIT_HOST'] as string,
      password: process.env['RABBIT_PASSWORD'] as string,
      port: parseInt(
        (process.env['RABBIT_PORT'] as string) ??
          DEFAULT_RABBIT_PORT.toString(),
        10
      ),
      user: process.env['RABBIT_USER'] as string,
      queue: process.env['RABBIT_QUEUE'] as string,
      exchange: process.env['RABBIT_EXCHANGE'] as string,
    },
    mail: {
      host: process.env['MAIL_SMTP_HOST'] as string,
      port: parseInt(
        (process.env['MAIL_SMTP_PORT'] as string) ??
          DEFAULT_SMTP_PORT.toString(),
        10
      ),
      user: process.env['MAIL_USER_NAME'] as string,
      password: process.env['MAIL_USER_PASSWORD'] as string,
      from: process.env['MAIL_FROM'] as string,
    },
  };

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
