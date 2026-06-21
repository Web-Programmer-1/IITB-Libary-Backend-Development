import { PrismaService } from '../prisma/prisma.service';
import { BookQueryDto } from './dto/book-query.dto';
import { CreateBookDto } from './dto/create-book.dto';
export declare class BooksService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateBookDto): import("src/generated/client").Prisma.Prisma__BookClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        isbn: string;
        categoryId: string;
        shelfNo: string;
        totalCopies: number;
        availableCopies: number;
        bookImage: string;
        description: string;
        publishedYear: number;
        publisher: string;
        pages: number;
        language: string;
    }, never, import("src/generated/client/runtime/library").DefaultArgs>;
    findAll(query: BookQueryDto): import("src/generated/client").Prisma.PrismaPromise<({
        category: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            slug: string;
            categoryImage: string;
        };
        reviews: {
            rating: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        isbn: string;
        categoryId: string;
        shelfNo: string;
        totalCopies: number;
        availableCopies: number;
        bookImage: string;
        description: string;
        publishedYear: number;
        publisher: string;
        pages: number;
        language: string;
    })[]>;
    findOne(id: string): Promise<{
        category: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            slug: string;
            categoryImage: string;
        };
        reviews: ({
            user: {
                id: string;
                name: string;
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
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        isbn: string;
        categoryId: string;
        shelfNo: string;
        totalCopies: number;
        availableCopies: number;
        bookImage: string;
        description: string;
        publishedYear: number;
        publisher: string;
        pages: number;
        language: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        isbn: string;
        categoryId: string;
        shelfNo: string;
        totalCopies: number;
        availableCopies: number;
        bookImage: string;
        description: string;
        publishedYear: number;
        publisher: string;
        pages: number;
        language: string;
    }>;
}
