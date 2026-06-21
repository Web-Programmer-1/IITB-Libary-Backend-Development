# IITB Library Backend Starter

এই backend scaffoldটি requirement document অনুযায়ী `pnpm + NestJS + Prisma + PostgreSQL` ভিত্তিক starter হিসেবে তৈরি করা হয়েছে।

## শুরু করার ধাপ

```bash
cd backend
pnpm install
copy .env.example .env
pnpm prisma:generate
pnpm prisma:migrate
pnpm start:dev
```

## এই starter-এ যা আছে

- `Prisma schema` with User, Category, Book, Review, IssueReturn, Fine
- `Auth` register/login/me/profile flow starter
- `Books`, `Categories`, `Reviews`, `Circulation`, `Dashboard`, `Reports`, `Uploads` module structure
- `Swagger` setup at `/docs`
- `Postman collection` in root project folder

## পরের implementation priority

1. Category, Book, Review, Circulation এ `PUT/DELETE` endpoints complete করা
2. Upload module-এ AWS S3 integrate করা
3. Fine payment, export রিপোর্ট, cron email reminder যোগ করা
4. Global exception filter, logger interceptor, rate limiter যোগ করা
