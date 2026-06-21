import { IssueBookDto } from './dto/issue-book.dto';
import { CirculationService } from './circulation.service';
import { UpdateDueDateDto } from './dto/update-due-date.dto';
export declare class CirculationController {
    private readonly circulationService;
    constructor(circulationService: CirculationService);
    issue(dto: IssueBookDto): Promise<{
        id: string;
        issueDate: Date;
        dueDate: Date;
        returnDate: Date | null;
        fineAmount: import("@prisma/client/runtime/library").Decimal;
        isReturned: boolean;
        createdAt: Date;
        updatedAt: Date;
        bookId: string;
        userId: string;
    }>;
    returnBook(id: string): Promise<{
        id: string;
        issueDate: Date;
        dueDate: Date;
        returnDate: Date | null;
        fineAmount: import("@prisma/client/runtime/library").Decimal;
        isReturned: boolean;
        createdAt: Date;
        updatedAt: Date;
        bookId: string;
        userId: string;
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
            title: string;
            author: string;
            isbn: string;
            categoryId: string;
            shelfNo: string;
            totalCopies: number;
            availableCopies: number;
            bookImage: string;
            description: string;
            publishedYear: number;
            publisher: string;
            pages: number;
            language: string;
        };
        fine: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            issueReturnId: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            isPaid: boolean;
            paidDate: Date | null;
        } | null;
    } & {
        id: string;
        issueDate: Date;
        dueDate: Date;
        returnDate: Date | null;
        fineAmount: import("@prisma/client/runtime/library").Decimal;
        isReturned: boolean;
        createdAt: Date;
        updatedAt: Date;
        bookId: string;
        userId: string;
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
            title: string;
            author: string;
            isbn: string;
            categoryId: string;
            shelfNo: string;
            totalCopies: number;
            availableCopies: number;
            bookImage: string;
            description: string;
            publishedYear: number;
            publisher: string;
            pages: number;
            language: string;
        };
    } & {
        id: string;
        issueDate: Date;
        dueDate: Date;
        returnDate: Date | null;
        fineAmount: import("@prisma/client/runtime/library").Decimal;
        isReturned: boolean;
        createdAt: Date;
        updatedAt: Date;
        bookId: string;
        userId: string;
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
            title: string;
            author: string;
            isbn: string;
            categoryId: string;
            shelfNo: string;
            totalCopies: number;
            availableCopies: number;
            bookImage: string;
            description: string;
            publishedYear: number;
            publisher: string;
            pages: number;
            language: string;
        };
    } & {
        id: string;
        issueDate: Date;
        dueDate: Date;
        returnDate: Date | null;
        fineAmount: import("@prisma/client/runtime/library").Decimal;
        isReturned: boolean;
        createdAt: Date;
        updatedAt: Date;
        bookId: string;
        userId: string;
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
