import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { OVERDUE_FINE_PER_DAY } from '../circulation/circulation.constants';

@Injectable()
export class EmailService implements OnModuleInit {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly configService: ConfigService) {
    const host = this.configService.get<string>('SMTP_HOST') || 'smtp.gmail.com';
    const port = Number(this.configService.get<number>('SMTP_PORT')) || 587;
    const user = this.configService.get<string>('SMTP_USER') || '';
    const pass = this.configService.get<string>('SMTP_PASS') || '';

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: user && pass ? { user, pass } : undefined,
    });
  }

  private hasSmtpCredentials() {
    return Boolean(
      this.configService.get<string>('SMTP_USER') &&
        this.configService.get<string>('SMTP_PASS'),
    );
  }

  async onModuleInit() {
    if (!this.hasSmtpCredentials()) {
      this.logger.warn('SMTP credentials are missing. Overdue emails will not be sent.');
      return;
    }

    try {
      await this.transporter.verify();
      this.logger.log('SMTP transporter verified successfully.');
    } catch (error) {
      this.logger.error(
        'SMTP transporter verification failed.',
        error instanceof Error ? error.stack : String(error),
      );
    }
  }

  async sendOverdueEmail(
    to: string,
    name: string,
    bookTitle: string,
    dueDate: Date,
    fine: number,
    overdueDays: number,
  ) {
    const formattedDueDate = new Date(dueDate).toLocaleDateString();
    const mailOptions = {
      from: `"IITB Digital Library" <${this.configService.get<string>('SMTP_USER') || 'no-reply@iitb.ac.in'}>`,
      to,
      subject: `Overdue Notice: "${bookTitle}"`,
      text: `Dear ${name},

The book "${bookTitle}" was due on ${formattedDueDate}.
It is now overdue by ${overdueDays} day(s), and your current fine is ৳${fine} at ৳${OVERDUE_FINE_PER_DAY}/day.

Please return the book as soon as possible to avoid additional charges.
`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
          <h2 style="color: #d9534f; border-bottom: 2px solid #d9534f; padding-bottom: 10px;">Overdue Book Notification</h2>
          <p>Dear <strong>${name}</strong>,</p>
          <p>This is a reminder that the book <strong>"${bookTitle}"</strong> was due on <strong>${formattedDueDate}</strong>.</p>
          <p>Since the due date has passed, an overdue fine has been charged. Details below:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Book Title:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${bookTitle}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Due Date:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${formattedDueDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Overdue Duration:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${overdueDays} day(s)</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; color: #d9534f;"><strong>Accrued Fine:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; color: #d9534f; font-weight: bold;">৳${fine} (৳${OVERDUE_FINE_PER_DAY}/day)</td>
            </tr>
          </table>
          <p style="margin-top: 20px;">Please return the book to the library as soon as possible to avoid further fines. You must clear your fine balance of <strong>৳${fine}</strong> before issuing any new books.</p>
          <p style="margin-top: 25px; border-top: 1px solid #ddd; padding-top: 15px; font-size: 12px; color: #777;">
            This is an automated message from IITB Digital Library Management System. Please do not reply directly to this email.
          </p>
        </div>
      `,
    };

    try {
      this.logger.log(`Attempting to send overdue email to ${to} for "${bookTitle}"...`);

      if (!this.hasSmtpCredentials()) {
        this.logger.warn(`SMTP credentials not fully configured. Email content (would be sent to ${to}):`);
        this.logger.log(`Subject: ${mailOptions.subject}`);
        this.logger.log(`Accumulated fine: ৳${fine}`);
        return false;
      }

      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email sent successfully: ${info.messageId}`);
      return true;
    } catch (error) {
      this.logger.error(
        `Failed to send overdue email to ${to}.`,
        error instanceof Error ? error.stack : String(error),
      );
      return false;
    }
  }
}
