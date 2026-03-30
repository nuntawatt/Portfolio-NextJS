import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { User } from './users/entities/users.entity';
import { OauthAccount } from './users/entities/oauth_accounts.entity';
import { AuthToken } from './users/entities/auth_tokens.entity';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RESEND_API_KEY: Joi.string().required(),
        MAIL_FROM: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,

      entities: [User, OauthAccount, AuthToken],

      synchronize: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 10, // 10 requests / minute
        },
      ],
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
