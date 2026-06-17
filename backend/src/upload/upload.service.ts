import {
  Injectable,
  Logger,
  OnModuleInit,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import * as crypto from 'crypto';

export interface UploadedFileDto {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

@Injectable()
export class UploadService implements OnModuleInit {
  private readonly logger = new Logger(UploadService.name);
  private s3Client: S3Client;
  private defaultBucket: string;

  constructor(private readonly configService: ConfigService) {
    const endpoint = this.configService.getOrThrow<string>('minio.endpoint');
    const port = this.configService.get<number>('minio.port', 9000);
    const useSsl = this.configService.get<boolean>('minio.useSsl', false);
    const accessKey = this.configService.getOrThrow<string>('minio.accessKey');
    const secretKey = this.configService.getOrThrow<string>('minio.secretKey');

    this.defaultBucket = this.configService.get<string>(
      'minio.bucketName',
      'portfolio',
    );

    // Parse endpoint URL
    let s3Endpoint: string;
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
      s3Endpoint = endpoint;
    } else {
      const protocol = useSsl ? 'https' : 'http';
      // For local MinIO, port is usually required unless using standard 80/443
      s3Endpoint = port === 80 || port === 443 ? `${protocol}://${endpoint}` : `${protocol}://${endpoint}:${port}`;
    }

    this.s3Client = new S3Client({
      endpoint: s3Endpoint,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
      region: 'us-east-1', // Default region
      forcePathStyle: true, // Required for local MinIO and Supabase Storage
    });

    this.logger.log(`Initialized S3 Storage Client pointing to endpoint: ${s3Endpoint}`);
  }

  async onModuleInit(): Promise<void> {
    // In production S3-compatible systems like Supabase/R2, we don't auto-create buckets
    // because permissions might be restricted and buckets are created via dashboard.
    // We just log that the upload service is ready.
    this.logger.log('Upload Service initialized successfully');
  }

  /**
   * Uploads a file to S3 and returns the public URL.
   */
  async uploadFile(
    file: UploadedFileDto,
    folder = 'uploads',
    bucketName = this.defaultBucket,
  ): Promise<{ url: string; key: string }> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    try {
      const fileExtension = file.originalname.split('.').pop() || '';
      const randomString = crypto.randomBytes(8).toString('hex');
      const uniqueName = `${Date.now()}-${randomString}.${fileExtension}`;
      const objectName = folder ? `${folder}/${uniqueName}` : uniqueName;

      // Upload using AWS SDK S3Client
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: objectName,
        Body: file.buffer,
        ContentType: file.mimetype,
      });

      await this.s3Client.send(command);
      this.logger.log(`Uploaded object: ${objectName} to bucket: ${bucketName}`);

      const url = this.constructFileUrl(bucketName, objectName);
      return { url, key: objectName };
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      this.logger.error(`File upload failed: ${msg}`);
      throw new InternalServerErrorException('Failed to upload file');
    }
  }

  /**
   * Deletes a file from S3.
   */
  async deleteFile(
    objectName: string,
    bucketName = this.defaultBucket,
  ): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: objectName,
      });

      await this.s3Client.send(command);
      this.logger.log(
        `Deleted object: ${objectName} from bucket: ${bucketName}`,
      );
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      this.logger.error(`File deletion failed: ${msg}`);
      throw new InternalServerErrorException('Failed to delete file');
    }
  }

  /**
   * Constructs the public access URL for a file.
   */
  private constructFileUrl(bucketName: string, objectName: string): string {
    const publicUrl = this.configService.get<string>('minio.publicUrl');
    if (publicUrl) {
      return `${publicUrl.replace(/\/$/, '')}/${bucketName}/${objectName}`;
    }

    const endpoint = this.configService.getOrThrow<string>('minio.endpoint');
    const port = this.configService.get<number>('minio.port', 9000);
    const useSsl = this.configService.get<boolean>('minio.useSsl', false);

    // If endpoint is a full URL (like Supabase), we construct URL relative to it
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
      return `${endpoint.replace(/\/$/, '')}/${bucketName}/${objectName}`;
    }

    const protocol = useSsl ? 'https' : 'http';
    const host = port === 80 || port === 443 ? endpoint : `${endpoint}:${port}`;

    return `${protocol}://${host}/${bucketName}/${objectName}`;
  }
}
