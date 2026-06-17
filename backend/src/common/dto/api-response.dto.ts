/** Standard success response structure. */
export type ApiSuccessResponse<T> = {
  /** Always `true` for successful responses */
  success: true;
  /** The response payload */
  data: T;
  /** Optional metadata (e.g. pagination info) */
  meta?: unknown;
  /** ISO 8601 timestamp of the response */
  timestamp: string;
};

/** Standard error response structure. */
export type ApiErrorResponse = {
  /** Always `false` for error responses */
  success: false;
  /** HTTP status code */
  statusCode: number;
  /** Human-readable error message(s) */
  message: string | string[];
  /** Error category name (e.g. 'Not Found', 'Conflict') */
  error: string;
  /** ISO 8601 timestamp of the error */
  timestamp: string;
  /** The request path that triggered the error */
  path: string;
};
