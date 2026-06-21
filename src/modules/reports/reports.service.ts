import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  issuedBooks() {
    return this.prisma.issueReturn.findMany({
      where: { isReturned: false },
      include: {
        book: true,
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  }

  overdue() {
    return this.prisma.issueReturn.findMany({
      where: {
        isReturned: false,
        dueDate: { lt: new Date() },
      },
      include: {
        book: true,
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  }

  topBooks() {
    return this.prisma.book.findMany({
      take: 10,
      include: {
        _count: {
          select: { issues: true },
        },
      },
      orderBy: {
        issues: {
          _count: 'desc',
        },
      },
    });
  }
}
