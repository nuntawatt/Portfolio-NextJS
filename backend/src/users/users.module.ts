import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/users.entity';
import { OauthAccount } from './entities/oauth_accounts.entity';
import { AuthToken } from './entities/auth_tokens.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, OauthAccount, AuthToken])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
