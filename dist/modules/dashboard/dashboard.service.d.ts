import { PrismaService } from '../prisma/prisma.service';
export declare class DashboardService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    shared(): Promise<{
        totalBooks: number;
        totalUsers: number;
        activeIssues: number;
        totalPendingFines: number | import("@prisma/client/runtime/library").Decimal;
        lowStockBooks: {
            id: string;
            title: string;
            availableCopies: number;
        }[];
    }>;
    mine(userId: string): Promise<{
        profile: {
            id: string;
            name: string;
            email: string;
            phone: string;
            profileImage: string | null;
            joinDate: Date;
            fineBalance: import("@prisma/client/runtime/library").Decimal;
        } | null;
        activeIssues: ({
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
        })[];
        myReviews: ({
            book: {
                title: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            rating: number;
            comment: string;
            bookId: string;
            userId: string;
        })[];
        myFines: ({
            issueReturn: {
                book: {
                    id: string;
                    title: string;
                    bookImage: string;
                };
                id: string;
                dueDate: Date;
                returnDate: Date | null;
                isReturned: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            isPaid: boolean;
            paidDate: Date | null;
            issueReturnId: string;
        })[];
    }>;
    payFine(userId: string, fineId: string): Promise<{
        message: string;
        fine: {
            issueReturn: {
                book: {
                    id: string;
                    title: string;
                    bookImage: string;
                };
                id: string;
                dueDate: Date;
                returnDate: Date | null;
                isReturned: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            isPaid: boolean;
            paidDate: Date | null;
            issueReturnId: string;
        };
    }>;
}
