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
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BooksService = class BooksService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) {
        return this.prisma.book.create({
            data: {
                ...dto,
                availableCopies: dto.totalCopies,
            },
        });
    }
    findAll(query) {
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
            orderBy: sortBy === 'title_asc'
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
    async findOne(id) {
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
            throw new common_1.NotFoundException('Book not found');
        }
        return book;
    }
    async remove(id) {
        const book = await this.prisma.book.findUnique({
            where: { id },
        });
        if (!book) {
            throw new common_1.NotFoundException(`Book with ID ${id} not found`);
        }
        return this.prisma.book.delete({
            where: { id },
        });
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BooksService);
//# sourceMappingURL=books.service.js.map