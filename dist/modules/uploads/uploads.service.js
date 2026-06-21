"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const multer_config_1 = require("./multer.config");
let UploadsService = class UploadsService {
    prepareUpload(type, file) {
        if (!file) {
            throw new common_1.BadRequestException('File is required');
        }
        this.ensureAwsConfig();
        const extension = this.getExtension(file.mimetype);
        const objectKey = `${type}/${(0, crypto_1.randomUUID)()}.${extension}`;
        return {
            message: `${type} multer validation is ready for AWS S3 upload`,
            bucket: process.env.AWS_BUCKET_NAME,
            region: process.env.AWS_REGION,
            objectKey,
            fileName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            allowedMimeTypes: multer_config_1.uploadValidationRules.allowedMimeTypes,
            maxFileSizeBytes: multer_config_1.uploadValidationRules.maxFileSize,
        };
    }
    ensureAwsConfig() {
        const requiredEnvKeys = [
            'AWS_BUCKET_NAME',
            'AWS_REGION',
            'AWS_ACCESS_KEY_ID',
            'AWS_SECRET_ACCESS_KEY',
        ];
        const missingKeys = requiredEnvKeys.filter((key) => !process.env[key]);
        if (missingKeys.length > 0) {
            throw new common_1.BadRequestException(`Missing AWS env: ${missingKeys.join(', ')}`);
        }
    }
    getExtension(mimeType) {
        if (mimeType === 'image/jpeg') {
            return 'jpg';
        }
        if (mimeType === 'image/png') {
            return 'png';
        }
        if (mimeType === 'image/webp') {
            return 'webp';
        }
        throw new common_1.BadRequestException('Unsupported image type');
    }
};
exports.UploadsService = UploadsService;
exports.UploadsService = UploadsService = __decorate([
    (0, common_1.Injectable)()
], UploadsService);
//# sourceMappingURL=uploads.service.js.map