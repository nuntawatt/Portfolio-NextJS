import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';

/** UUID regex pattern. */
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Pipe to validate UUID path/query parameters. */
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
