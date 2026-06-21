import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewsService } from './reviews.service';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
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
        bookId: string;
        userId: string;
        rating: number;
        comment: string;
    })[]>;
    create(req: {
        user: {
            sub: string;
        };
    }, dto: CreateReviewDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        bookId: string;
        userId: string;
        rating: number;
        comment: string;
    }>;
}
