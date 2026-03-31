import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/entities/users.entity';
import { LoginDto } from './dto/login.dto';
import { OAuthUser } from './types/auth-type';
import { generateRandomToken, sha256 } from './utils/token.util';
import { MailService } from './mail/mail.service';
import { AuthTokenService } from './auth-token.service';
import { AuthTokenType } from '../users/entities/auth_tokens.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
    private authTokenService: AuthTokenService,
  ) { }

  // ─── Token Helpers ────────────────────────────────────────────────────────────

  private generateAccessToken(
    user: Pick<User, 'id' | 'email' | 'role' | 'isEmailVerified'>,
  ) {
    return this.jwtService.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
      },
      { secret: process.env.JWT_SECRET, expiresIn: '15m' },
    );
  }

  private generateRefreshToken(
    user: Pick<User, 'id' | 'email' | 'role' | 'isEmailVerified'>,
  ) {
    return this.jwtService.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
      },
      { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' },
    );
  }

  private async issueToken(user: User) {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    const refreshTokenHash = sha256(refreshToken);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7d

    await this.authTokenService.createToken(
      user,
      AuthTokenType.REFRESH_TOKEN,
      refreshTokenHash,
      expiresAt,
    );

    return { accessToken, refreshToken };
  }

  // ─── Auth Core ────────────────────────────────────────────────────────────────

  async validateUserCredentials(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const existingUser = await this.usersService.findByEmailWithPassword(email);

    if (!existingUser) return null;

    if (!existingUser.password) {
      throw new UnauthorizedException('Please login with your OAuth provider');
    }

    const isMatch = await bcrypt.compare(pass, existingUser.password);
    if (!isMatch) return null;

    const { password, ...result } = existingUser;
    return result;
  }

  // login - ตรวจสอบข้อมูลรับรองและออก token
  async login(loginData: LoginDto) {
    const email = loginData.email.toLowerCase().trim();
    const user = await this.validateUserCredentials(email, loginData.password);

    if (!user) {
      this.logger.warn(`Failed login attempt for email: ${email}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.isEmailVerified) {
      throw new UnauthorizedException('Please verify your email address');
    }

    const tokens = await this.issueToken(user as User);
    this.logger.log(`User logged in: userId=${user.id}`);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        avatar: user.avatar,
      },
      token: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: 900,
      },
    };
  }

  // register - สร้างบัญชีใหม่และส่งอีเมลยืนยัน
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

    const rawToken = generateRandomToken();
    const tokenHash = sha256(rawToken);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 ชม.

    await this.authTokenService.createToken(
      newUser,
      AuthTokenType.EMAIL_VERIFY,
      tokenHash,
      expiresAt,
    );

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

    return {
      status: 'success',
      message: 'Registration successful. Please verify your email.',
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    };
  }

  // OAuth login - ใช้ข้อมูลจาก provider เพื่อเข้าสู่ระบบหรือสร้างบัญชีใหม่
  async oauthLogin(oauthUser: OAuthUser) {
    if (!oauthUser.email) {
      throw new UnauthorizedException('Email is required from OAuth provider');
    }

    const email = oauthUser.email.toLowerCase().trim();

    const oauthAccount = await this.usersService.findByOAuth(
      oauthUser.provider,
      oauthUser.providerId,
    );

    let user: User;

    if (oauthAccount?.user) {
      user = oauthAccount.user;
    } else {
      user = await this.usersService.findByEmail(email);

      if (!user) {
        user = await this.usersService.create({
          email,
          firstName: oauthUser.firstName ?? oauthUser.username ?? '',
          lastName: oauthUser.lastName ?? '',
          password: null,
          avatar: oauthUser.avatar ?? null,
        });
      }

      await this.usersService.createOAuthAccount(
        user,
        oauthUser.provider,
        oauthUser.providerId,
      );
    }

    if (!user.isEmailVerified) {
      user.isEmailVerified = true;
      await this.usersService.save(user);
    }

    const tokens = await this.issueToken(user);
    this.logger.log(`OAuth login: ${oauthUser.provider} - userId=${user.id}`);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        avatar: user.avatar ?? null,
      },
      token: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: 900,
      },
    };
  }

  // refresh token โดยใช้ refresh token เดิมที่ยังไม่หมดอายุและยังไม่ถูกใช้
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

    // hash token ก่อน lookup เสมอ
    const tokenHash = sha256(refreshToken);
    const tokenRecord = await this.authTokenService.findValidRefreshToken(
      payload.userId,
      tokenHash,
    );

    if (!tokenRecord) {
      // token ไม่พบหรือถูกใช้แล้ว — revoke ทั้งหมดเพื่อกัน reuse attack
      await this.authTokenService.revokeAllUserTokens(payload.userId);
      throw new UnauthorizedException('Refresh token reuse detected - all sessions revoked');
    }

    await this.authTokenService.markTokenUsed(tokenRecord.id);
    const tokens = await this.issueToken(tokenRecord.user);

    return {
      token: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: 900,
      },
    };
  }

  async logout(userId: number) {
    await this.authTokenService.revokeUserTokens(userId, AuthTokenType.REFRESH_TOKEN);

    return {
      status: 'success',
      message: 'Logged out successfully',
    };
  }

  // verify email โดยใช้ token ที่ส่งไปทาง email
  async verifyEmail(token: string): Promise<{ message: string }> {
    const tokenHash = sha256(token); // hash ก่อน lookup เสมอ

    // ใช้ consumeToken แทน find + markUsed แยก (atomic)
    const authToken = await this.authTokenService.consumeToken(
      tokenHash,
      AuthTokenType.EMAIL_VERIFY,
    );

    if (!authToken) {
      throw new BadRequestException('Invalid or expired verification token');
    }

    const user = authToken.user;

    // Early return ถ้า verify แล้ว
    if (user.isEmailVerified) {
      return { message: 'Email already verified' };
    }

    user.isEmailVerified = true;
    await this.usersService.save(user);

    return { message: 'Email verified successfully' };
  }

  // ลืมรหัสผ่าน - ส่ง email พร้อมลิงก์รีเซ็ตรหัสผ่าน
  async forgotPassword(email: string) {
    const normalizedEmail = email.toLowerCase().trim();
    const user = await this.usersService.findByEmail(normalizedEmail);

    // ไม่บอกผู้ใช้ว่ามี email หรือไม่ เพื่อความปลอดภัย
    if (!user) {
      return { status: 'success', message: 'If this email exists, a reset link has been sent' };
    }

    const rawToken = generateRandomToken();
    const tokenHash = sha256(rawToken);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 นาที

    await this.authTokenService.createToken(
      user,
      AuthTokenType.PASSWORD_RESET,
      tokenHash,
      expiresAt,
    );

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`;

    // fire-and-forget เหมือน register - ไม่ให้ mail failure ทำ request พัง
    this.mailService
      .sendEmail(
        normalizedEmail,
        'Reset your password',
        `<p>Click here to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`,
      )
      .catch((error) => {
        this.logger.error('Failed to send reset password email', {
          email: normalizedEmail,
          message: error?.message,
          stack: error?.stack,
        });
      });

    return {
      status: 'success',
      message: 'If this email exists, a reset link has been sent',
    };
  }

  // reset password โดยใช้ token ที่ส่งไปทาง email
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
    authToken.user.password = hashedPassword;
    await this.usersService.save(authToken.user);

    // revoke refresh token ทั้งหมด เพราะ password เปลี่ยนแล้ว
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
