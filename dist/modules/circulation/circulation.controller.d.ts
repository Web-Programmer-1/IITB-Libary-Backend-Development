import { IssueBookDto } from './dto/issue-book.dto';
import { CirculationService } from './circulation.service';
import { UpdateDueDateDto } from './dto/update-due-date.dto';
export declare class CirculationController {
    private readonly circulationService;
    constructor(circulationService: CirculationService);
    issue(dto: IssueBookDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        bookId: string;
        userId: string;
        issueDate: Date;
        dueDate: Date;
        returnDate: Date | null;
        fineAmount: import("@prisma/client/runtime/library").Decimal;
        isReturned: boolean;
    }>;
    returnBook(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        bookId: string;
        userId: string;
        issueDate: Date;
        dueDate: Date;
        returnDate: Date | null;
        fineAmount: import("@prisma/client/runtime/library").Decimal;
        isReturned: boolean;
    }>;
    updateDueDate(id: string, dto: UpdateDueDateDto): Promise<({
        user: {
            id: string;
            name: string;
            email: string;
        };
        book: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string;
            language: string;
            title: string;
            author: string;
            isbn: string;
            shelfNo: string;
            totalCopies: number;
            bookImage: string;
            description: string;
            publishedYear: number;
            publisher: string;
            pages: number;
            availableCopies: number;
        };
        fine: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            isPaid: boolean;
            paidDate: Date | null;
            issueReturnId: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        bookId: string;
        userId: string;
        issueDate: Date;
        dueDate: Date;
        returnDate: Date | null;
        fineAmount: import("@prisma/client/runtime/library").Decimal;
        isReturned: boolean;
    }) | null>;
    myIssues(req: {
        user: {
            sub: string;
        };
    }): import("@prisma/client").Prisma.PrismaPromise<({
        book: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string;
            language: string;
            title: string;
            author: string;
            isbn: string;
            shelfNo: string;
            totalCopies: number;
            bookImage: string;
            description: string;
            publishedYear: number;
            publisher: string;
            pages: number;
            availableCopies: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        bookId: string;
        userId: string;
        issueDate: Date;
        dueDate: Date;
        returnDate: Date | null;
        fineAmount: import("@prisma/client/runtime/library").Decimal;
        isReturned: boolean;
    })[]>;
    issueHistory(): import("@prisma/client").Prisma.PrismaPromise<({
        user: {
            id: string;
            name: string;
            email: string;
        };
        book: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string;
            language: string;
            title: string;
            author: string;
            isbn: string;
            shelfNo: string;
            totalCopies: number;
            bookImage: string;
            description: string;
            publishedYear: number;
            publisher: string;
            pages: number;
            availableCopies: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        bookId: string;
        userId: string;
        issueDate: Date;
        dueDate: Date;
        returnDate: Date | null;
        fineAmount: import("@prisma/client/runtime/library").Decimal;
        isReturned: boolean;
    })[]>;
    triggerOverdue(forceEmail?: string): Promise<{
        message: string;
        checked: number;
        processed: number;
        emailsSent: number;
        emailFailures: number;
        activeIssueCount: number;
        nextDueDate: string | null;
    }>;
}
