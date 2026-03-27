import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly resend: Resend;
  private readonly mailFrom: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    const mailFrom = this.configService.get<string>('MAIL_FROM');

    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not defined');
    }

    if (!mailFrom) {
      throw new Error('MAIL_FROM is not defined');
    }

    this.resend = new Resend(apiKey);
    this.mailFrom = mailFrom;
  }

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    // basic validation (กัน input แปลก ๆ)
    if (!to || !to.includes('@')) {
      this.logger.warn(`Invalid email address: ${to}`);
      throw new InternalServerErrorException('INVALID_EMAIL');
    }

    try {
      const response = await this.resend.emails.send({
        from: this.mailFrom,
        to,
        subject,
        html,
      });

      if (response?.data?.id) {
        this.logger.log(`Email sent (id=${response.data.id})`);
        return;
      }

      this.logger.error('Resend failed raw:', response);
      throw new InternalServerErrorException('EMAIL_SEND_FAILED');
    } catch (error: any) {
      this.logger.error('Email sending failed (exception)', {
        message: error?.message,
        stack: error?.stack,
        to,
        subject,
      });

      throw new InternalServerErrorException('EMAIL_SEND_FAILED');
    }
  }
}
