import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
export declare class ReviewsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateReviewDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        comment: string;
        bookId: string;
        userId: string;
    }>;
    findByBook(bookId: string): import("@prisma/client").Prisma.PrismaPromise<({
        user: {
            id: string;
            name: string;
            profileImage: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        comment: string;
        bookId: string;
        userId: string;
    })[]>;
}
