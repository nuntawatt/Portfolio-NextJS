import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);

    async sendEmail(to: string, subject: string, html: string) {
        this.logger.log(`Send email to: ${to}`);
        this.logger.log(`Subject: ${subject}`);
        this.logger.log(`HTML: ${html}`);
    }
}