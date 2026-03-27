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
      where: {
        email,
        deletedAt: null,
      },
      select: ['id', 'firstName', 'lastName', 'email', 'password', 'role', 'isEmailVerified', 'deletedAt'],
    });
  }

  // ใช้กับ JWT strategy
  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        id,
        deletedAt: null,
      },
      select: ['id', 'email', 'role', 'isEmailVerified', 'deletedAt'],
    });
  }

  async findByIdWithRefreshToken(id: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
      select: ['id', 'email', 'role', 'isEmailVerified', 'refreshTokenHash'],
    });
  }

  async updateRefreshToken(userId: number, tokenHash: string | null) {
    return this.usersRepository.update(userId, {
      refreshTokenHash: tokenHash,
    });
  }

  async updateEmailVerificationToken(userId: number, tokenHash: string | null, expiresAt: Date | null) {
    return this.usersRepository.update(userId, {
      emailVerificationTokenHash: tokenHash,
      emailVerificationExpires: expiresAt,
    });
  }

  async updatePasswordResetToken(userId: number, tokenHash: string | null, expiresAt: Date | null) {
    return this.usersRepository.update(userId, {
      passwordResetTokenHash: tokenHash,
      passwordResetExpires: expiresAt,
    });
  }

  async create(userData: {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
  }): Promise<User> {
    const user = this.usersRepository.create({
      firstName: userData.firstName ?? null,
      lastName: userData.lastName ?? null,
      email: userData.email,
      password: userData.password,
    });

    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      this.logger.error(`Error creating user with email ${userData.email}: ${error.message}`);
      throw new AppException('AUTH_USER_ALREADY_EXISTS');
    }
  }

  async save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async findByOAuth(provider: string, providerId: string): Promise<OauthAccount | null> {
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
