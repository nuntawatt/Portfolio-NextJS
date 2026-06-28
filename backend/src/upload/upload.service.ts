import {
  Injectable,
  Logger,
  OnModuleInit,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import * as crypto from 'node:crypto';

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
  private readonly s3Client: S3Client;
  private readonly defaultBucket: string;

  constructor() {
    // ดึงค่าคอนฟิกของ S3/Supabase Storage จาก .env
    const endpoint = process.env.MINIO_ENDPOINT;
    const port = Number.parseInt(process.env.MINIO_PORT, 10);
    const useSsl = process.env.MINIO_USE_SSL === 'true';
    const accessKey = process.env.MINIO_ACCESS_KEY;
    const secretKey = process.env.MINIO_SECRET_KEY;

    // ชื่อ Bucket หลัก
    this.defaultBucket = process.env.MINIO_BUCKET_NAME;

    // จัดการจัดรูปแบบ Endpoint ให้ถูกต้อง
    let s3Endpoint = endpoint;
    if (!endpoint.startsWith('http')) {
      const protocol = useSsl ? 'https' : 'http';
      const isStandardPort = port === 80 || port === 443;
      s3Endpoint = isStandardPort
        ? `${protocol}://${endpoint}`
        : `${protocol}://${endpoint}:${port}`;
    }

    // สร้างการเชื่อมต่อ S3 Client
    this.s3Client = new S3Client({
      endpoint: s3Endpoint,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
      region: 'us-east-1', // อนุโลมใช้ us-east-1 ได้เลยสำหรับ Supabase/MinIO
      forcePathStyle: true, // บังคับเพื่อรองรับ S3-Compatible API นอกเหนือจาก AWS
    });

    this.logger.log(`เชื่อมต่อ S3 Storage เรียบร้อยที่: ${s3Endpoint}`);
  }

  async onModuleInit(): Promise<void> {
    this.logger.log('Upload Service พร้อมใช้งาน');
  }

  /**
   * อัพโหลดไฟล์ขึ้น S3 / Supabase Storage
   * @param file ข้อมูลไฟล์ที่ต้องการอัพโหลด
   * @param folder โฟลเดอร์ปลายทาง (ค่าเริ่มต้น: uploads)
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
      // สุ่มชื่อไฟล์ใหม่ด้วยความยาว 8 ตัวอักษร (Hex) ป้องกันชื่อซ้ำ
      const fileExtension = file.originalname.split('.').pop() || '';
      const uniqueName = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}.${fileExtension}`;
      const objectKey = folder ? `${folder}/${uniqueName}` : uniqueName;

      // ส่งคำสั่ง Upload ไปที่ S3
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: objectKey,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );

      this.logger.log(`อัพโหลดไฟล์สำเร็จ: ${objectKey}`);

      // คืนค่า URL และ Key ของไฟล์นำไปบันทึกลง Database
      const url = this.constructFileUrl(bucketName, objectKey);
      return { url, key: objectKey };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      this.logger.error(`เกิดข้อผิดพลาดในการอัพโหลด: ${errorMsg}`);
      throw new InternalServerErrorException('ไม่สามารถอัพโหลดไฟล์ได้');
    }
  }

  /**
   * ลบไฟล์ออกจาก S3 / Supabase Storage
   * @param objectKey ตำแหน่งของไฟล์ (เช่น uploads/12345.png)
   */
  async deleteFile(
    objectKey: string,
    bucketName = this.defaultBucket,
  ): Promise<void> {
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: bucketName,
          Key: objectKey,
        }),
      );
      this.logger.log(`ลบไฟล์สำเร็จ: ${objectKey}`);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      this.logger.error(`เกิดข้อผิดพลาดในการลบไฟล์: ${errorMsg}`);
      throw new InternalServerErrorException('ไม่สามารถลบไฟล์ได้');
    }
  }

  //  สร้างลิงก์สำหรับเข้าถึงไฟล์สาธารณะ (Public URL)
  private constructFileUrl(bucketName: string, objectKey: string): string {
    // ถ้ามีการระบุ Public URL ใน .env ให้ใช้งานได้เลย (เหมาะกับ Supabase)
    const publicUrl = process.env.MINIO_PUBLIC_URL;
    if (publicUrl) {
      return `${publicUrl.replace(/\/$/, '')}/${bucketName}/${objectKey}`;
    }

    // กรณีไม่มี Public URL จะทำการสร้าง URL สดๆ จาก Endpoint
    const endpoint = process.env.MINIO_ENDPOINT;

    // ถ้าใส่มาเป็น URL เต็มๆ แล้ว
    if (endpoint.startsWith('http')) {
      return `${endpoint.replace(/\/$/, '')}/${bucketName}/${objectKey}`;
    }

    // ถ้าใส่มาแค่ชื่อโดเมน/IP
    const port = Number.parseInt(process.env.MINIO_PORT, 10);
    const useSsl = process.env.MINIO_USE_SSL === 'true';
    const protocol = useSsl ? 'https' : 'http';
    const host = port === 80 || port === 443 ? endpoint : `${endpoint}:${port}`;

    return `${protocol}://${host}/${bucketName}/${objectKey}`;
  }
}
