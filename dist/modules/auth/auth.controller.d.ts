import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        message: string;
        user: {
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
        };
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            name: string;
            email: string;
            phone: string;
            address: string;
            profileImage: string | null;
            joinDate: Date;
            maxBooksAllowed: number;
            fineBalance: import("@prisma/client/runtime/library").Decimal;
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
            fineBalance: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    me(req: {
        user: {
            sub: string;
        };
    }): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string;
        address: string;
        profileImage: string | null;
        joinDate: Date;
        maxBooksAllowed: number;
        fineBalance: import("@prisma/client/runtime/library").Decimal;
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
        fineBalance: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateProfile(req: {
        user: {
            sub: string;
        };
    }, dto: UpdateProfileDto): Promise<{
        message: string;
        user: {
            id: string;
            name: string;
            email: string;
            phone: string;
            address: string;
            profileImage: string | null;
            joinDate: Date;
            maxBooksAllowed: number;
            fineBalance: import("@prisma/client/runtime/library").Decimal;
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
            fineBalance: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
