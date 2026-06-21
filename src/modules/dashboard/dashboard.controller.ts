import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { DashboardService } from './dashboard.service';

@ApiTags('Dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('dashboard')
  shared() {
    return this.dashboardService.shared();
  }

  @Get('my-dashboard')
  mine(@Req() req: { user: { sub: string } }) {
    return this.dashboardService.mine(req.user.sub);
  }

  @Post('my-fines/:id/pay')
  payFine(@Req() req: { user: { sub: string } }, @Param('id') id: string) {
    return this.dashboardService.payFine(req.user.sub, id);
  }
}
