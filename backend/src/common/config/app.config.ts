import { registerAs } from '@nestjs/config';

/** App config. */
export const appConfig = registerAs('app', () => ({
  port: Number.parseInt(process.env.PORT, 10),
  nodeEnv: process.env.NODE_ENV,
  frontendUrl: process.env.FRONTEND_URL,
  apiUrl: process.env.API_URL,
}));

/** Database config. */
export const databaseConfig = registerAs('database', () => {
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT;
  const username = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_DATABASE;

  const url = `postgresql://${username}:${password}@${host}:${port}/${database}?schema=public`;

  return {
    url,
    host,
    port: Number.parseInt(port, 10),
    username,
    password,
    database,
  };
});

/** JWT config. */
export const jwtConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
}));

/** Mail config. */
export const mailConfig = registerAs('mail', () => ({
  resendApiKey: process.env.RESEND_API_KEY,
  mailFrom: process.env.MAIL_FROM,
}));

/** OAuth config. */
export const oauthConfig = registerAs('oauth', () => ({
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL,
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackUrl: process.env.GITHUB_CALLBACK_URL,
  },
}));

/** MinIO config. */
export const minioConfig = registerAs('minio', () => ({
  endpoint: process.env.MINIO_ENDPOINT,
  port: Number.parseInt(process.env.MINIO_PORT, 10),
  useSsl: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
  bucketName: process.env.MINIO_BUCKET_NAME,
  publicUrl: process.env.MINIO_PUBLIC_URL,
}));

/** Redis config. */
export const redisConfig = registerAs('redis', () => ({
  host: process.env.REDIS_HOST,
  port: Number.parseInt(process.env.REDIS_PORT, 10),
}));
