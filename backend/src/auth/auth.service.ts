import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { AppException } from '../common/error';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginData: LoginDto) {
    const user = await this.validateUser(
      loginData.email,
      loginData.password
    );

    if (!user) {
      throw new AppException('AUTH_INVALID_CREDENTIALS');
    }

    const payload = { email: user.email, sub: user.userId };

    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }

  async register(userData: RegisterDto) {
    const existingUser = await this.usersService.findOne(userData.email);

    if (existingUser) {
      throw new AppException('AUTH_USER_ALREADY_EXISTS');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await this.usersService.create({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: hashedPassword,
    });

    // console.log('New user created:', newUser);

    const { password, ...result } = newUser;
    return result;
  }
}
