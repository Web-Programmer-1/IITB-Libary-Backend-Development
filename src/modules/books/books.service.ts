import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookQueryDto } from './dto/book-query.dto';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) { }

  create(dto: CreateBookDto) {
    return this.prisma.book.create({
      data: {
        ...dto,
        availableCopies: dto.totalCopies,
      },
    });
  }

  findAll(query: BookQueryDto) {
    const { page = 1, limit = 10, search, categoryId, language, sortBy } = query;

    return this.prisma.book.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        ...(categoryId ? { categoryId } : {}),
        ...(language ? { language } : {}),
        ...(search
          ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { author: { contains: search, mode: 'insensitive' } },
              { isbn: { contains: search, mode: 'insensitive' } },
            ],
          }
          : {}),
      },
      orderBy:
        sortBy === 'title_asc'
          ? { title: 'asc' }
          : sortBy === 'year_desc'
            ? { publishedYear: 'desc' }
            : { createdAt: 'desc' },
      include: {
        category: true,
        reviews: {
          select: { rating: true },
        },
      },
    });
  }

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: {
        category: true,
        reviews: {
          include: {
            user: {
              select: { id: true, name: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async remove(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return this.prisma.book.delete({
      where: { id },
    });
  }
}
