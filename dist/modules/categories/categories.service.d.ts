import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateCategoryDto): import("@prisma/client").Prisma.Prisma__CategoryClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string;
        categoryImage: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll({ page, limit }: {
        page?: number;
        limit?: number;
    }): import("@prisma/client").Prisma.PrismaPromise<({
        books: {
            id: string;
            title: string;
            bookImage: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string;
        categoryImage: string;
    })[]>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string;
        categoryImage: string;
    }>;
}
