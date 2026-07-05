import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ContactService } from './contact.service';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ContactDto } from './dto/contact.dto';

interface RequestWithUser {
  user: {
    email: string;
  };
}

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Send email contact message' })
  async sendContactMessage(
    @Body() body: ContactDto,
    @Req() req: RequestWithUser,
  ) {
    const { name, subject, message } = body;
    const userEmail = req.user.email;

    return this.contactService.sendContactMessage(
      name,
      userEmail,
      subject,
      message,
    );
  }
}
