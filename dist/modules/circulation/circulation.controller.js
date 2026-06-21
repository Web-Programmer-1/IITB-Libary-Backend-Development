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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CirculationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const issue_book_dto_1 = require("./dto/issue-book.dto");
const circulation_service_1 = require("./circulation.service");
const update_due_date_dto_1 = require("./dto/update-due-date.dto");
let CirculationController = class CirculationController {
    constructor(circulationService) {
        this.circulationService = circulationService;
    }
    issue(dto) {
        return this.circulationService.issue(dto);
    }
    returnBook(id) {
        return this.circulationService.returnBook(id);
    }
    updateDueDate(id, dto) {
        return this.circulationService.updateDueDate(id, dto.dueDate);
    }
    myIssues(req) {
        return this.circulationService.myIssues(req.user.sub);
    }
    issueHistory() {
        return this.circulationService.issueHistory();
    }
    triggerOverdue(forceEmail) {
        return this.circulationService.runOverdueChecks(forceEmail === 'true' || forceEmail === '1');
    }
};
exports.CirculationController = CirculationController;
__decorate([
    (0, common_1.Post)('issue'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [issue_book_dto_1.IssueBookDto]),
    __metadata("design:returntype", void 0)
], CirculationController.prototype, "issue", null);
__decorate([
    (0, common_1.Put)('return/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CirculationController.prototype, "returnBook", null);
__decorate([
    (0, common_1.Patch)('issue/:id/due-date'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_due_date_dto_1.UpdateDueDateDto]),
    __metadata("design:returntype", void 0)
], CirculationController.prototype, "updateDueDate", null);
__decorate([
    (0, common_1.Get)('my-issues'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CirculationController.prototype, "myIssues", null);
__decorate([
    (0, common_1.Get)('issue-history'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CirculationController.prototype, "issueHistory", null);
__decorate([
    (0, common_1.Post)('circulation/trigger-overdue'),
    __param(0, (0, common_1.Query)('forceEmail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CirculationController.prototype, "triggerOverdue", null);
exports.CirculationController = CirculationController = __decorate([
    (0, swagger_1.ApiTags)('Circulation'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [circulation_service_1.CirculationService])
], CirculationController);
//# sourceMappingURL=circulation.controller.js.map