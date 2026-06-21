import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
export declare class BookQueryDto extends PaginationQueryDto {
    search?: string;
    categoryId?: string;
    language?: string;
    sortBy?: 'title_asc' | 'rating_desc' | 'year_desc';
}
