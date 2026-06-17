import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';

// Regular expression to validate UUID format (version 4).
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// ตั้งค่า CustomParseUUIDPipe เป็น Injectable เพื่อให้สามารถใช้ใน NestJS ได้
@Injectable()
export class CustomParseUUIDPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (!UUID_REGEX.test(value)) {
      const paramName = metadata.data || 'parameter';
      throw new BadRequestException(
        `Invalid UUID format for "${paramName}": received "${value}"`,
      );
    }

    return value;
  }
}
