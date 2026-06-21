import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
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
    me(userId: string): Promise<{
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
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<{
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
