'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, ForgotPasswordData } from '../types';
import { AuthService, getErrorMessage } from '@/shared/auth/auth-service';

// Custom Hook สำหรับหน้าขอลืมรหัสผ่าน (Forgot Password)
export function useForgotPassword() {
  // สถานะเพื่อแจ้งข้อความความสำเร็จ ข้อผิดพลาด และสถานะการโหลดข้อมูล
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // ควบคุมฟอร์มด้วย React Hook Form และ Zod Schema
  const form = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  // ฟังก์ชันยิง API เมื่อกดยืนยันการส่งอีเมลกู้คืนรหัสผ่าน
  const onSubmit = async (data: ForgotPasswordData) => {
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await AuthService.forgotPassword(data.email);
      setSuccessMsg(res.message || 'auth.validation.forgot_success');
      form.reset();
    } catch (err) {
      setErrorMsg(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    errorMsg,
    successMsg,
    onSubmit,
  };
}
