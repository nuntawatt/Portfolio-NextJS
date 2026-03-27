import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  // =============================
  // REGISTER, LOGIN, VERIFY EMAIL
  // =============================
  @Throttle({ default: { limit: 3, ttl: 300 } }) // 3 ครั้ง / 5 นาที
  @Post('register')
  async register(@Body() userData: RegisterDto) {
    return this.authService.register(userData);
  }

  @Throttle({ default: { limit: 5, ttl: 60 } }) // 5 ครั้ง / นาที
  @Post('login')
  async login(@Body() loginData: LoginDto) {
    return this.authService.login(loginData);
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }


  // ======================================================
  // REFRESH TOKEN, LOGOUT, FORGOT PASSWORD, RESET PASSWORD
  // ======================================================
  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: any) {
    return this.authService.logout(req.user.userId);
  }


  @Throttle({ default: { limit: 3, ttl: 300 } }) // 3 ครั้ง / 5 นาที
  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; password: string }) {
    return this.authService.resetPassword(body.token, body.password);
  }

  // ====================
  // OAUTH LOGIN (GOOGLE)
  // ====================
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() { }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req, @Res() res) {
    const token = await this.authService.oauthLogin(req.user);
    return res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
  }

  // ====================
  // OAUTH LOGIN (GITHUB)
  // ====================
  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth() { }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubCallback(@Req() req, @Res() res) {
    const token = await this.authService.oauthLogin(req.user);
    return res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
  }
}
