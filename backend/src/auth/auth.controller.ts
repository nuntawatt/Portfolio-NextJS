import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Throttle } from '@nestjs/throttler';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';


@ApiTags('Authentication')
@ApiBearerAuth('access-token')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  // ─────────────────────────────────────────────────────────────────────────────
  // SECTION 1 : Register / Login / Verify
  // ─────────────────────────────────────────────────────────────────────────────
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ default: { limit: 3, ttl: 300 } }) // 3 ครั้ง / 5 นาที
  @ApiOperation({
    summary: 'Register a new user',
    description: 'สมัครสมาชิกด้วย email/password จะได้รับอีเมล verifycation เพื่อยืนยันตัวตน',
  })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 429, description: 'Too Many Requests' })
  async register(@Body() userData: RegisterDto) {
    return this.authService.register(userData);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 60 } }) // 5 ครั้ง / นาที
  @ApiOperation({
    summary: 'Login with email and password',
    description: 'เข้าสู่ระบบด้วย email/password จะได้รับ access token และ refresh token',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 429, description: 'Too Many Requests' })
  async login(@Body() loginData: LoginDto) {
    return this.authService.login(loginData);
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 300 } }) // กัน brute force
  @ApiOperation({
    summary: 'Verify email address',
    description: 'ยืนยันตัวตนด้วย token ที่ได้รับจากอีเมล',
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['token'],
      properties: {
        token: { type: 'string', example: 'a3f9c2...' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Email verified successfully' })
  @ApiResponse({ status: 400, description: 'Invalid or expired token' })
  async verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.authService.verifyEmail(dto.token);
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // SECTION 2 : Token Management
  // ─────────────────────────────────────────────────────────────────────────────

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 60 } }) 
  @ApiOperation({
    summary: 'Refresh access token',
    description: 'ใช้ refresh token เพื่อขอ access token ใหม่เมื่อ access token หมดอายุ',
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['refreshToken'],
      properties: {
        refreshToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'New access token issued successfully' })
  @ApiResponse({ status: 400, description: 'Invalid refresh token' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Logout (Revoke refresh token)',
    description: 'ออกจากระบบโดยการลบ refresh token ที่ใช้งานอยู่',
  })
  @ApiResponse({ status: 200, description: 'Logout successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async logout(@Req() req: any) {
    return this.authService.logout(req.user.userId);
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // SECTION 3 : Password Reset
  // ─────────────────────────────────────────────────────────────────────────────

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 3, ttl: 300 } }) // 3 ครั้ง / 5 นาที
  @ApiOperation({
    summary: 'Request password reset email',
    description: 'ส่งลิงก์ reset password ไปยัง email ที่ระบุ',
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['email'],
      properties: {
        email: { type: 'string', format: 'email', example: 'user@example.com' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Password reset email sent successfully' })
  @ApiResponse({ status: 400, description: 'Invalid email' })
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Reset password',
    description: 'ใช้ token ที่ได้รับจากอีเมล reset password เพื่อกำหนดรหัสผ่านใหม่',
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['token', 'password'],
      properties: {
        token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
        password: { type: 'string', minLength: 6, example: 'newpassword123' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Password reset successfully' })
  @ApiResponse({ status: 400, description: 'Invalid or expired token' })
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto.token, dto.password);
  }

  // ====================
  // OAUTH LOGIN (GOOGLE)
  // ====================
  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Login with Google (redirect)' })
  @ApiResponse({ status: 302, description: 'Redirect to Google OAuth' })
  async googleAuth() { }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiExcludeEndpoint() // ไม่ต้องการให้แสดงใน Swagger เพราะเป็น endpoint สำหรับ callback เท่านั้น
  async googleCallback(@Req() req, @Res() res) {
    const data = await this.authService.oauthLogin(req.user);

    const params = new URLSearchParams({
      data: JSON.stringify(data),
    });

    return res.redirect(`${process.env.FRONTEND_URL}?${params}`);
  }

  // ====================
  // OAUTH LOGIN (GITHUB)
  // ====================
  @Get('github')
  @UseGuards(AuthGuard('github'))
  @ApiOperation({ summary: 'Login with GitHub (redirect)' })
  @ApiResponse({ status: 302, description: 'Redirect to GitHub OAuth' })
  async githubAuth() { }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  @ApiExcludeEndpoint() // ไม่ต้องการให้แสดงใน Swagger เพราะเป็น endpoint สำหรับ callback เท่านั้น
  async githubCallback(@Req() req, @Res() res) {
    const data = await this.authService.oauthLogin(req.user);

    const params = new URLSearchParams({
      data: JSON.stringify(data),
    });

    return res.redirect(`${process.env.FRONTEND_URL}?${params}`);
  }
}
