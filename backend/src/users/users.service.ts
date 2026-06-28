import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma, OauthAccount, User } from '@prisma/client';

/** Fields safe to return in API responses (excludes password). */
const USER_PUBLIC_SELECT = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  avatar: true,
  role: true,
  isEmailVerified: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prisma: PrismaService) {}

  /** Find user by email. */
  async findByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email: email.toLowerCase().trim(),
        deletedAt: null,
      },
      select: USER_PUBLIC_SELECT,
    });
  }

  /** Find user by email with password. */
  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        email: email.toLowerCase().trim(),
        deletedAt: null,
      },
    });
  }

  /** Find user by ID. */
  async findById(id: string) {
    return this.prisma.user.findFirst({
      where: { id, deletedAt: null },
      select: USER_PUBLIC_SELECT,
    });
  }

  /** Create a new user. */
  async create(userData: {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string | null;
    avatar?: string | null;
  }): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: {
          firstName: userData.firstName ?? null,
          lastName: userData.lastName ?? null,
          email: userData.email.toLowerCase().trim(),
          password: userData.password,
          avatar: userData.avatar || undefined,
          isEmailVerified: false,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already in use');
      }
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Error creating user: ${message}`);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  /** Update user record. */
  async save(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  /** Find OAuth account by provider and ID. */
  async findByOAuth(
    provider: string,
    providerId: string,
  ): Promise<(OauthAccount & { user: User }) | null> {
    return this.prisma.oauthAccount.findFirst({
      where: {
        provider,
        providerId,
        deletedAt: null,
      },
      include: { user: true },
    });
  }

  /** Link OAuth account to user. */
  async createOAuthAccount(
    userId: string,
    provider: string,
    providerId: string,
  ): Promise<OauthAccount> {
    try {
      return await this.prisma.oauthAccount.create({
        data: {
          provider,
          providerId,
          userId,
        },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(
        `Error creating OAuth account (${provider}:${providerId}): ${message}`,
      );
      throw new InternalServerErrorException('Failed to create OAuth account');
    }
  }

  /** Soft-delete a user. */
  async softDelete(userId: string): Promise<void> {
    const user = await this.prisma.user.findFirst({
      where: { id: userId, deletedAt: null },
    });

    if (!user) {
      throw new NotFoundException('User not found or already deleted');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { deletedAt: new Date() },
    });
  }
}
