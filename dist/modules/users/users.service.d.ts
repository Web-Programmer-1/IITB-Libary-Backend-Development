import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateUserDto): Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        email: string;
        password: string;
        phone: string;
        address: string;
        profileImage: string | null;
        joinDate: Date;
        maxBooksAllowed: number;
        fineBalance: Prisma.Decimal;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): Prisma.PrismaPromise<{
        id: string;
        name: string;
        email: string;
        phone: string;
        fineBalance: Prisma.Decimal;
        createdAt: Date;
    }[]>;
    findByEmail(email: string): Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        email: string;
        password: string;
        phone: string;
        address: string;
        profileImage: string | null;
        joinDate: Date;
        maxBooksAllowed: number;
        fineBalance: Prisma.Decimal;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findById(id: string): Promise<{
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
            fineAmount: Prisma.Decimal;
            isReturned: boolean;
        }[];
        fines: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            issueReturnId: string;
            amount: Prisma.Decimal;
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
        fineBalance: Prisma.Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: Prisma.UserUpdateInput): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        phone: string;
        address: string;
        profileImage: string | null;
        joinDate: Date;
        maxBooksAllowed: number;
        fineBalance: Prisma.Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
    sanitize(user: User | (User & Record<string, unknown>)): {
        id: string;
        name: string;
        email: string;
        phone: string;
        address: string;
        profileImage: string | null;
        joinDate: Date;
        maxBooksAllowed: number;
        fineBalance: Prisma.Decimal;
        createdAt: Date;
        updatedAt: Date;
    } | {
        [x: string]: unknown;
        id: string;
        name: string;
        email: string;
        phone: string;
        address: string;
        profileImage: string | null;
        joinDate: Date;
        maxBooksAllowed: number;
        fineBalance: Prisma.Decimal;
        createdAt: Date;
        updatedAt: Date;
    };
}
