import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/entities/users.entity';
import { LoginDto } from './dto/login.dto';
import { OAuthUser } from './types/auth-type';
import { compareToken, generateRandomToken, hashToken, sha256 } from './utils/token.util';
import { MailService } from './mail/mail.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) { }

  private generateAccessToken(user: Pick<User, 'id' | 'email' | 'role' | 'isEmailVerified'>) {
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

  private generateRefreshToken(user: Pick<User, 'id' | 'email' | 'role' | 'isEmailVerified'>) {
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

  private async issueToken(user: User) {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
    const refreshTokenHash = await hashToken(refreshToken);

    await this.usersService.updateRefreshToken(user.id, refreshTokenHash);

    return { accessToken, refreshToken };
  }

  // =========================
  // VALIDATE LOGIN
  // =========================
  async validateUserCredentials(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const existingUser = await this.usersService.findByEmailWithPassword(email);

    if (!existingUser) {
      return null;
    }

    // กัน OAuth user login ด้วย password
    if (!existingUser.password) {
      throw new UnauthorizedException('Please login with your OAuth provider');
    }

    const isMatch = await bcrypt.compare(pass, existingUser.password);
    if (!isMatch) return null;

    const { password, ...result } = existingUser;
    return result;
  }

  // =========================
  // LOGIN
  // =========================
  async login(loginData: LoginDto) {
    const email = loginData.email.toLowerCase().trim();

    const user = await this.validateUserCredentials(email, loginData.password);

    if (!user) {
      this.logger.warn(`Failed login attempt for email: ${email}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    // verify email
    if (!user.isEmailVerified) {
      throw new UnauthorizedException('Please verify your email address');
    }

    const tokens = await this.issueToken(user as User);

    this.logger.log(`User logged in: userId=${user.id}`);

    return {
      ...tokens,
      user,
    };
  }

  // =========================
  // REGISTER
  // =========================
  async register(userData: RegisterDto) {
    const email = userData.email.toLowerCase().trim();

    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      this.logger.warn(`Duplicate registration: ${email}`);
      throw new UnauthorizedException('User already exists with this email');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await this.usersService.create({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email,
      password: hashedPassword,
    });

    const { password, ...result } = newUser;

    const rawToken = generateRandomToken();
    const tokenHash = sha256(rawToken);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60);

    await this.usersService.updateEmailVerificationToken(newUser.id, tokenHash, expiresAt);

    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${rawToken}`;

    this.mailService
      .sendEmail(
        email,
        'Verify your email',
        `<p>Click here to verify your email:</p><a href="${verifyUrl}">${verifyUrl}</a>`,
      )
      .catch((error) => {
        this.logger.error('Failed to send verification email', {
          email,
          message: error?.message,
          stack: error?.stack,
        });
      });

    this.logger.log(`New user registered: ${email}`);

    return result;
  }

  // =========================
  // OAUTH LOGIN
  // =========================
  async oauthLogin(oauthUser: OAuthUser) {
    // 1. validate email
    if (!oauthUser.email) {
      throw new UnauthorizedException('Email is required from OAuth provider');
    }

    const email = oauthUser.email.toLowerCase().trim();

    // 2. หา oauth account
    let oauthAccount = await this.usersService.findByOAuth(
      oauthUser.provider,
      oauthUser.providerId,
    );

    let user: User;

    if (oauthAccount?.user) {
      user = oauthAccount.user;
    } else {
      // 3. หา user จาก email
      user = await this.usersService.findByEmail(email);

      if (!user) {
        user = await this.usersService.create({
          email,
          firstName: oauthUser.firstName || oauthUser.username || '',
          lastName: oauthUser.lastName || '',
          password: null,
        });
      }

      // 4. create oauth account
      await this.usersService.createOAuthAccount(
        user,
        oauthUser.provider,
        oauthUser.providerId,
      );
    }

    // 5. ถ้า email ยังไม่ verified ให้ mark เป็น verified
    if (!user.isEmailVerified) {
      user.isEmailVerified = true;
      await this.usersService.save(user);
    }

    this.logger.log(`OAuth login: ${oauthUser.provider} - ${user.email}`);

    const tokens = await this.issueToken(user);

    return tokens;
  }

  async refreshToken(refreshToken: string) {
    let payload: {
      userId: number;
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

    const user = await this.usersService.findByIdWithRefreshToken(payload.userId);

    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const isValid = await compareToken(refreshToken, user.refreshTokenHash);

    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokens = await this.issueToken(user as User);

    return tokens;
  }

  async logout(userId: number) {
    await this.usersService.updateRefreshToken(userId, null);
    return { success: true };
  }

  async verifyEmail(token: string) {
    const tokenHash = sha256(token);

    const userByToken = await this.usersService.findByEmailVerificationTokenHash(tokenHash);

    if (!userByToken) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    if (userByToken.isEmailVerified) {
      return { success: true };
    }

    if (
      !userByToken.emailVerificationExpires ||
      userByToken.emailVerificationExpires < new Date()
    ) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    await this.usersService.markEmailVerified(userByToken.id);

    return { success: true };
  }

  async forgotPassword(email: string) {
    const normalizedEmail = email.toLowerCase().trim();
    const user = await this.usersService.findByEmail(normalizedEmail);

    if (!user) {
      return { success: true };
    }

    const rawToken = generateRandomToken();
    const tokenHash = sha256(rawToken);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 15);

    await this.usersService.updatePasswordResetToken(user.id, tokenHash, expiresAt);

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`;

    await this.mailService.sendEmail(
      normalizedEmail,
      'Reset your password',
      `<p>Click here to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`,
    );

    return { success: true };
  }

  async resetPassword(token: string, newPassword: string) {
    const tokenHash = sha256(token);

    const user = await this.usersService.findByPasswordResetTokenHash(tokenHash);

    if (!user) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    if (!user.passwordResetExpires || user.passwordResetExpires < new Date()) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.usersService.resetPassword(user.id, hashedPassword);

    return { success: true };
  }
}
