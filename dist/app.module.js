"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const app_controller_1 = require("./app.controller");
const auth_module_1 = require("./modules/auth/auth.module");
const books_module_1 = require("./modules/books/books.module");
const categories_module_1 = require("./modules/categories/categories.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
const prisma_module_1 = require("./modules/prisma/prisma.module");
const reports_module_1 = require("./modules/reports/reports.module");
const reviews_module_1 = require("./modules/reviews/reviews.module");
const uploads_module_1 = require("./modules/uploads/uploads.module");
const users_module_1 = require("./modules/users/users.module");
const circulation_module_1 = require("./modules/circulation/circulation.module");
const email_module_1 = require("./modules/email/email.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            schedule_1.ScheduleModule.forRoot(),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            categories_module_1.CategoriesModule,
            books_module_1.BooksModule,
            reviews_module_1.ReviewsModule,
            circulation_module_1.CirculationModule,
            dashboard_module_1.DashboardModule,
            reports_module_1.ReportsModule,
            uploads_module_1.UploadsModule,
            email_module_1.EmailModule,
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map