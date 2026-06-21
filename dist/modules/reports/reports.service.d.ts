import { PrismaService } from '../prisma/prisma.service';
export declare class ReportsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
            description: string;
            title: string;
            author: string;
            isbn: string;
            categoryId: string;
            shelfNo: string;
            totalCopies: number;
            availableCopies: number;
            bookImage: string;
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
        fineAmount: import("@prisma/client/runtime/library").Decimal;
        isReturned: boolean;
        createdAt: Date;
        updatedAt: Date;
        bookId: string;
        userId: string;
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
            description: string;
            title: string;
            author: string;
            isbn: string;
            categoryId: string;
            shelfNo: string;
            totalCopies: number;
            availableCopies: number;
            bookImage: string;
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
        fineAmount: import("@prisma/client/runtime/library").Decimal;
        isReturned: boolean;
        createdAt: Date;
        updatedAt: Date;
        bookId: string;
        userId: string;
    })[]>;
    topBooks(): import("@prisma/client").Prisma.PrismaPromise<({
        _count: {
            issues: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        author: string;
        isbn: string;
        categoryId: string;
        shelfNo: string;
        totalCopies: number;
        availableCopies: number;
        bookImage: string;
        publishedYear: number;
        publisher: string;
        pages: number;
        language: string;
    })[]>;
}
