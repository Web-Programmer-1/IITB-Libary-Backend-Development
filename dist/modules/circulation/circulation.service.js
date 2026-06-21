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
exports.CirculationService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../prisma/prisma.service");
const email_service_1 = require("../email/email.service");
const circulation_constants_1 = require("./circulation.constants");
let CirculationService = class CirculationService {
    constructor(prisma, emailService) {
        this.prisma = prisma;
        this.emailService = emailService;
    }
    async issue(dto) {
        const [book, user, activeIssues] = await Promise.all([
            this.prisma.book.findUnique({ where: { id: dto.bookId } }),
            this.prisma.user.findUnique({ where: { id: dto.userId } }),
            this.prisma.issueReturn.count({
                where: {
                    userId: dto.userId,
                    isReturned: false,
                },
            }),
        ]);
        if (!book || !user) {
            throw new common_1.NotFoundException('Book or user not found');
        }
        if (book.availableCopies <= 0) {
            throw new common_1.BadRequestException('No copies available');
        }
        if (activeIssues >= user.maxBooksAllowed) {
            throw new common_1.BadRequestException('You have reached max limit');
        }
        const issueDate = dto.issueDate ? new Date(dto.issueDate) : new Date();
        const dueDate = dto.dueDate ? new Date(dto.dueDate) : new Date(issueDate);
        if (!dto.dueDate) {
            dueDate.setDate(dueDate.getDate() + 14);
        }
        return this.prisma.$transaction(async (tx) => {
            const issue = await tx.issueReturn.create({
                data: {
                    bookId: dto.bookId,
                    userId: dto.userId,
                    issueDate,
                    dueDate,
                },
            });
            await tx.book.update({
                where: { id: dto.bookId },
                data: {
                    availableCopies: { decrement: 1 },
                },
            });
            return issue;
        });
    }
    async returnBook(issueId) {
        const issue = await this.prisma.issueReturn.findUnique({
            where: { id: issueId },
            include: { user: true },
        });
        if (!issue) {
            throw new common_1.NotFoundException('Issue record not found');
        }
        if (issue.isReturned) {
            throw new common_1.BadRequestException('Book already returned');
        }
        const returnDate = new Date();
        const fineAmount = (0, circulation_constants_1.calculateOverdueFine)(issue.dueDate, returnDate);
        return this.prisma.$transaction(async (tx) => {
            const updatedIssue = await tx.issueReturn.update({
                where: { id: issueId },
                data: {
                    returnDate,
                    isReturned: true,
                    fineAmount,
                },
            });
            await tx.book.update({
                where: { id: issue.bookId },
                data: {
                    availableCopies: { increment: 1 },
                },
            });
            if (fineAmount > 0) {
                const existingFine = await tx.fine.findUnique({
                    where: { issueReturnId: issueId },
                });
                const oldFineAmount = existingFine ? Number(existingFine.amount) : 0;
                const difference = fineAmount - oldFineAmount;
                if (existingFine) {
                    await tx.fine.update({
                        where: { id: existingFine.id },
                        data: { amount: fineAmount },
                    });
                }
                else {
                    await tx.fine.create({
                        data: {
                            issueReturnId: issueId,
                            userId: issue.userId,
                            amount: fineAmount,
                        },
                    });
                }
                if (difference > 0) {
                    await tx.user.update({
                        where: { id: issue.userId },
                        data: {
                            fineBalance: { increment: difference },
                        },
                    });
                }
            }
            return updatedIssue;
        });
    }
    async updateDueDate(issueId, dueDateInput) {
        const issue = await this.prisma.issueReturn.findUnique({
            where: { id: issueId },
            include: {
                fine: true,
            },
        });
        if (!issue) {
            throw new common_1.NotFoundException('Issue record not found');
        }
        if (issue.isReturned) {
            throw new common_1.BadRequestException('Due date can only be edited for active issues');
        }
        const dueDate = new Date(dueDateInput);
        if (Number.isNaN(dueDate.getTime())) {
            throw new common_1.BadRequestException('Invalid due date');
        }
        const asOf = new Date();
        const newFineAmount = (0, circulation_constants_1.calculateOverdueFine)(dueDate, asOf);
        await this.prisma.$transaction(async (tx) => {
            const existingFine = await tx.fine.findUnique({
                where: { issueReturnId: issueId },
            });
            if (existingFine?.isPaid) {
                throw new common_1.BadRequestException('Cannot edit due date after a fine has been paid');
            }
            const oldFineAmount = existingFine ? Number(existingFine.amount) : Number(issue.fineAmount);
            const difference = newFineAmount - oldFineAmount;
            await tx.issueReturn.update({
                where: { id: issueId },
                data: {
                    dueDate,
                    fineAmount: newFineAmount,
                },
            });
            if (newFineAmount > 0) {
                if (existingFine) {
                    await tx.fine.update({
                        where: { id: existingFine.id },
                        data: { amount: newFineAmount },
                    });
                }
                else {
                    await tx.fine.create({
                        data: {
                            issueReturnId: issueId,
                            userId: issue.userId,
                            amount: newFineAmount,
                        },
                    });
                }
            }
            else if (existingFine) {
                await tx.fine.delete({
                    where: { id: existingFine.id },
                });
            }
            if (difference > 0) {
                await tx.user.update({
                    where: { id: issue.userId },
                    data: {
                        fineBalance: { increment: difference },
                    },
                });
            }
            else if (difference < 0) {
                await tx.user.update({
                    where: { id: issue.userId },
                    data: {
                        fineBalance: { decrement: Math.abs(difference) },
                    },
                });
            }
        });
        return this.prisma.issueReturn.findUnique({
            where: { id: issueId },
            include: {
                book: true,
                user: {
                    select: { id: true, name: true, email: true },
                },
                fine: true,
            },
        });
    }
    myIssues(userId) {
        return this.prisma.issueReturn.findMany({
            where: { userId, isReturned: false },
            include: { book: true },
            orderBy: { issueDate: 'desc' },
        });
    }
    issueHistory() {
        return this.prisma.issueReturn.findMany({
            include: {
                book: true,
                user: {
                    select: { id: true, name: true, email: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async runOverdueChecks(forceEmail = false) {
        const now = new Date();
        const [overdueIssues, nextActiveIssue, activeIssueCount] = await Promise.all([
            this.prisma.issueReturn.findMany({
                where: {
                    isReturned: false,
                    dueDate: { lt: now },
                },
                include: {
                    user: true,
                    book: true,
                },
            }),
            this.prisma.issueReturn.findFirst({
                where: { isReturned: false },
                orderBy: { dueDate: 'asc' },
                include: {
                    user: {
                        select: { name: true, email: true },
                    },
                    book: {
                        select: { title: true },
                    },
                },
            }),
            this.prisma.issueReturn.count({
                where: { isReturned: false },
            }),
        ]);
        let processedCount = 0;
        let emailedCount = 0;
        let failedEmailCount = 0;
        for (const issue of overdueIssues) {
            const overdueDays = (0, circulation_constants_1.calculateOverdueDays)(issue.dueDate, now);
            const newFineAmount = (0, circulation_constants_1.calculateOverdueFine)(issue.dueDate, now);
            if (newFineAmount > 0) {
                const { hasFineIncrease, shouldSendEmail } = await this.prisma.$transaction(async (tx) => {
                    const existingFine = await tx.fine.findUnique({
                        where: { issueReturnId: issue.id },
                    });
                    const oldFineAmount = existingFine ? Number(existingFine.amount) : 0;
                    const difference = newFineAmount - oldFineAmount;
                    const hasFineIncrease = difference > 0;
                    if (hasFineIncrease) {
                        if (existingFine) {
                            await tx.fine.update({
                                where: { id: existingFine.id },
                                data: { amount: newFineAmount },
                            });
                        }
                        else {
                            await tx.fine.create({
                                data: {
                                    issueReturnId: issue.id,
                                    userId: issue.userId,
                                    amount: newFineAmount,
                                },
                            });
                        }
                        await tx.user.update({
                            where: { id: issue.userId },
                            data: {
                                fineBalance: { increment: difference },
                            },
                        });
                    }
                    await tx.issueReturn.update({
                        where: { id: issue.id },
                        data: { fineAmount: newFineAmount },
                    });
                    return {
                        hasFineIncrease,
                        shouldSendEmail: hasFineIncrease || forceEmail,
                    };
                });
                if (shouldSendEmail) {
                    const emailSent = await this.emailService.sendOverdueEmail(issue.user.email, issue.user.name, issue.book.title, issue.dueDate, newFineAmount, overdueDays);
                    if (emailSent) {
                        emailedCount++;
                    }
                    else {
                        failedEmailCount++;
                    }
                }
                if (hasFineIncrease) {
                    processedCount++;
                }
            }
        }
        const nextDueDate = nextActiveIssue?.dueDate.toISOString().slice(0, 10) ?? null;
        const nextBookTitle = nextActiveIssue?.book.title ?? null;
        const message = overdueIssues.length === 0
            ? nextDueDate
                ? `No overdue issues found as of ${now.toISOString().slice(0, 10)}. The nearest due date is ${nextDueDate}${nextBookTitle ? ` for "${nextBookTitle}"` : ''}.`
                : `No active issues found as of ${now.toISOString().slice(0, 10)}.`
            : `Overdue checks completed. Checked ${overdueIssues.length} issues, updated ${processedCount} fines, sent ${emailedCount} emails${forceEmail ? ' (force resend enabled)' : ''}${failedEmailCount ? `, ${failedEmailCount} failed` : ''}.`;
        return {
            message,
            checked: overdueIssues.length,
            processed: processedCount,
            emailsSent: emailedCount,
            emailFailures: failedEmailCount,
            activeIssueCount,
            nextDueDate,
        };
    }
};
exports.CirculationService = CirculationService;
__decorate([
    (0, schedule_1.Cron)('0 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CirculationService.prototype, "runOverdueChecks", null);
exports.CirculationService = CirculationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService])
], CirculationService);
//# sourceMappingURL=circulation.service.js.map