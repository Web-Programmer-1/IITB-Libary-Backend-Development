import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(query: PaginationQueryDto): import("@prisma/client").Prisma.PrismaPromise<({
        books: {
            id: string;
            title: string;
            bookImage: string;
        }[];
    } & {
        id: string;
        name: string;
        slug: string;
        description: string;
        categoryImage: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    create(dto: CreateCategoryDto): import("@prisma/client").Prisma.Prisma__CategoryClient<{
        id: string;
        name: string;
        slug: string;
        description: string;
        categoryImage: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        slug: string;
        description: string;
        categoryImage: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
