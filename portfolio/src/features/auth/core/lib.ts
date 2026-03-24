// ========== Constants ==========
export const AUTH_MOCK_DELAY = 1500;

export const AUTH_ENDPOINTS = {
    LOGIN: '/api/v1/auth/login',
    REGISTER: '/api/v1/auth/register',
    LOGOUT: '/api/v1/auth/logout',
    ME: '/api/v1/auth/me',
};

export const AUTH_KEYS = {
    TOKEN_KEY: 'auth_token',
};

// ========== Utils ==========
export const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) return error.message;
    return String(error);
};

export const setAuthToken = (token: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', token);
    }
};

export const removeAuthToken = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
    }
};

// ========== API ==========
import { SignInData, SignUpData, AuthResponse } from './types';

export const authApi = {
    login: async (data: SignInData): Promise<AuthResponse> => {
        // Simulate network latency
        await new Promise((resolve) => setTimeout(resolve, AUTH_MOCK_DELAY));

        if (data.email === 'error@example.com') {
            throw new Error('Invalid email or password');
        }

        return {
            user: {
                id: 'user-1',
                email: data.email,
                token: 'mock-jwt-token-123'
            },
            message: 'Successfully logged in',
        };
    },

    register: async (data: SignUpData): Promise<AuthResponse> => {
        await new Promise((resolve) => setTimeout(resolve, AUTH_MOCK_DELAY));

        if (data.email === 'error@example.com') {
            throw new Error('Email is already taken');
        }

        return {
            user: {
                id: 'user-2',
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                token: 'mock-jwt-token-456'
            },
            message: 'Account created successfully',
        };
    }
};

// ========== Service ==========
export class AuthService {
    static async login(data: SignInData): Promise<AuthResponse> {
        const response = await authApi.login(data);
        setAuthToken(response.user.token);
        return response;
    }

    static async register(data: SignUpData): Promise<AuthResponse> {
        const response = await authApi.register(data);
        setAuthToken(response.user.token);
        return response;
    }

    static logout(): void {
        removeAuthToken();
    }
}
