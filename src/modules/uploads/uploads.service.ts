import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { uploadValidationRules } from './multer.config';

@Injectable()
export class UploadsService {
  prepareUpload(type: string, file?: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    this.ensureAwsConfig();

    const extension = this.getExtension(file.mimetype);
    const objectKey = `${type}/${randomUUID()}.${extension}`;

    return {
      message: `${type} multer validation is ready for AWS S3 upload`,
      bucket: process.env.AWS_BUCKET_NAME,
      region: process.env.AWS_REGION,
      objectKey,
      fileName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      allowedMimeTypes: uploadValidationRules.allowedMimeTypes,
      maxFileSizeBytes: uploadValidationRules.maxFileSize,
    };
  }

  private ensureAwsConfig() {
    const requiredEnvKeys = [
      'AWS_BUCKET_NAME',
      'AWS_REGION',
      'AWS_ACCESS_KEY_ID',
      'AWS_SECRET_ACCESS_KEY',
    ];

    const missingKeys = requiredEnvKeys.filter((key) => !process.env[key]);
    if (missingKeys.length > 0) {
      throw new BadRequestException(`Missing AWS env: ${missingKeys.join(', ')}`);
    }
  }

  private getExtension(mimeType: string) {
    if (mimeType === 'image/jpeg') {
      return 'jpg';
    }

    if (mimeType === 'image/png') {
      return 'png';
    }

    if (mimeType === 'image/webp') {
      return 'webp';
    }

    throw new BadRequestException('Unsupported image type');
  }
}
