import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthTokenService } from './auth-token.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { GithubStrategy } from './strategies/github.strategy';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [PassportModule, JwtModule.register({}), UsersModule, MailModule],
  providers: [AuthService, AuthTokenService, JwtStrategy, GoogleStrategy, GithubStrategy],
  controllers: [AuthController],
  exports: [AuthService, AuthTokenService],
})
export class AuthModule {}
