import { apiClient } from '@/shared/lib/api/apiClient';
import { AuthResponse } from '@/shared/auth/AuthTypes';
import { SignInData } from '@/features/auth/signIn/types';
import { SignUpData } from '@/features/auth/signUp/types';

// กำหนดรูปแบบข้อมูลสำหรับโปรไฟล์ผู้ใช้
export interface ProfilePayload {
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
}

// กำหนดรูปแบบข้อมูลสำหรับใช้รีเซ็ตรหัสผ่าน
export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

// ========== Constants ==========
// ค่าคงที่คีย์ที่ใช้สำหรับจัดเก็บ JWT Token
export const AUTH_KEYS = {
  TOKEN_KEY: 'auth_token',
};

// ========== Utils ==========
// ดึงข้อความแสดงความผิดพลาดเป็นข้อความ String
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return String(error);
};

// จัดเก็บ Auth Token ลงใน LocalStorage
export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_KEYS.TOKEN_KEY, token);
  }
};

// ลบ Auth Token ออกจาก LocalStorage
export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEYS.TOKEN_KEY);
  }
};

// ========== API ==========
// อ็อบเจกต์รวบรวมการทำ HTTP Request ไปยังเซิร์ฟเวอร์สำหรับ Auth
export const authApi = {
  // ส่งคำขอเข้าสู่ระบบ (Sign In)
  login: async (data: SignInData): Promise<AuthResponse> => {
    const { email, password } = data;
    const response = await apiClient.post('/auth/login', { email, password });
    const payload = response.data.data; // standard wrapper { success, data, timestamp }
    const { user, token } = payload;
    
    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        token: token.accessToken,
        avatar: user.avatar || '',
      },
      message: response.data.message || 'Successfully logged in',
    };
  },

  // ส่งคำขอลงทะเบียนสร้างบัญชีใหม่ (Sign Up)
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
        token: token?.accessToken || '',
        avatar: user.avatar || '',
      },
      message: response.data.message || 'Account created successfully',
    };
  },

  // ดึงข้อมูลโปรไฟล์ผู้ใช้งานปัจจบัน
  getProfile: async (): Promise<ProfilePayload> => {
    const response = await apiClient.get('/user/profile');
    return response.data.data;
  },

  // ส่งลิงก์ยืนยันตัวตนทางอีเมล
  verifyEmail: async (token: string): Promise<{ message: string }> => {
    const response = await apiClient.post('/auth/verify-email', { token });
    return response.data;
  },

  // ส่งคำขอขอลืมรหัสผ่าน (ขอส่งอีเมลตั้งรหัสผ่านใหม่)
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  },

  // ส่งรหัสผ่านใหม่เพื่อไปตั้งค่ารหัสผ่านใหม่ในฐานข้อมูล
  resetPassword: async (data: ResetPasswordPayload): Promise<{ message: string }> => {
    const response = await apiClient.post('/auth/reset-password', data);
    return response.data;
  }
};

// ========== Service ==========
// คลาส AuthService สำหรับอำนวยความสะดวกในการจัดเก็บ Token และลบเซสชัน (Logout)
export class AuthService {
  // จัดการล็อกอินและบันทึก Token
  static async login(data: SignInData): Promise<AuthResponse> {
    const response = await authApi.login(data);
    setAuthToken(response.user.token);
    return response;
  }

  // ลงทะเบียนผู้ใช้
  static async register(data: SignUpData): Promise<AuthResponse> {
    const response = await authApi.register(data);
    // Don't set auth token here yet because they need to verify email first.
    return response;
  }

  // เรียกฟังก์ชันยืนยันอีเมล
  static async verifyEmail(token: string): Promise<{ message: string }> {
    return authApi.verifyEmail(token);
  }

  // เรียกฟังก์ชันลืมรหัสผ่าน
  static async forgotPassword(email: string): Promise<{ message: string }> {
    return authApi.forgotPassword(email);
  }

  // เรียกฟังก์ชันรีเซ็ตรหัสผ่าน
  static async resetPassword(data: ResetPasswordPayload): Promise<{ message: string }> {
    return authApi.resetPassword(data);
  }

  // ออกจากระบบและทำลาย Token ในเครื่องผู้ใช้งาน
  static logout(): void {
    removeAuthToken();
  }
}
