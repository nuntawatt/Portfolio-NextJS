'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, ResetPasswordData } from '../types';
import { useSearchParams, useRouter } from 'next/navigation';
import { AuthService, getErrorMessage } from '@/shared/auth/auth-service';
import { routes } from '@/config/routes';

// Custom Hook สำหรับหน้าตั้งค่ารหัสผ่านใหม่ (Reset Password)
export function useResetPassword() {
  // นำเข้าตัวจัดการ Router และดึง Token ที่ได้รับจากอีเมล
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  // สถานะแจ้งเตือนความสำเร็จ ข้อความผิดพลาด และสถานะการประมวลผล
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // ควบคุมฟอร์มด้วย React Hook Form และ Zod Schema
  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  // ฟังก์ชันยิง API เพื่อตั้งค่ารหัสผ่านใหม่
  const onSubmit = async (data: ResetPasswordData) => {
    if (!token) {
      setErrorMsg('auth.validation.no_token');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await AuthService.resetPassword({ token, newPassword: data.password });
      setSuccessMsg(res.message || 'auth.validation.reset_success');
      form.reset();
      // นำทางไปยังหน้าเข้าสู่ระบบหลังดำเนินการเสร็จสิ้น 3 วินาที
      setTimeout(() => {
        router.push(routes.auth.signin);
      }, 3000);
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
