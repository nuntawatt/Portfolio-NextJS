import {
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
import {
  compareToken,
  generateRandomToken,
  hashToken,
  sha256,
} from './utils/token.util';
import { MailService } from './mail/mail.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
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

  // GENERATE REFRESH TOKEN (สำหรับการสร้าง refresh token ที่มีข้อมูลผู้ใช้และระยะเวลาหมดอายุที่ยาวกว่า access token)
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

  // ISSUE TOKENS (ACCESS + REFRESH)
  private async issueToken(user: User) {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
    const refreshTokenHash = await hashToken(refreshToken);

    await this.usersService.updateRefreshToken(user.id, refreshTokenHash);

    return { accessToken, refreshToken };
  }

  // ─── Auth Core ────────────────────────────────────────────────────────────────

  async validateUserCredentials(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const existingUser = await this.usersService.findByEmailWithPassword(email);

    if (!existingUser) return null;

    // กัน OAuth user login ด้วย password
    if (!existingUser.password) {
      throw new UnauthorizedException('Please login with your OAuth provider');
    }

    const isMatch = await bcrypt.compare(pass, existingUser.password);
    if (!isMatch) return null;

    const { password, ...result } = existingUser;
    return result;
  }

  // LOGIN
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

    // return เฉพาะ safe fields ไม่ spread user object ทั้งก้อน
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
        expiresIn: 900, // 15 นาที
      }
    };
  }

  // REGISTER
  async register(userData: RegisterDto) {
    const email = userData.email.toLowerCase().trim();

    const existingUser = await this.usersService.findByEmail(email);

    // กันกรณีที่มี user ที่ถูก soft delete แล้วลงทะเบียนใหม่ด้วย email เดิม (อนุญาตให้ลงทะเบียนใหม่ได้ แต่ต้องแน่ใจว่า user เก่าถูก soft delete จริงๆ)
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

    return {
      status: 'success',
      message: 'Registration successful. Please verify your email.',
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    }
  }

  // OAUTH LOGIN
  async oauthLogin(oauthUser: OAuthUser) {
    // 1. validate email
    if (!oauthUser.email) {
      throw new UnauthorizedException('Email is required from OAuth provider');
    }

    const email = oauthUser.email.toLowerCase().trim();

    // 2. หา oauth account
    const oauthAccount = await this.usersService.findByOAuth(
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
          firstName: oauthUser.firstName ?? oauthUser.username ?? '',
          lastName: oauthUser.lastName ?? '',
          password: null,
          avatar: oauthUser.avatar ?? null,
        });
      }

      // 4. create oauth account
      await this.usersService.createOAuthAccount(user, oauthUser.provider, oauthUser.providerId);
    }

    // 5. ถ้า email ยังไม่ verified ให้ mark เป็น verified
    if (!user.isEmailVerified) {
      user.isEmailVerified = true;
      await this.usersService.save(user);
    }

    // FIX: CRITICAL - ใช้ issueToken() เพื่อได้ JWT ของ app ไม่ใช่ OAuth provider token
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
    }
  }

  // REFRESH TOKEN
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
      // Refesh token reuse - revoke ทันทีเพื่อความปลอดภัย
      await this.usersService.updateRefreshToken(payload.userId, null);
      throw new UnauthorizedException('Refresh token reuse detected - all sessions revoked');
    }

    const tokens = await this.issueToken(user);

    return {
      token: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: 900,
      },
    };
  }

  // LOGOUT
  async logout(userId: number) {
    await this.usersService.updateRefreshToken(userId, null);

    return {
      status: 'success',
      message: 'Logged out successfully',
    };
  }

  // VERIFY EMAIL
  async verifyEmail(token: string) {
    const tokenHash = sha256(token);
    const userByToken = await this.usersService.findByEmailVerificationTokenHash(tokenHash);

    if (!userByToken) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    if (userByToken.isEmailVerified) {
      return { success: true }; // idempotent - verify ซ้ำก็ไม่ error
    }

    if (
      !userByToken.emailVerificationExpires ||
      userByToken.emailVerificationExpires < new Date()
    ) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    await this.usersService.markEmailVerified(userByToken.id);

    return {
      status: 'success',
      message: 'Email verified successfully',
    };
  }

  // FORGOT PASSWORD
  async forgotPassword(email: string) {
    const normalizedEmail = email.toLowerCase().trim();
    const user = await this.usersService.findByEmail(normalizedEmail);

    // คืน success เสมอป้องกัน email enumeration แต่ถ้า user มีอยู่จริงจะส่งอีเมลรีเซ็ตรหัสผ่านให้
    if (!user) {
      return { success: true };
    }

    const rawToken = generateRandomToken();
    const tokenHash = sha256(rawToken);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // token หมดอายุใน 15 นาที

    await this.usersService.updatePasswordResetToken(user.id, tokenHash, expiresAt);

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`;

    await this.mailService.sendEmail(
      normalizedEmail,
      'Reset your password',
      `<p>Click here to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`,
    );

    return {
      status: 'success',
      message: 'If this email exists, a reset link has been sent',
    };
  }

  // RESET PASSWORD
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

    return {
      status: 'success',
      message: 'Password reset successfully',
    };
  }
}
