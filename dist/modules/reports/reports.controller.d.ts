import { ReportsService } from './reports.service';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    issuedBooks(): import("src/generated/client").Prisma.PrismaPromise<({
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
        fineAmount: import("src/generated/client/runtime/library").Decimal;
        isReturned: boolean;
        createdAt: Date;
        updatedAt: Date;
        bookId: string;
        userId: string;
    })[]>;
    overdue(): import("src/generated/client").Prisma.PrismaPromise<({
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
        fineAmount: import("src/generated/client/runtime/library").Decimal;
        isReturned: boolean;
        createdAt: Date;
        updatedAt: Date;
        bookId: string;
        userId: string;
    })[]>;
    topBooks(): import("src/generated/client").Prisma.PrismaPromise<({
        _count: {
            issues: number;
        };
    } & {
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
    })[]>;
}
