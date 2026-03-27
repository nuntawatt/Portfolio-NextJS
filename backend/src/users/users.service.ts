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

  private normalizeEmail(email: string) {
    return email.toLowerCase().trim();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        email: this.normalizeEmail(email),
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
      where: {
        id,
        deletedAt: null,
      },
      select: ['id', 'email', 'role', 'isEmailVerified', 'refreshTokenHash'],
    });
  }

  async findByEmailVerificationTokenHash(tokenHash: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        emailVerificationTokenHash: tokenHash,
        deletedAt: null,
      },
      select: [
        'id',
        'email',
        'isEmailVerified',
        'emailVerificationTokenHash',
        'emailVerificationExpires',
        'deletedAt',
      ],
    });
  }

  async findByPasswordResetTokenHash(tokenHash: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        passwordResetTokenHash: tokenHash,
        deletedAt: null,
      },
      select: [
        'id',
        'email',
        'passwordResetTokenHash',
        'passwordResetExpires',
        'deletedAt',
      ],
    });
  }

  async updateRefreshToken(userId: number, tokenHash: string | null) {
    return this.usersRepository.update(
      { id: userId, deletedAt: null },
      {
        refreshTokenHash: tokenHash,
      },
    );
  }

  async updateEmailVerificationToken(
    userId: number,
    tokenHash: string | null,
    expiresAt: Date | null,
  ) {
    return this.usersRepository.update(
      { id: userId, deletedAt: null },
      {
        emailVerificationTokenHash: tokenHash,
        emailVerificationExpires: expiresAt,
      },
    );
  }

  async markEmailVerified(userId: number) {
    return this.usersRepository.update(
      { id: userId, deletedAt: null },
      {
        isEmailVerified: true,
        emailVerificationTokenHash: null,
        emailVerificationExpires: null,
      },
    );
  }

  async updatePasswordResetToken(
    userId: number,
    tokenHash: string | null,
    expiresAt: Date | null,
  ) {
    return this.usersRepository.update(
      { id: userId, deletedAt: null },
      {
        passwordResetTokenHash: tokenHash,
        passwordResetExpires: expiresAt,
      },
    );
  }

  async resetPassword(userId: number, hashedPassword: string) {
    return this.usersRepository.update(
      { id: userId, deletedAt: null },
      {
        password: hashedPassword,
        passwordResetTokenHash: null,
        passwordResetExpires: null,
      },
    );
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
      where: { id: userId, deletedAt: null },
    });

    if (!user) {
      throw new AppException('USER_NOT_FOUND');
    }

    return this.usersRepository.update(
      { id: userId, deletedAt: null },
      {
        deletedAt: new Date(),
        refreshTokenHash: null,
        emailVerificationTokenHash: null,
        emailVerificationExpires: null,
        passwordResetTokenHash: null,
        passwordResetExpires: null,
      },
    );
  }
}
