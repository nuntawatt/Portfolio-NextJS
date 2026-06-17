import {
  Controller,
  Get,
  UseGuards,
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
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({
    summary: 'Get current user profile',
    description: 'Retrieve the authenticated user profile.',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProfile(
    @CurrentUser()
    user: {
      userId: string;
      email: string;
      role: string;
      isEmailVerified: boolean;
    },
  ) {
    return {
      user: {
        id: user.userId,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
      },
    };
  }

  @Delete('delete')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete user account (soft delete)',
    description:
      'Soft-delete the account. Data remains in DB but is deactivated.',
  })
  @ApiResponse({ status: 200, description: 'Account deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deleteProfile(@CurrentUser('userId') userId: string) {
    await this.usersService.softDelete(userId);

    return {
      success: true,
      message: 'Account deleted successfully',
    };
  }
}
