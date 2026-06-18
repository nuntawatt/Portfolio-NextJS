import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ContactService } from './contact.service';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiProperty,
} from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

class ContactDto {
  @ApiProperty({ description: 'Sender name', example: 'Nuntawat' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Contact subject', example: 'Inquiry' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    description: 'Contact message body',
    example: 'Hello, I want to collaborate.',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}

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
