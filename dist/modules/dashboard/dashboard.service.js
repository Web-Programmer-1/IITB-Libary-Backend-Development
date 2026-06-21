"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DashboardService = class DashboardService {
    constructor(prisma) {
        this.prisma = prisma;
    }
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
    async mine(userId) {
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
    async payFine(userId, fineId) {
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
                throw new common_1.NotFoundException('Fine not found');
            }
            if (fine.isPaid) {
                throw new common_1.BadRequestException('Fine already paid');
            }
            if (!fine.issueReturn?.isReturned) {
                throw new common_1.BadRequestException('Return the book before paying this fine');
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
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map