'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { AuthService, getErrorMessage } from '../core/lib';
import { SignUpData } from '../core/types';
import { useAuthStore } from '../stores/store';

// Custom Hook สำหรับขั้นตอนการลงทะเบียนสมาชิกใหม่ (Registration Process)
export const useRegister = () => {
  // สถานะการทำรายการลงทะเบียน และสถานะข้อความแสดงความผิดพลาด
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // เรียกฟังก์ชันสำหรับบันทึกข้อมูลผู้ใช้ลงใน Auth Store (Zustand)
  const setAuth = useAuthStore((state) => state.setAuth);

  // ฟังก์ชันลงทะเบียน ส่งข้อมูลไปยัง API และเข้าสู่ระบบผ่าน NextAuth
  const register = async (data: SignUpData, onSuccess?: () => void) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await AuthService.register(data);
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

  // ฟังก์ชันสำหรับล้างค่าแจ้งเตือนข้อผิดพลาด
  const resetError = () => setError(null);

  return { register, isLoading, error, resetError };
};
