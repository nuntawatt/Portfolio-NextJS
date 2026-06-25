import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { OAuthUser } from './types/auth-type';
import { generateRandomToken, sha256 } from './utils/token.util';
import { MailService } from './mail/mail.service';
import { AuthTokenService } from './auth-token.service';
import { AuthTokenType, User } from '@prisma/client';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly authTokenService: AuthTokenService,
  ) {}

  // Token Helpers

  private generateAccessToken(
    user: Pick<User, 'id' | 'email' | 'role' | 'isEmailVerified'>,
  ): string {
    return this.jwtService.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      },
    );
  }

  private generateRefreshToken(
    user: Pick<User, 'id' | 'email' | 'role' | 'isEmailVerified'>,
  ): string {
    return this.jwtService.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
      },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      },
    );
  }

  private async issueTokens(user: User) {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    const refreshTokenHash = sha256(refreshToken);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days

    await this.authTokenService.createToken(
      user.id,
      AuthTokenType.REFRESH_TOKEN,
      refreshTokenHash,
      expiresAt,
    );

    return { accessToken, refreshToken };
  }

  /** Format user response. */
  private formatUserResponse(user: User) {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      avatar: user.avatar,
    };
  }

  // Auth Core

  // Validate user credentials (email/password)
  async validateUserCredentials(
    email: string,
    pass: string,
  ): Promise<User | null> {
    const user = await this.usersService.findByEmailWithPassword(email);
    if (!user) return null;

    if (!user.password) {
      throw new UnauthorizedException('Please login with your OAuth provider');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) return null;

    return user;
  }

  // Login user with email/password
  async login(loginData: LoginDto) {
    const email = loginData.email.toLowerCase().trim();
    const user = await this.validateUserCredentials(email, loginData.password);

    if (!user) {
      this.logger.warn(`Failed login attempt for email: ${email}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    // Email verification check
    if (!user.isEmailVerified) {
      throw new UnauthorizedException('Please verify your email address');
    }

    const tokens = await this.issueTokens(user);
    this.logger.log(`User logged in: userId=${user.id}`);

    return {
      user: this.formatUserResponse(user),
      token: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: 900,
      },
    };
  }

  // Register user
  async register(userData: RegisterDto) {
    const email = userData.email.toLowerCase().trim();

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      this.logger.warn(`Duplicate registration: ${email}`);
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await this.usersService.create({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email,
      password: hashedPassword,
    });

    // Generate verification token
    const rawToken = generateRandomToken();
    const tokenHash = sha256(rawToken);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await this.authTokenService.createToken(
      newUser.id,
      AuthTokenType.EMAIL_VERIFY,
      tokenHash,
      expiresAt,
    );

    const frontendUrl = process.env.FRONTEND_URL;
    const verifyUrl = `${frontendUrl}/auth/verify-email?token=${rawToken}`;

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #f8fafc; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #0f172a; font-size: 24px; font-weight: 800; margin: 0; font-family: system-ui, -apple-system, sans-serif;">Morgorn Portfolio</h2>
        </div>
        <div style="background-color: #ffffff; padding: 32px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
          <h3 style="color: #1e293b; font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 16px;">Verify your email address</h3>
          <p style="color: #475569; font-size: 15px; line-height: 1.6; margin-top: 0; margin-bottom: 24px;">
            Thank you for creating an account. Please verify your email address by clicking the button below. This link is valid for 1 hour.
          </p>
          <div style="text-align: center; margin-bottom: 24px;">
            <a href="${verifyUrl}" style="background-color: #f97316; color: #ffffff; padding: 12px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(249, 115, 22, 0.2);">
              Verify Email
            </a>
          </div>
          <p style="color: #94a3b8; font-size: 12px; line-height: 1.5; margin: 0; text-align: center;">
            If you did not request this, you can safely ignore this email.
          </p>
        </div>
      </div>
    `;

    // Send email asynchronously
    this.mailService
      .sendEmail(
        email,
        'Verify your email',
        emailHtml,
      )
      .catch((error: unknown) => {
        const message =
          error instanceof Error
            ? error.message
            : typeof error === 'string'
              ? error
              : JSON.stringify(error);
        this.logger.error('Failed to send verification email', {
          email,
          message,
        });
      });

    this.logger.log(`New user registered: ${email}`);

    return {
      status: 'success',
      message: 'Registration successful. Please check your email to verify your account.',
      user: this.formatUserResponse(newUser),
    };
  }

  // OAuth login
  async oauthLogin(oauthUser: OAuthUser) {
    if (!oauthUser.email) {
      throw new UnauthorizedException('Email is required from OAuth provider');
    }

    const email = oauthUser.email.toLowerCase().trim();

    // Check OAuth link
    const oauthAccount = await this.usersService.findByOAuth(
      oauthUser.provider,
      oauthUser.providerId,
    );

    let user: User;

    if (oauthAccount?.user) {
      user = oauthAccount.user;
    } else {
      // Check user by email
      const existingUser = await this.usersService.findByEmail(email);

      if (existingUser) {
        user = existingUser;
      } else {
        // Create user
        user = await this.usersService.create({
          email,
          firstName: oauthUser.firstName ?? oauthUser.username ?? '',
          lastName: oauthUser.lastName ?? '',
          password: null,
          avatar: oauthUser.avatar ?? null,
        });
      }

      // Link OAuth
      await this.usersService.createOAuthAccount(
        user.id,
        oauthUser.provider,
        oauthUser.providerId,
      );
    }

    // Auto-verify OAuth email
    if (!user.isEmailVerified) {
      user = await this.usersService.save(user.id, { isEmailVerified: true });
    }

    const tokens = await this.issueTokens(user);
    this.logger.log(`OAuth login: ${oauthUser.provider} - userId=${user.id}`);

    return {
      user: this.formatUserResponse(user),
      token: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: 900,
      },
    };
  }

  // Refresh access token
  async refreshToken(refreshToken: string) {
    let payload: {
      userId: string;
      email: string;
      role: string;
      isEmailVerified: boolean;
    };

    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokenHash = sha256(refreshToken);
    const tokenRecord = await this.authTokenService.findValidRefreshToken(
      payload.userId,
      tokenHash,
    );

    if (!tokenRecord) {
      // Revoke all user tokens if reuse suspected
      await this.authTokenService.revokeAllUserTokens(payload.userId);
      throw new UnauthorizedException(
        'Refresh token reuse detected — all sessions revoked',
      );
    }

    // Rotate token pair
    await this.authTokenService.markTokenUsed(tokenRecord.id);
    const tokens = await this.issueTokens(tokenRecord.user as User);

    return {
      token: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: 900,
      },
    };
  }

  // Log out user
  async logout(userId: string) {
    await this.authTokenService.revokeUserTokens(
      userId,
      AuthTokenType.REFRESH_TOKEN,
    );

    return {
      status: 'success',
      message: 'Logged out successfully',
    };
  }

  // Verify user email
  async verifyEmail(token: string): Promise<{ message: string }> {
    const tokenHash = sha256(token);

    const authToken = await this.authTokenService.consumeToken(
      tokenHash,
      AuthTokenType.EMAIL_VERIFY,
    );

    if (!authToken) {
      throw new BadRequestException('Invalid or expired verification token');
    }

    const user = authToken.user;

    if (user.isEmailVerified) {
      return { message: 'Email already verified' };
    }

    await this.usersService.save(user.id, { isEmailVerified: true });

    return { message: 'Email verified successfully' };
  }

  // Request password reset
  async forgotPassword(email: string) {
    const normalizedEmail = email.toLowerCase().trim();
    const user = await this.usersService.findByEmail(normalizedEmail);

    if (!user) {
      // Avoid revealing email existence
      return {
        status: 'success',
        message: 'If this email exists, a reset link has been sent',
      };
    }

    const rawToken = generateRandomToken();
    const tokenHash = sha256(rawToken);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 minutes

    await this.authTokenService.createToken(
      user.id,
      AuthTokenType.PASSWORD_RESET,
      tokenHash,
      expiresAt,
    );

    const frontendUrl = process.env.FRONTEND_URL;
    const resetUrl = `${frontendUrl}/auth/reset-password?token=${rawToken}`;

    const resetHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #f8fafc; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #0f172a; font-size: 24px; font-weight: 800; margin: 0; font-family: system-ui, -apple-system, sans-serif;">Morgorn Portfolio</h2>
        </div>
        <div style="background-color: #ffffff; padding: 32px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
          <h3 style="color: #1e293b; font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 16px;">Reset your password</h3>
          <p style="color: #475569; font-size: 15px; line-height: 1.6; margin-top: 0; margin-bottom: 24px;">
            We received a request to reset your password. Click the button below to set a new password. This link is valid for 15 minutes.
          </p>
          <div style="text-align: center; margin-bottom: 24px;">
            <a href="${resetUrl}" style="background-color: #f97316; color: #ffffff; padding: 12px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(249, 115, 22, 0.2);">
              Reset Password
            </a>
          </div>
          <p style="color: #94a3b8; font-size: 12px; line-height: 1.5; margin: 0; text-align: center;">
            If you did not request a password reset, you can safely ignore this email.
          </p>
        </div>
      </div>
    `;

    this.mailService
      .sendEmail(
        normalizedEmail,
        'Reset your password',
        resetHtml,
      )
      .catch((error: unknown) => {
        const message =
          error instanceof Error
            ? error.message
            : typeof error === 'string'
              ? error
              : JSON.stringify(error);
        this.logger.error('Failed to send reset password email', {
          email: normalizedEmail,
          message,
        });
      });

    return {
      status: 'success',
      message: 'If this email exists, a reset link has been sent',
    };
  }

  // Reset password
  async resetPassword(token: string, newPassword: string) {
    const tokenHash = sha256(token);

    const authToken = await this.authTokenService.consumeToken(
      tokenHash,
      AuthTokenType.PASSWORD_RESET,
    );

    if (!authToken) {
      throw new BadRequestException('Invalid or expired token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.usersService.save(authToken.user.id, {
      password: hashedPassword,
    });

    // Revoke sessions
    await this.authTokenService.revokeUserTokens(
      authToken.user.id,
      AuthTokenType.REFRESH_TOKEN,
    );

    return {
      status: 'success',
      message: 'Password reset successfully',
    };
  }
}
