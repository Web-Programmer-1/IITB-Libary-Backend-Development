import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { uploadMulterOptions } from './multer.config';
import { UploadsService } from './uploads.service';

@ApiTags('Uploads')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('profile-image')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', uploadMulterOptions))
  profileImage(@UploadedFile() file?: Express.Multer.File) {
    return this.uploadsService.prepareUpload('profile-image', file);
  }

  @Post('book-image')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', uploadMulterOptions))
  bookImage(@UploadedFile() file?: Express.Multer.File) {
    return this.uploadsService.prepareUpload('book-image', file);
  }

  @Post('category-image')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', uploadMulterOptions))
  categoryImage(@UploadedFile() file?: Express.Multer.File) {
    return this.uploadsService.prepareUpload('category-image', file);
  }
}
