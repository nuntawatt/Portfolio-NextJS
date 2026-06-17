import { apiClient } from '../../../lib/api-client';
import { SignInData, SignUpData, AuthResponse } from './type';

// ========== Constants ==========
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
    localStorage.setItem(AUTH_KEYS.TOKEN_KEY, token);
  }
};

export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEYS.TOKEN_KEY);
  }
};

// ========== API ==========
export const authApi = {
  login: async (data: SignInData): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', data);
    const payload = response.data.data; // standard wrapper { success, data, timestamp }
    const { user, token } = payload;
    
    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        token: token.accessToken,
      },
      message: response.data.message || 'Successfully logged in',
    };
  },

  register: async (data: SignUpData): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/register', {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });
    
    const payload = response.data.data;
    const { user, token } = payload;

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        token: token.accessToken,
      },
      message: response.data.message || 'Account created successfully',
    };
  },

  getProfile: async (): Promise<any> => {
    const response = await apiClient.get('/user/profile');
    return response.data.data;
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
