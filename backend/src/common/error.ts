import { HttpException } from '@nestjs/common';

// 🔥 Centralized Error Codes
export const ERROR_CODES = {
    // AUTH
    AUTH_INVALID_CREDENTIALS: {
        status: 401,
        message: 'Invalid email or password',
    },
    AUTH_USER_ALREADY_EXISTS: {
        status: 409,
        message: 'User already exists',
    },

    // USER
    USER_NOT_FOUND: {
        status: 404,
        message: 'User not found',
    },

    // DEFAULT
    INTERNAL_SERVER_ERROR: {
        status: 500,
        message: 'Something went wrong',
    },
} as const;

export type ErrorCode = keyof typeof ERROR_CODES;

// 🔥 Custom Exception Class
export class AppException extends HttpException {
    constructor(code: ErrorCode) {
        const error = ERROR_CODES[code];

        super(
            {
                code,
                message: error.message,
            },
            error.status,
        );
    }
}