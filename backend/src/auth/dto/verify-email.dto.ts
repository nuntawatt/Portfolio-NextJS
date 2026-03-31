import { IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto {
    @ApiProperty({ example: 'a3f9c2d1...' })
    @IsString()
    @IsNotEmpty()
    @Length(64, 64) // sha256 hex = 64 chars ของ raw token (32 bytes = 64 hex)
    token: string;
}