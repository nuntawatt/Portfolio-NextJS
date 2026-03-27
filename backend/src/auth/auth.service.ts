import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/entities/users.entity';
import { LoginDto } from './dto/login.dto';
import { AppException } from '../common/error';
import { OAuthUser } from './types/auth-type';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  // =========================
  // VALIDATE LOGIN
  // =========================
  async validateUserCredentials(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const existingUser = await this.usersService.findByEmailWithPassword(email);

    if (!existingUser || existingUser.deletedAt) {
      return null;
    }

    // กัน OAuth user login ด้วย password
    if (!existingUser.password) {
      throw new AppException('USE_OAUTH_LOGIN');
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
      throw new AppException('AUTH_INVALID_CREDENTIALS');
    }

    // verify email
    if (!user.isEmailVerified) {
      throw new AppException('EMAIL_NOT_VERIFIED');
    }

    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    };

    this.logger.log(`User logged in: ${user.email}`);

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '1h' }),
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
      throw new AppException('AUTH_USER_ALREADY_EXISTS');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await this.usersService.create({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email,
      password: hashedPassword,
    });

    const { password, ...result } = newUser;

    this.logger.log(`New user registered: ${email}`);
    return result;
  }

  // =========================
  // OAUTH LOGIN
  // =========================
  async oauthLogin(oauthUser: OAuthUser) {
    // 1. validate email
    if (!oauthUser.email) {
      throw new AppException('OAUTH_EMAIL_REQUIRED');
    }

    const email = oauthUser.email.toLowerCase().trim();

    // 2. หา oauth account
    let oauthAccount = await this.usersService.findByOAuth(
      oauthUser.provider,
      oauthUser.providerId,
    );

    let user: User;

    if (oauthAccount) {
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

    // 5. JWT (consistent)
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      isEmailVerified: true, // OAuth users are considered verified
    };

    this.logger.log(`OAuth login: ${oauthUser.provider} - ${user.email}`);

    return this.jwtService.sign(payload, { expiresIn: '1h' });
  }
}
