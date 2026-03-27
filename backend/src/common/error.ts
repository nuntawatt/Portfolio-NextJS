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

    EMAIL_NOT_VERIFIED: {
        status: 403,
        message: 'Email not verified',
    },

    // TOKEN
    INVALID_OR_EXPIRED_TOKEN: {
        status: 400,
        message: 'Invalid or expired token',
    },

    // ข้อผิดพลาดสำหรับ refresh token
    INVALID_REFRESH_TOKEN: {
        status: 401,
        message: 'Invalid refresh token',
    },

    ACCESS_DENIED: {
        status: 403,
        message: 'Access denied',
    },

    // GENERAL
    USER_NOT_FOUND_OR_DELETED: {
        status: 404,
        message: 'User not found or has been deleted',
    },

    // OAUTH
    OAUTH_EMAIL_REQUIRED: {
        status: 400,
        message: 'Email is required for OAuth login',
    },

    // กัน OAuth user login ด้วย password
    USE_OAUTH_LOGIN: {
        status: 400,
        message: 'This account uses OAuth login. Please log in with your OAuth provider.',
    },

    // OAUTH
    OAUTH_ACCOUNT_ALREADY_EXISTS: {
        status: 409,
        message: 'OAuth account already exists',
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
