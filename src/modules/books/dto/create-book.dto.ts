import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  author!: string;

  @IsString()
  @IsNotEmpty()
  isbn!: string;

  @IsString()
  @IsNotEmpty()
  categoryId!: string;

  @IsString()
  @IsNotEmpty()
  shelfNo!: string;

  @IsInt()
  @Min(1)
  totalCopies!: number;

  @IsString()
  @IsNotEmpty()
  bookImage!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsInt()
  publishedYear!: number;

  @IsString()
  @IsNotEmpty()
  publisher!: string;

  @IsInt()
  @Min(1)
  pages!: number;

  @IsString()
  @IsNotEmpty()
  language!: string;
}
