import { Request } from 'express';
export declare const uploadMulterOptions: {
    storage: import("multer").StorageEngine;
    limits: {
        fileSize: number;
    };
    fileFilter: (_req: Request, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => void;
};
export declare const uploadValidationRules: {
    allowedMimeTypes: string[];
    maxFileSize: number;
};
