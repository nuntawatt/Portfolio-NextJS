import { Controller, Post, Body, Get, Res, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  async register(@Body() userData: RegisterDto) {
    return this.authService.register(userData);
  }

  @Post('login')
  async login(@Body() loginData: LoginDto) {
    return this.authService.login(loginData);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() { }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req, @Res() res) {
    const token = await this.authService.oauthLogin(req.user);
    return res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
  }

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
