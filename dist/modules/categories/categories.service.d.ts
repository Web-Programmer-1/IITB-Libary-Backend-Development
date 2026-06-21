import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateCategoryDto): import("src/generated/client").Prisma.Prisma__CategoryClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        slug: string;
        categoryImage: string;
    }, never, import("src/generated/client/runtime/library").DefaultArgs>;
    findAll({ page, limit }: {
        page?: number;
        limit?: number;
    }): import("src/generated/client").Prisma.PrismaPromise<({
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
        description: string;
        slug: string;
        categoryImage: string;
    })[]>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        slug: string;
        categoryImage: string;
    }>;
}
