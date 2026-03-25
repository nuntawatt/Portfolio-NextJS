import { Controller, Post, Body, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: RegisterDto) {
    return this.authService.register(userData);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginData: LoginDto) {
    const user = await this.authService.validateUser(loginData.email, loginData.password);
    return this.authService.login(user);
  }
}
