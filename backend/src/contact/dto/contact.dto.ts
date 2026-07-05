import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ContactDto {
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
