'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { AuthService, getErrorMessage } from '@/shared/lib/auth-service';
import { SignInData } from '../types';
import { useAuthStore } from '@/shared/hooks/use-auth-store';

// Custom Hook สำหรับกระบวนการเข้าสู่ระบบ (Login Process)
export const useLogin = () => {
  // สถานะการทำงานส่งข้อมูล และสถานะข้อความแสดงความผิดพลาด
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // เรียกฟังก์ชันสำหรับบันทึกข้อมูลผู้ใช้ลงใน Auth Store (Zustand)
  const setAuth = useAuthStore((state) => state.setAuth);

  // ฟังก์ชันล็อกอิน ส่งข้อมูลไปยัง API และซิงค์เซสชันเข้า NextAuth
  const login = async (data: SignInData, onSuccess?: () => void) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await AuthService.login(data);
      // We still update local store if needed for legacy reasons, 
      // but NextAuth handles the primary session now.
      setAuth(response.user);
      
      const result = await signIn('credentials', {
        redirect: false,
        token: response.user.token,
        id: response.user.id,
        email: response.user.email,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        avatar: response.user.avatar,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      onSuccess?.();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  // ฟังก์ชันล้างข้อความแจ้งเตือนข้อผิดพลาด
  const resetError = () => setError(null);

  return { login, isLoading, error, resetError };
};
