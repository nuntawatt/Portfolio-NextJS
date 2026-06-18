import { Injectable } from '@nestjs/common';
import { MailService } from '../auth/mail/mail.service';

@Injectable()
export class ContactService {
  constructor(private readonly mailService: MailService) {}

  async sendContactMessage(name: string, userEmail: string, subject: string, message: string) {
    const developerEmail = 'morgorn.wk@gmail.com';

    const emailHtml = `
      <h2>New Contact Message from Portfolio</h2>
      <p><strong>Sender Name:</strong> ${name}</p>
      <p><strong>Sender Email:</strong> ${userEmail}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message Details:</strong></p>
      <blockquote style="background: #f4f4f4; padding: 10px 15px; border-left: 3px solid #f97316; margin: 10px 0;">
        ${message.replace(/\n/g, '<br />')}
      </blockquote>
    `;

    // Send email via Resend
    await this.mailService.sendEmail(
      developerEmail,
      `[Portfolio Contact] ${subject}`,
      emailHtml,
    );

    return {
      success: true,
      message: 'Message sent successfully!',
    };
  }
}
