import { IsOptional, IsInt, Min, Max, IsString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

// DTO for pagination parameters in API requests.
export class PaginationDto {
  // Page number (1-indexed). Defaults to 1.
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  // Number of records per page. Defaults to 10, max 100.
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;

  // Optional search query to filter results.
  @IsOptional()
  @IsString()
  search?: string;

  // Optional field to sort by. Defaults to 'createdAt'.
  @IsOptional()
  @IsString()
  sortBy: string = 'createdAt';

  // Optional sort order: 'asc' or 'desc'. Defaults to 'desc'.
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder: 'asc' | 'desc' = 'desc';
}

// Type for paginated results returned by service methods.
export type PaginatedResult<T> = {
  // Array of records for the current page.
  data: T[];
  // Metadata about the pagination state.
  meta: {
    // Total number of records across all pages.
    total: number;
    // Current page number.
    page: number;
    // Number of records per page.
    limit: number;
    // Total number of pages available.
    totalPages: number;
  };
};
