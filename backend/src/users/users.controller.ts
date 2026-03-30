import {
  Controller,
  Get,
  UseGuards,
  Request,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // ─────────────────────────────────────────────────────────────────────────────
  // SECTION 1 : Profile
  // ─────────────────────────────────────────────────────────────────────────────

  @Get('profile')
  @ApiOperation({
    summary: 'Get current user profile',
    description: 'ดึงข้อมูล profile ของ user ที่ login อยู่',
  })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProfile(@Request() req) {
    return {
      user: {
        id: req.user.userId,
        email: req.user.email,
        role: req.user.role,
        isEmailVerified: req.user.isEmailVerified,
      },
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // SECTION 2 : Account Management
  // ─────────────────────────────────────────────────────────────────────────────

  @Delete('delete')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete user account (soft delete)',
    description: 'ลบบัญชีแบบ soft delete (ข้อมูลยังอยู่ใน DB แต่ถูก deactivate)',
  })
  @ApiResponse({ status: 200, description: 'Account deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deleteProfile(@Request() req) {
    const userId = req.user.userId ?? req.user.id;

    await this.usersService.softDelete(userId);

    return {
      success: true,
      message: 'Account deleted successfully',
    };
  }
}
