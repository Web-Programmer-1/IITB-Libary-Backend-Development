import { IsOptional, IsString } from 'class-validator';

export class IssueBookDto {
  @IsString()
  bookId!: string;

  @IsString()
  userId!: string;

  @IsOptional()
  @IsString()
  issueDate?: string;

  @IsOptional()
  @IsString()
  dueDate?: string;
}
