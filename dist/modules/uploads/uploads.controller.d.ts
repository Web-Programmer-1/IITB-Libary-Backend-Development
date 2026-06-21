import { UploadsService } from './uploads.service';
export declare class UploadsController {
    private readonly uploadsService;
    constructor(uploadsService: UploadsService);
    profileImage(file?: Express.Multer.File): {
        message: string;
        bucket: string | undefined;
        region: string | undefined;
        objectKey: string;
        fileName: string;
        mimeType: string;
        size: number;
        allowedMimeTypes: string[];
        maxFileSizeBytes: number;
    };
    bookImage(file?: Express.Multer.File): {
        message: string;
        bucket: string | undefined;
        region: string | undefined;
        objectKey: string;
        fileName: string;
        mimeType: string;
        size: number;
        allowedMimeTypes: string[];
        maxFileSizeBytes: number;
    };
    categoryImage(file?: Express.Multer.File): {
        message: string;
        bucket: string | undefined;
        region: string | undefined;
        objectKey: string;
        fileName: string;
        mimeType: string;
        size: number;
        allowedMimeTypes: string[];
        maxFileSizeBytes: number;
    };
}
