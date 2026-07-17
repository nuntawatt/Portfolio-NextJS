import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { AuthToken, AuthTokenType } from '@prisma/client';

type AuthTokenWithUser = AuthToken & {
  user: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    avatar: string | null;
    role: string;
    isEmailVerified: boolean;
    password: string | null;
  };
};

@Injectable()
export class AuthTokenService {
  private readonly logger = new Logger(AuthTokenService.name);

  constructor(private readonly prisma: PrismaService) {}

  // Create a new auth token. 
  async createToken(
    userId: string,
    type: AuthTokenType,
    tokenHash: string,
    expiresAt: Date,
  ): Promise<AuthToken> {
    // Revoke existing
    await this.revokeUserTokens(userId, type);

    return this.prisma.authToken.create({
      data: {
        userId,
        type,
        tokenHash,
        expiresAt,
      },
    });
  }

  // Find a valid refresh token.
  async findValidRefreshToken(
    userId: string,
    tokenHash: string,
  ): Promise<AuthTokenWithUser | null> {
    return this.prisma.authToken.findFirst({
      where: {
        tokenHash,
        type: AuthTokenType.REFRESH_TOKEN,
        usedAt: null,
        expiresAt: { gt: new Date() },
        userId,
      },
      include: { user: true },
    }) as Promise<AuthTokenWithUser | null>;
  }

  // Consume a token (mark as used).
  async consumeToken(
    tokenHash: string,
    type: AuthTokenType,
  ): Promise<AuthTokenWithUser | null> {
    const now = new Date();

    // Find token
    const token = await this.prisma.authToken.findFirst({
      where: {
        tokenHash,
        type,
        usedAt: null,
        expiresAt: { gt: now },
      },
    });

    if (!token) return null;

    // Mark used
    await this.prisma.authToken.update({
      where: { id: token.id },
      data: { usedAt: now },
    });

    // Return with user
    return this.prisma.authToken.findUnique({
      where: { id: token.id },
      include: { user: true },
    }) as Promise<AuthTokenWithUser | null>;
  }

  // Mark token as used.
  async markTokenUsed(tokenId: string): Promise<void> {
    await this.prisma.authToken.update({
      where: { id: tokenId },
      data: { usedAt: new Date() },
    });
  }

  // Revoke tokens of type for user.
  async revokeUserTokens(userId: string, type: AuthTokenType): Promise<void> {
    await this.prisma.authToken.updateMany({
      where: {
        userId,
        type,
        usedAt: null,
      },
      data: { usedAt: new Date() },
    });
  }

  // Revoke all tokens for user.
  async revokeAllUserTokens(userId: string): Promise<void> {
    await this.prisma.authToken.updateMany({
      where: {
        userId,
        usedAt: null,
      },
      data: { usedAt: new Date() },
    });
  }
}
