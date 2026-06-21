import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { IssueBookDto } from './dto/issue-book.dto';
import { EmailService } from '../email/email.service';
export declare class CirculationService {
    private readonly prisma;
    private readonly emailService;
    constructor(prisma: PrismaService, emailService: EmailService);
    issue(dto: IssueBookDto): Promise<{
        id: string;
        issueDate: Date;
        dueDate: Date;
        returnDate: Date | null;
        fineAmount: Prisma.Decimal;
        isReturned: boolean;
        createdAt: Date;
        updatedAt: Date;
        bookId: string;
        userId: string;
    }>;
    returnBook(issueId: string): Promise<{
        id: string;
        issueDate: Date;
        dueDate: Date;
        returnDate: Date | null;
        fineAmount: Prisma.Decimal;
        isReturned: boolean;
        createdAt: Date;
        updatedAt: Date;
        bookId: string;
        userId: string;
    }>;
    updateDueDate(issueId: string, dueDateInput: string): Promise<({
        user: {
            id: string;
            name: string;
            email: string;
        };
        book: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            author: string;
            isbn: string;
            categoryId: string;
            shelfNo: string;
            totalCopies: number;
            availableCopies: number;
            bookImage: string;
            description: string;
            publishedYear: number;
            publisher: string;
            pages: number;
            language: string;
        };
        fine: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            issueReturnId: string;
            amount: Prisma.Decimal;
            isPaid: boolean;
            paidDate: Date | null;
        } | null;
    } & {
        id: string;
        issueDate: Date;
        dueDate: Date;
        returnDate: Date | null;
        fineAmount: Prisma.Decimal;
        isReturned: boolean;
        createdAt: Date;
        updatedAt: Date;
        bookId: string;
        userId: string;
    }) | null>;
    myIssues(userId: string): Prisma.PrismaPromise<({
        book: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            author: string;
            isbn: string;
            categoryId: string;
            shelfNo: string;
            totalCopies: number;
            availableCopies: number;
            bookImage: string;
            description: string;
            publishedYear: number;
            publisher: string;
            pages: number;
            language: string;
        };
    } & {
        id: string;
        issueDate: Date;
        dueDate: Date;
        returnDate: Date | null;
        fineAmount: Prisma.Decimal;
        isReturned: boolean;
        createdAt: Date;
        updatedAt: Date;
        bookId: string;
        userId: string;
    })[]>;
    issueHistory(): Prisma.PrismaPromise<({
        user: {
            id: string;
            name: string;
            email: string;
        };
        book: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            author: string;
            isbn: string;
            categoryId: string;
            shelfNo: string;
            totalCopies: number;
            availableCopies: number;
            bookImage: string;
            description: string;
            publishedYear: number;
            publisher: string;
            pages: number;
            language: string;
        };
    } & {
        id: string;
        issueDate: Date;
        dueDate: Date;
        returnDate: Date | null;
        fineAmount: Prisma.Decimal;
        isReturned: boolean;
        createdAt: Date;
        updatedAt: Date;
        bookId: string;
        userId: string;
    })[]>;
    runOverdueChecks(forceEmail?: boolean): Promise<{
        message: string;
        checked: number;
        processed: number;
        emailsSent: number;
        emailFailures: number;
        activeIssueCount: number;
        nextDueDate: string | null;
    }>;
}
