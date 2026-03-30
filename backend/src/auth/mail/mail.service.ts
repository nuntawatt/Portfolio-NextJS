import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 500;

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);
    private readonly resend: Resend;
    private readonly mailFrom: string;

    constructor(private readonly configService: ConfigService) {
        const apiKey = this.configService.getOrThrow<string>('RESEND_API_KEY');
        const mailFrom = this.configService.getOrThrow<string>('MAIL_FROM');

        this.resend = new Resend(apiKey);
        this.mailFrom = mailFrom;
    }

    // ─── Public ───────────────────────────────────────────────────────────────────

    async sendEmail(to: string, subject: string, html: string): Promise<void> {
        if (!EMAIL_REGEX.test(to)) {
            this.logger.warn(`Attempted to send email to invalid address: ${to}`);
            throw new InternalServerErrorException('INVALID_EMAIL');
        }

        await this.sendWithRetry(to, subject, html);
    }

    // ─── Private ─────────────────────────────────────────────────────────────────

    private async sendWithRetry(
        to: string,
        subject: string,
        html: string,
        attempt = 1,
    ): Promise<void> {
        try {
            const response = await this.resend.emails.send({
                from: this.mailFrom,
                to,
                subject,
                html,
            });

            if (response?.data?.id) {
                this.logger.log(`Email sent to=${to} id=${response.data.id}`);
                return;
            }

            throw new Error('No email id returned from Resend');

        } catch (error: any) {
            this.logger.warn(
                `Email attempt ${attempt}/${MAX_RETRIES + 1} failed: ${error?.message}`,
            );

            if (attempt <= MAX_RETRIES) {
                await this.delay(RETRY_DELAY_MS * attempt); // exponential backoff เล็กน้อย
                return this.sendWithRetry(to, subject, html, attempt + 1);
            }

            this.logger.error('All email attempts failed', {
                to,
                subject,
                message: error?.message,
                stack: error?.stack,
            });

            throw new InternalServerErrorException('EMAIL_SEND_FAILED');
        }
    }

    private delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}