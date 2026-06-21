import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        email: string;
        phone: string;
        fineBalance: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        reviews: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            bookId: string;
            userId: string;
            rating: number;
            comment: string;
        }[];
        issues: {
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
        }[];
        fines: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            issueReturnId: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            isPaid: boolean;
            paidDate: Date | null;
        }[];
    } & {
        id: string;
        name: string;
        email: string;
        password: string;
        phone: string;
        address: string;
        profileImage: string | null;
        joinDate: Date;
        maxBooksAllowed: number;
        fineBalance: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
