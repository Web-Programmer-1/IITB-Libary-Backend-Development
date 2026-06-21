import { Body, Controller, Get, Param, Patch, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { IssueBookDto } from './dto/issue-book.dto';
import { CirculationService } from './circulation.service';
import { UpdateDueDateDto } from './dto/update-due-date.dto';

@ApiTags('Circulation')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class CirculationController {
  constructor(private readonly circulationService: CirculationService) {}

  @Post('issue')
  issue(@Body() dto: IssueBookDto) {
    return this.circulationService.issue(dto);
  }

  @Put('return/:id')
  returnBook(@Param('id') id: string) {
    return this.circulationService.returnBook(id);
  }

  @Patch('issue/:id/due-date')
  updateDueDate(@Param('id') id: string, @Body() dto: UpdateDueDateDto) {
    return this.circulationService.updateDueDate(id, dto.dueDate);
  }

  @Get('my-issues')
  myIssues(@Req() req: { user: { sub: string } }) {
    return this.circulationService.myIssues(req.user.sub);
  }

  @Get('issue-history')
  issueHistory() {
    return this.circulationService.issueHistory();
  }

  @Post('circulation/trigger-overdue')
  triggerOverdue(@Query('forceEmail') forceEmail?: string) {
    return this.circulationService.runOverdueChecks(
      forceEmail === 'true' || forceEmail === '1',
    );
  }
}
