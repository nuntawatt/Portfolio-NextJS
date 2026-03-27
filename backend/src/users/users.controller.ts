import {
  Controller,
  Get,
  UseGuards,
  Request,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  @HttpCode(200)
  async deleteProfile(@Request() req) {
    const userId = req.user.userId || req.user.id;

    await this.usersService.softDelete(userId);

    return {
      sucess: true,
      message: 'User deleted successfully',
    };
  }
}
