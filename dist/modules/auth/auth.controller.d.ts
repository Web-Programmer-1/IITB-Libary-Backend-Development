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
        };
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        user: {
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
            fineBalance: import("src/generated/client/runtime/library").Decimal;
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
            fineBalance: import("src/generated/client/runtime/library").Decimal;
        };
    }>;
    me(req: {
        user: {
            sub: string;
        };
    }): Promise<{
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
        fineBalance: import("src/generated/client/runtime/library").Decimal;
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
        fineBalance: import("src/generated/client/runtime/library").Decimal;
    }>;
    updateProfile(req: {
        user: {
            sub: string;
        };
    }, dto: UpdateProfileDto): Promise<{
        message: string;
        user: {
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
            fineBalance: import("src/generated/client/runtime/library").Decimal;
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
            fineBalance: import("src/generated/client/runtime/library").Decimal;
        };
    }>;
}
