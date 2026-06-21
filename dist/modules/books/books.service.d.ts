import { PrismaService } from '../prisma/prisma.service';
import { BookQueryDto } from './dto/book-query.dto';
import { CreateBookDto } from './dto/create-book.dto';
export declare class BooksService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateBookDto): import("@prisma/client").Prisma.Prisma__BookClient<{
        id: string;
        title: string;
        author: string;
        isbn: string;
        shelfNo: string;
        totalCopies: number;
        availableCopies: number;
        bookImage: string;
        description: string;
        publishedYear: number;
        publisher: string;
        pages: number;
        language: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(query: BookQueryDto): import("@prisma/client").Prisma.PrismaPromise<({
        category: {
            id: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
            categoryImage: string;
        };
        reviews: {
            rating: number;
        }[];
    } & {
        id: string;
        title: string;
        author: string;
        isbn: string;
        shelfNo: string;
        totalCopies: number;
        availableCopies: number;
        bookImage: string;
        description: string;
        publishedYear: number;
        publisher: string;
        pages: number;
        language: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
    })[]>;
    findOne(id: string): Promise<{
        category: {
            id: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
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
        title: string;
        author: string;
        isbn: string;
        shelfNo: string;
        totalCopies: number;
        availableCopies: number;
        bookImage: string;
        description: string;
        publishedYear: number;
        publisher: string;
        pages: number;
        language: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string;
        author: string;
        isbn: string;
        shelfNo: string;
        totalCopies: number;
        availableCopies: number;
        bookImage: string;
        description: string;
        publishedYear: number;
        publisher: string;
        pages: number;
        language: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
    }>;
}
