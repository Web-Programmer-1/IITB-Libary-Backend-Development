import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewsService } from './reviews.service';

@ApiTags('Reviews')
@Controller()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('books/:bookId/reviews')
  findByBook(@Param('bookId') bookId: string) {
    return this.reviewsService.findByBook(bookId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('reviews')
  create(@Req() req: { user: { sub: string } }, @Body() dto: CreateReviewDto) {
    return this.reviewsService.create(req.user.sub, dto);
  }
}
