'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, SignUpData } from '../core/types';
import { useRegister } from '../hooks/use-register';
import { AuthFormLayout } from '@/shared/components/auth';
import { AuthPageLayout } from '@/shared/components/auth-page-layout';
import { SignUpForm } from '../components/signup-form';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/shared/providers/LanguageProvider';

// คอนเทนเนอร์หลักสำหรับหน้าลงทะเบียนผู้ใช้ใหม่ (Sign Up Container)
export function SignUpContainer() {
  // เรียกใช้งาน Router จาก Next.js
  const router = useRouter();
  // เรียกใช้งานระบบแปลภาษา (Translation)
  const { t } = useTranslation();
  // สถานะสำหรับเก็บข้อความแจ้งเตือนเมื่อลงทะเบียนสำเร็จ
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // เตรียมฟอร์มลงทะเบียนโดยใช้ React Hook Form และ Zod Validation Schema
  const signUpForm = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onSubmit',
  });

  // เรียกใช้ custom hook สำหรับส่งคำขอลงทะเบียนไปยัง Backend API
  const { register, isLoading, error } = useRegister();

  // ฟังก์ชันยิง API เมื่อกดยืนยันการลงทะเบียน (Submit)
  const onSubmit = (data: SignUpData) => {
    register(data, () => {
      setSuccessMsg(t('auth.signup_success') as string);
      signUpForm.reset();
      // นำทางไปยังหน้าเข้าสู่ระบบหลังจากแสดงข้อความสำเร็จ 5 วินาที
      setTimeout(() => {
        router.push(routes.auth.signin);
      }, 5000);
    });
  };

  return (
    <AuthPageLayout>
      <AuthFormLayout
        title={t('auth.signup_title') as string}
        subtitle={t('auth.signup_subtitle') as string}
        footerText={t('auth.already_have_account') as string}
        footerActionText={t('auth.signin_link') as string}
        onFooterAction={() => router.push(routes.auth.signin)}
        error={error ? (t(error) as string) : undefined}
        successMsg={successMsg ? (t(successMsg) as string) : undefined}
      >
        <SignUpForm
          form={signUpForm}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </AuthFormLayout>
    </AuthPageLayout>
  );
}
