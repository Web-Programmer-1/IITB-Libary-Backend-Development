export declare class UploadsService {
    prepareUpload(type: string, file?: Express.Multer.File): {
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
    private ensureAwsConfig;
    private getExtension;
}
