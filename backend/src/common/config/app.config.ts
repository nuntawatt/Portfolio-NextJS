import { registerAs } from '@nestjs/config';

/** App config. */
export const appConfig = registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  apiUrl: process.env.API_URL || 'http://localhost:3001',
}));

/** Database config. */
export const databaseConfig = registerAs('database', () => {
  const host = process.env.DB_HOST || 'localhost';
  const port = process.env.DB_PORT || '5432';
  const username = process.env.DB_USERNAME || 'postgres';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_DATABASE || 'portfolio';

  const url = `postgresql://${username}:${password}@${host}:${port}/${database}?schema=public`;

  return {
    url,
    host,
    port: parseInt(port, 10),
    username,
    password,
    database,
  };
});

/** JWT config. */
export const jwtConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
}));

/** Mail config. */
export const mailConfig = registerAs('mail', () => ({
  resendApiKey: process.env.RESEND_API_KEY,
  mailFrom: process.env.MAIL_FROM || 'noreply@example.com',
}));

/** OAuth config. */
export const oauthConfig = registerAs('oauth', () => ({
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackUrl:
      process.env.GOOGLE_CALLBACK_URL ||
      'http://localhost:3001/auth/google/callback',
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    callbackUrl:
      process.env.GITHUB_CALLBACK_URL ||
      'http://localhost:3001/auth/github/callback',
  },
}));

/** MinIO config. */
export const minioConfig = registerAs('minio', () => ({
  endpoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000', 10),
  useSsl: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || '',
  secretKey: process.env.MINIO_SECRET_KEY || '',
  bucketName: process.env.MINIO_BUCKET_NAME || 'portfolio',
  publicUrl: process.env.MINIO_PUBLIC_URL || '',
}));

/** Redis config. */
export const redisConfig = registerAs('redis', () => ({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
}));
