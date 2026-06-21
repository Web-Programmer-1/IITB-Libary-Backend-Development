import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ReportsService } from './reports.service';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('issued-books')
  issuedBooks() {
    return this.reportsService.issuedBooks();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('overdue')
  overdue() {
    return this.reportsService.overdue();
  }

  @Get('top-books')
  topBooks() {
    return this.reportsService.topBooks();
  }
}
