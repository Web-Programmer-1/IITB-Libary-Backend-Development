import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateReviewDto) {
    const priorIssue = await this.prisma.issueReturn.findFirst({
      where: { userId, bookId: dto.bookId },
    });

    if (!priorIssue) {
      throw new BadRequestException('You can only review books you issued');
    }

    const existingReview = await this.prisma.review.findUnique({
      where: {
        bookId_userId: {
          bookId: dto.bookId,
          userId,
        },
      },
    });

    if (existingReview) {
      throw new ConflictException('You already reviewed this book');
    }

    return this.prisma.review.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  findByBook(bookId: string) {
    return this.prisma.review.findMany({
      where: { bookId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { id: true, name: true, profileImage: true },
        },
      },
    });
  }
}
