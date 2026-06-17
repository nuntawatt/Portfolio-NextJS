import { IsOptional, IsInt, Min, Max, IsString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

/** Query parameters for pagination and sorting. */
export class PaginationDto {
  /** Page number (1-indexed). Defaults to 1. */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  /** Number of records per page. Defaults to 10. Max 100. */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;

  /** Optional search/filter string. */
  @IsOptional()
  @IsString()
  search?: string;

  /** Field name to sort by. Defaults to 'createdAt'. */
  @IsOptional()
  @IsString()
  sortBy: string = 'createdAt';

  /** Sort direction. Defaults to 'desc'. */
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder: 'asc' | 'desc' = 'desc';
}

/** Paginated response wrapper. */
export type PaginatedResult<T> = {
  /** Array of items for the current page */
  data: T[];
  /** Pagination metadata */
  meta: {
    /** Total number of records matching the query */
    total: number;
    /** Current page number (1-indexed) */
    page: number;
    /** Number of records per page */
    limit: number;
    /** Total number of pages */
    totalPages: number;
  };
};
