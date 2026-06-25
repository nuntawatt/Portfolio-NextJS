'use client';

import { useState } from 'react';
import { AuthService, getErrorMessage } from '@/shared/auth/AuthService';
import { SignUpData } from '../types';

// Custom Hook สำหรับขั้นตอนการลงทะเบียนสมาชิกใหม่ (Registration Process)
export const useRegister = () => {
  // สถานะการทำรายการลงทะเบียน และสถานะข้อความแสดงความผิดพลาด
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ฟังก์ชันลงทะเบียน ส่งข้อมูลไปยัง API
  const register = async (data: SignUpData, onSuccess?: () => void) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await AuthService.register(data);
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
