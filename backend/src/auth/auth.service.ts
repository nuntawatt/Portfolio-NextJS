import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/entities/users.entity';
import { LoginDto } from './dto/login.dto';
import { AppException } from '../common/error';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUserCredentials(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const existingUser = await this.usersService.findByEmailWithPassword(email);

    if (!existingUser) {
      return null;
    }

    const isMatch = await bcrypt.compare(pass, existingUser.password);
    if (!isMatch) return null;

    const { password, ...result } = existingUser;
    return result;
  }

  async login(loginData: LoginDto) {
    const email = loginData.email.toLowerCase().trim();

    const user = await this.validateUserCredentials(email, loginData.password);

    if (!user) {
      this.logger.warn(`Failed login attempt for email: ${email}`);
      throw new AppException('AUTH_INVALID_CREDENTIALS');
    }

    const payload = {
      userId: user.id,
      email: user.email,
    };

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '1h' }),
      user,
    };
  }

  async register(userData: RegisterDto) {
    const email = userData.email.toLowerCase().trim();

    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      this.logger.warn(`Duplicate user registration attempt for email: ${email}`);
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
    return result;
  }

  async oauthLogin(oauthUser: any) {
    // 1. หา oauth account ก่อน
    let oauthAccount = await this.usersService.findByOAuth(
      oauthUser.provider,
      oauthUser.providerId,
    );

    let user;

    if (oauthAccount) {
      user = oauthAccount.user;
    } else {
      // 2. หา user ด้วย email
      user = await this.usersService.findByEmail(oauthUser.email);

      // 3. ถ้าไม่มี → create user
      if (!user) {
        user = await this.usersService.create({
          email: oauthUser.email,
          firstName: oauthUser.firstName || '',
          lastName: oauthUser.lastName || '',
          password: '', // oauth ไม่ใช้ password
        });
      }

      // console.log('User after email check:', user);

      // 4. create oauth account
      await this.usersService.createOAuthAccount(
        user,
        oauthUser.provider,
        oauthUser.providerId,
      );
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    // console.log('JWT Payload:', payload);
    return this.jwtService.sign(payload);
  }
}
