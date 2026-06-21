import { Prisma, User } from '../../generated/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateUserDto): Prisma.Prisma__UserClient<{
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
        fineBalance: Prisma.Decimal;
    }, never, import("src/generated/client/runtime/library").DefaultArgs>;
    findAll(): Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        name: string;
        email: string;
        phone: string;
        fineBalance: Prisma.Decimal;
    }[]>;
    findByEmail(email: string): Prisma.Prisma__UserClient<{
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
        fineBalance: Prisma.Decimal;
    } | null, null, import("src/generated/client/runtime/library").DefaultArgs>;
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
            issueDate: Date;
            dueDate: Date;
            returnDate: Date | null;
            fineAmount: Prisma.Decimal;
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
            amount: Prisma.Decimal;
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
        fineBalance: Prisma.Decimal;
    }>;
    update(id: string, dto: Prisma.UserUpdateInput): Promise<{
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
        fineBalance: Prisma.Decimal;
    }>;
    sanitize(user: User | (User & Record<string, unknown>)): {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        phone: string;
        address: string;
        profileImage: string | null;
        joinDate: Date;
        maxBooksAllowed: number;
        fineBalance: Prisma.Decimal;
    } | {
        [x: string]: unknown;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        phone: string;
        address: string;
        profileImage: string | null;
        joinDate: Date;
        maxBooksAllowed: number;
        fineBalance: Prisma.Decimal;
    };
}
