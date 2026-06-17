import * as Joi from 'joi';

/**
 * Joi validation schema for environment variables.
 */
export const validationSchema = Joi.object({
  // Application
  PORT: Joi.number().default(3001),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  FRONTEND_URL: Joi.string().uri().required(),
  API_URL: Joi.string().uri().optional().default('http://localhost:3001'),

  // Database
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().allow('').required(),
  DB_DATABASE: Joi.string().default('portfolio'),

  // JWT
  JWT_SECRET: Joi.string().required().min(8),
  JWT_REFRESH_SECRET: Joi.string().required().min(8),
  JWT_ACCESS_EXPIRES_IN: Joi.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),

  // Mail (Resend)
  RESEND_API_KEY: Joi.string().allow('').default(''),
  MAIL_FROM: Joi.string().allow('').default('noreply@example.com'),

  // Google OAuth (optional)
  GOOGLE_CLIENT_ID: Joi.string().allow('').default(''),
  GOOGLE_CLIENT_SECRET: Joi.string().allow('').default(''),
  GOOGLE_CALLBACK_URL: Joi.string().allow('').default(''),

  // GitHub OAuth (optional)
  GITHUB_CLIENT_ID: Joi.string().allow('').default(''),
  GITHUB_CLIENT_SECRET: Joi.string().allow('').default(''),
  GITHUB_CALLBACK_URL: Joi.string().allow('').default(''),

  // MinIO (optional)
  MINIO_ENDPOINT: Joi.string().allow('').default('localhost'),
  MINIO_PORT: Joi.number().default(9000),
  MINIO_USE_SSL: Joi.boolean().default(false),
  MINIO_ACCESS_KEY: Joi.string().allow('').default(''),
  MINIO_SECRET_KEY: Joi.string().allow('').default(''),
  MINIO_BUCKET_NAME: Joi.string().allow('').default('portfolio'),
  MINIO_PUBLIC_URL: Joi.string().allow('').default(''),

  // Redis (optional)
  REDIS_HOST: Joi.string().allow('').default('localhost'),
  REDIS_PORT: Joi.number().default(6379),

  // Swagger Configuration
  ENABLE_SWAGGER: Joi.string().valid('true', 'false').default('false'),
});
