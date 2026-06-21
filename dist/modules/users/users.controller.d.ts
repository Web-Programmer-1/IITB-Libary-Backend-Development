import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): import("src/generated/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        name: string;
        email: string;
        phone: string;
        fineBalance: import("src/generated/client/runtime/library").Decimal;
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
            issueDate: Date;
            dueDate: Date;
            returnDate: Date | null;
            fineAmount: import("src/generated/client/runtime/library").Decimal;
            isReturned: boolean;
            createdAt: Date;
            updatedAt: Date;
            bookId: string;
            userId: string;
        }[];
        fines: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            issueReturnId: string;
            amount: import("src/generated/client/runtime/library").Decimal;
            isPaid: boolean;
            paidDate: Date | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        password: string;
        phone: string;
        address: string;
        profileImage: string | null;
        joinDate: Date;
        maxBooksAllowed: number;
        fineBalance: import("src/generated/client/runtime/library").Decimal;
    }>;
}
