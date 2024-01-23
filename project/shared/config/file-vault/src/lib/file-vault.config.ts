import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_MONGO_PORT = 27017;
const DEFAULT_PORT = 3000;
const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

type Environment = (typeof ENVIRONMENTS)[number];

export interface FileVaultConfig {
  db: {
    authBase: string;
    host: string;
    name: string;
    password: string;
    port: number;
    user: string;
  };
  environment: string;
  port: number;
  uploadDirectory: string;
}

const validationSchema = Joi.object({
  db: Joi.object({
    authBase: Joi.string().required(),
    host: Joi.string().valid().hostname(),
    name: Joi.string().required(),
    password: Joi.string().required(),
    port: Joi.number().port(),
    user: Joi.string().required(),
  }),
  environment: Joi.string()
    .valid(...ENVIRONMENTS)
    .required(),
  port: Joi.number().port().default(DEFAULT_PORT),
  uploadDirectory: Joi.string().required(),
});

function validateConfig(config: FileVaultConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(`[FileVault Config Validation Error]: ${error.message}`);
  }
}

const port = parseInt(
  process.env.MONGO_PORT ?? DEFAULT_MONGO_PORT.toString(),
  10
);

function getConfig(): FileVaultConfig {
  const config: FileVaultConfig = {
    db: {
      authBase: process.env.MONGO_AUTH_BASE,
      host: process.env.MONGO_HOST,
      name: process.env.MONGO_DB,
      password: process.env.MONGO_PASSWORD,
      port,
      user: process.env.MONGO_USER,
    },
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10),
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
  };

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
