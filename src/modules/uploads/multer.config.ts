import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { memoryStorage } from 'multer';

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
const maxFileSize = 5 * 1024 * 1024;

export const uploadMulterOptions = {
  storage: memoryStorage(),
  limits: {
    fileSize: maxFileSize,
  },
  fileFilter: (
    _req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      callback(new BadRequestException('Only JPG, PNG, and WEBP images are allowed'), false);
      return;
    }

    callback(null, true);
  },
};

export const uploadValidationRules = {
  allowedMimeTypes,
  maxFileSize,
};
