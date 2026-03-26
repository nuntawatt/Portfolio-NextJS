import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { AppException } from 'src/common/error';
import { OauthAccount } from './entities/oauth_accounts.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(OauthAccount)
    private oauthRepository: Repository<OauthAccount>,
  ) { }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'firstName', 'lastName', 'email', 'password'],
    });
  }

  async create(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<User> {
    const user = this.usersRepository.create(userData);

    try {
      return this.usersRepository.save(user);
    } catch (error) {
      this.logger.error(`Error creating user with email ${userData.email}: ${error.message}`);
      throw new AppException('AUTH_USER_ALREADY_EXISTS');
    }
  }

  // =========================
  // OAUTH SECTION 🔥
  // =========================

  async findByOAuth(
    provider: string,
    providerId: string,
  ): Promise<OauthAccount | null> {
    return this.oauthRepository.findOne({
      where: { provider, providerId },
      relations: ['user'],
    });
  }

  async createOAuthAccount(
    user: User,
    provider: string,
    providerId: string,
  ): Promise<OauthAccount> {
    const oauth = this.oauthRepository.create({
      provider,
      providerId,
      user,
    });

    try {
      return await this.oauthRepository.save(oauth);
    } catch (error) {
      this.logger.error(
        `Error creating OAuth account (${provider}:${providerId}): ${error.message}`,
      );
      throw new AppException('OAUTH_ACCOUNT_ALREADY_EXISTS');
    }
  }

  async softDelete(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new AppException('USER_NOT_FOUND');
    }

    user.deletedAt = new Date();
    return this.usersRepository.save(user);
  }
}