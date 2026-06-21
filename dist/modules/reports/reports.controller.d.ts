import { ReportsService } from './reports.service';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    issuedBooks(): import("@prisma/client").Prisma.PrismaPromise<({
        user: {
            id: string;
            name: string;
            email: string;
        };
        book: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string;
            language: string;
            title: string;
            author: string;
            isbn: string;
            shelfNo: string;
            totalCopies: number;
            bookImage: string;
            description: string;
            publishedYear: number;
            publisher: string;
            pages: number;
            availableCopies: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        bookId: string;
        userId: string;
        issueDate: Date;
        dueDate: Date;
        returnDate: Date | null;
        fineAmount: import("@prisma/client/runtime/library").Decimal;
        isReturned: boolean;
    })[]>;
    overdue(): import("@prisma/client").Prisma.PrismaPromise<({
        user: {
            id: string;
            name: string;
            email: string;
        };
        book: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string;
            language: string;
            title: string;
            author: string;
            isbn: string;
            shelfNo: string;
            totalCopies: number;
            bookImage: string;
            description: string;
            publishedYear: number;
            publisher: string;
            pages: number;
            availableCopies: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        bookId: string;
        userId: string;
        issueDate: Date;
        dueDate: Date;
        returnDate: Date | null;
        fineAmount: import("@prisma/client/runtime/library").Decimal;
        isReturned: boolean;
    })[]>;
    topBooks(): import("@prisma/client").Prisma.PrismaPromise<({
        _count: {
            issues: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
        language: string;
        title: string;
        author: string;
        isbn: string;
        shelfNo: string;
        totalCopies: number;
        bookImage: string;
        description: string;
        publishedYear: number;
        publisher: string;
        pages: number;
        availableCopies: number;
    })[]>;
}
