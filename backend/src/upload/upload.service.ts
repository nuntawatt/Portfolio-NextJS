import {
  Injectable,
  Logger,
  OnModuleInit,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
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
  private minioClient: Minio.Client;
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

    this.minioClient = new Minio.Client({
      endPoint: endpoint,
      port,
      useSSL: useSsl,
      accessKey,
      secretKey,
    });
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.ensureBucketExists(this.defaultBucket);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to initialize MinIO bucket: ${msg}`);
    }
  }

  /**
   * Ensures the specified bucket exists and has public read access.
   */
  private async ensureBucketExists(bucketName: string): Promise<void> {
    const exists = await this.minioClient.bucketExists(bucketName);
    if (!exists) {
      await this.minioClient.makeBucket(bucketName, 'us-east-1');
      this.logger.log(`Created bucket: ${bucketName}`);

      // Set public read bucket policy
      const policy = {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: { AWS: ['*'] },
            Action: ['s3:GetObject'],
            Resource: [`arn:aws:s3:::${bucketName}/*`],
          },
        ],
      };

      await this.minioClient.setBucketPolicy(
        bucketName,
        JSON.stringify(policy),
      );
      this.logger.log(`Set public read policy on bucket: ${bucketName}`);
    }
  }

  /**
   * Uploads a file to MinIO and returns the public URL.
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
      await this.ensureBucketExists(bucketName);

      const fileExtension = file.originalname.split('.').pop() || '';
      const randomString = crypto.randomBytes(8).toString('hex');
      const uniqueName = `${Date.now()}-${randomString}.${fileExtension}`;
      const objectName = folder ? `${folder}/${uniqueName}` : uniqueName;

      await this.minioClient.putObject(
        bucketName,
        objectName,
        file.buffer,
        file.size,
        {
          'Content-Type': file.mimetype,
        },
      );

      const url = this.constructFileUrl(bucketName, objectName);
      return { url, key: objectName };
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      this.logger.error(`File upload failed: ${msg}`);
      throw new InternalServerErrorException('Failed to upload file');
    }
  }

  /**
   * Deletes a file from MinIO.
   */
  async deleteFile(
    objectName: string,
    bucketName = this.defaultBucket,
  ): Promise<void> {
    try {
      await this.minioClient.removeObject(bucketName, objectName);
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

    const protocol = useSsl ? 'https' : 'http';
    const host = port === 80 || port === 443 ? endpoint : `${endpoint}:${port}`;

    return `${protocol}://${host}/${bucketName}/${objectName}`;
  }
}
