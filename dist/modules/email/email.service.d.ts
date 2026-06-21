import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class EmailService implements OnModuleInit {
    private readonly configService;
    private transporter;
    private readonly logger;
    constructor(configService: ConfigService);
    private hasSmtpCredentials;
    onModuleInit(): Promise<void>;
    sendOverdueEmail(to: string, name: string, bookTitle: string, dueDate: Date, fine: number, overdueDays: number): Promise<boolean>;
}
