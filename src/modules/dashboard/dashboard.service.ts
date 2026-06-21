import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async shared() {
    const [totalBooks, totalUsers, activeIssues, pendingFineUsers, lowStockBooks] = await Promise.all([
      this.prisma.book.count(),
      this.prisma.user.count(),
      this.prisma.issueReturn.count({ where: { isReturned: false } }),
      this.prisma.fine.aggregate({
        _sum: { amount: true },
        where: { isPaid: false },
      }),
      this.prisma.book.findMany({
        where: { availableCopies: { lte: 2 } },
        select: { id: true, title: true, availableCopies: true },
      }),
    ]);

    return {
      totalBooks,
      totalUsers,
      activeIssues,
      totalPendingFines: pendingFineUsers._sum.amount ?? 0,
      lowStockBooks,
    };
  }

  async mine(userId: string) {
    const [profile, activeIssues, myReviews, myFines] = await Promise.all([
      this.prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, phone: true, joinDate: true, fineBalance: true, profileImage: true },
      }),
      this.prisma.issueReturn.findMany({
        where: { userId, isReturned: false },
        include: { book: true },
      }),
      this.prisma.review.findMany({
        where: { userId },
        include: { book: { select: { title: true } } },
      }),
      this.prisma.fine.findMany({
        where: { userId, isPaid: false },
        include: {
          issueReturn: {
            select: {
              id: true,
              dueDate: true,
              returnDate: true,
              isReturned: true,
              book: {
                select: {
                  id: true,
                  title: true,
                  bookImage: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return { profile, activeIssues, myReviews, myFines };
  }

  async payFine(userId: string, fineId: string) {
    const paidFine = await this.prisma.$transaction(async (tx) => {
      const fine = await tx.fine.findFirst({
        where: {
          id: fineId,
          userId,
        },
        include: {
          issueReturn: {
            select: {
              id: true,
              dueDate: true,
              returnDate: true,
              isReturned: true,
              book: {
                select: {
                  id: true,
                  title: true,
                  bookImage: true,
                },
              },
            },
          },
        },
      });

      if (!fine) {
        throw new NotFoundException('Fine not found');
      }

      if (fine.isPaid) {
        throw new BadRequestException('Fine already paid');
      }

      if (!fine.issueReturn?.isReturned) {
        throw new BadRequestException('Return the book before paying this fine');
      }

      const updatedFine = await tx.fine.update({
        where: { id: fineId },
        data: {
          isPaid: true,
          paidDate: new Date(),
        },
        include: {
          issueReturn: {
            select: {
              id: true,
              dueDate: true,
              returnDate: true,
              isReturned: true,
              book: {
                select: {
                  id: true,
                  title: true,
                  bookImage: true,
                },
              },
            },
          },
        },
      });

      const unpaidFineAggregate = await tx.fine.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          userId,
          isPaid: false,
        },
      });

      await tx.user.update({
        where: { id: userId },
        data: {
          fineBalance: unpaidFineAggregate._sum.amount ?? 0,
        },
      });

      return updatedFine;
    });

    return {
      message: 'Fine paid successfully',
      fine: paidFine,
    };
  }
}
