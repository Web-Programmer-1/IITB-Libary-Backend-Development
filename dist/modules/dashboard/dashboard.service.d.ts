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
        })[];
        myReviews: ({
            book: {
                title: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            bookId: string;
            userId: string;
            rating: number;
            comment: string;
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
            issueReturnId: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            isPaid: boolean;
            paidDate: Date | null;
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
            issueReturnId: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            isPaid: boolean;
            paidDate: Date | null;
        };
    }>;
}
