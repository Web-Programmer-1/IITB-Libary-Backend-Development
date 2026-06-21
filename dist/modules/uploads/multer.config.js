"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadValidationRules = exports.uploadMulterOptions = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
const maxFileSize = 5 * 1024 * 1024;
exports.uploadMulterOptions = {
    storage: (0, multer_1.memoryStorage)(),
    limits: {
        fileSize: maxFileSize,
    },
    fileFilter: (_req, file, callback) => {
        if (!allowedMimeTypes.includes(file.mimetype)) {
            callback(new common_1.BadRequestException('Only JPG, PNG, and WEBP images are allowed'), false);
            return;
        }
        callback(null, true);
    },
};
exports.uploadValidationRules = {
    allowedMimeTypes,
    maxFileSize,
};
//# sourceMappingURL=multer.config.js.map