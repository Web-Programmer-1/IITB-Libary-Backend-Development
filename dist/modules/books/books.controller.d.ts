import { BookQueryDto } from './dto/book-query.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksService } from './books.service';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    findAll(query: BookQueryDto): import("@prisma/client").Prisma.PrismaPromise<({
        category: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
            description: string;
            categoryImage: string;
        };
        reviews: {
            rating: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        author: string;
        isbn: string;
        categoryId: string;
        shelfNo: string;
        totalCopies: number;
        availableCopies: number;
        bookImage: string;
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
            slug: string;
            description: string;
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
        description: string;
        title: string;
        author: string;
        isbn: string;
        categoryId: string;
        shelfNo: string;
        totalCopies: number;
        availableCopies: number;
        bookImage: string;
        publishedYear: number;
        publisher: string;
        pages: number;
        language: string;
    }>;
    create(dto: CreateBookDto): import("@prisma/client").Prisma.Prisma__BookClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        author: string;
        isbn: string;
        categoryId: string;
        shelfNo: string;
        totalCopies: number;
        availableCopies: number;
        bookImage: string;
        publishedYear: number;
        publisher: string;
        pages: number;
        language: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        author: string;
        isbn: string;
        categoryId: string;
        shelfNo: string;
        totalCopies: number;
        availableCopies: number;
        bookImage: string;
        publishedYear: number;
        publisher: string;
        pages: number;
        language: string;
    }>;
}
