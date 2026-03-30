import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
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

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  private normalizeEmail(email: string): string {
    return email.toLowerCase().trim();
  }

  // ─── Finders ─────────────────────────────────────────────────────────────────

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        email: this.normalizeEmail(email),
        deletedAt: null,
      },
    });
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        email: this.normalizeEmail(email),
        deletedAt: null,
      },
      select: ['id', 'firstName', 'lastName', 'email', 'password', 'role', 'isEmailVerified', 'avatar', 'deletedAt'],
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id, deletedAt: null },
      select: ['id', 'email', 'role', 'isEmailVerified', 'avatar'],
    });
  }

  // ─── Mutations ────────────────────────────────────────────────────────────────

  async create(userData: {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string | null;
    avatar?: string | null;
  }): Promise<User> {
    const user = this.usersRepository.create({
      firstName: userData.firstName ?? null,
      lastName: userData.lastName ?? null,
      email: userData.email,
      password: userData.password,
      avatar: userData.avatar ?? null,
    });

    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already in use');
      }
      this.logger.error(`Error creating user: ${error.message}`);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  // ─── OAuth ───────────────────────────────────────────────────────────────────

  async findByOAuth(provider: string, providerId: string): Promise<OauthAccount | null> {
    return this.oauthRepository.findOne({
      where: { provider, providerId },
      relations: ['user'],
    });
  }

  async createOAuthAccount(user: User, provider: string, providerId: string): Promise<OauthAccount> {
    const oauth = this.oauthRepository.create({ provider, providerId, user });

    try {
      return await this.oauthRepository.save(oauth);
    } catch (error) {
      this.logger.error(`Error creating OAuth account (${provider}:${providerId}): ${error.message}`);
      throw new InternalServerErrorException('Failed to create OAuth account');
    }
  }

  // ─── Soft Delete ──────────────────────────────────────────────────────────────

  async softDelete(userId: number): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { id: userId, deletedAt: null },
    });

    if (!user) {
      throw new NotFoundException('User not found or already deleted');
    }

    await this.usersRepository.update(
      { id: userId, deletedAt: null },
      { deletedAt: new Date() },
    );
  }
}