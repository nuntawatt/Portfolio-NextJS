import { registerAs } from '@nestjs/config';

/** App config. */
export const appConfig = registerAs('app', () => ({
  port: parseInt(process.env.PORT as string, 10),
  nodeEnv: process.env.NODE_ENV as string,
  frontendUrl: process.env.FRONTEND_URL as string,
  apiUrl: process.env.API_URL as string,
}));

/** Database config. */
export const databaseConfig = registerAs('database', () => {
  const host = process.env.DB_HOST as string;
  const port = process.env.DB_PORT as string;
  const username = process.env.DB_USERNAME as string;
  const password = process.env.DB_PASSWORD as string;
  const database = process.env.DB_DATABASE as string;

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
  secret: process.env.JWT_SECRET as string,
  refreshSecret: process.env.JWT_REFRESH_SECRET as string,
  accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN as string,
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN as string,
}));

/** Mail config. */
export const mailConfig = registerAs('mail', () => ({
  resendApiKey: process.env.RESEND_API_KEY as string,
  mailFrom: process.env.MAIL_FROM as string,
}));

/** OAuth config. */
export const oauthConfig = registerAs('oauth', () => ({
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL as string,
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    callbackUrl: process.env.GITHUB_CALLBACK_URL as string,
  },
}));

/** MinIO config. */
export const minioConfig = registerAs('minio', () => ({
  endpoint: process.env.MINIO_ENDPOINT as string,
  port: parseInt(process.env.MINIO_PORT as string, 10),
  useSsl: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY as string,
  secretKey: process.env.MINIO_SECRET_KEY as string,
  bucketName: process.env.MINIO_BUCKET_NAME as string,
  publicUrl: process.env.MINIO_PUBLIC_URL as string,
}));

/** Redis config. */
export const redisConfig = registerAs('redis', () => ({
  host: process.env.REDIS_HOST as string,
  port: parseInt(process.env.REDIS_PORT as string, 10),
}));
