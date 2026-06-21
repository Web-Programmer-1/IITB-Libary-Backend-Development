import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      name: 'IITB Library Management System',
      version: '0.1.0',
      status: 'running',
      description:
        'A modern library management backend powering book cataloguing, circulation, reviews, fines, dashboards and reports.',
      endpoints: {
        docs: '/docs',
        auth: '/api/auth',
        users: '/api/users',
        categories: '/api/categories',
        books: '/api/books',
        reviews: '/api/reviews',
        circulation: '/api/issue | /api/return | /api/my-issues',
        dashboard: '/api/dashboard',
        reports: '/api/reports',
        uploads: '/api/uploads',
      },
      timestamp: new Date().toISOString(),
    };
  }
}
