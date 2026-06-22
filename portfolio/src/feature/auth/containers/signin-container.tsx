'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, SignInData } from '../core/types';
import { useLogin } from '../hooks/use-login';
import { AuthFormLayout } from '@/shared/components/auth';
import { AuthPageLayout } from '@/shared/components/auth-page-layout';
import { SignInForm } from '../components/signin-form';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/shared/providers/LanguageProvider';

// คอนเทนเนอร์หลักสำหรับหน้าเข้าสู่ระบบ (Sign In Container)
export function SignInContainer() {
  // เรียกใช้งาน Router จาก Next.js
  const router = useRouter();
  // เรียกใช้งานระบบแปลภาษา (Translation)
  const { t } = useTranslation();
  // สถานะสำหรับเก็บข้อความแจ้งเตือนเมื่อเข้าสู่ระบบสำเร็จ
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // เตรียมฟอร์มเข้าสู่ระบบโดยใช้ React Hook Form และ Zod Validation Schema
  const signInForm = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    mode: 'onSubmit',
  });

  // โหลดอีเมลที่ผู้ใช้บันทึกไว้ (Remember Me) จาก localStorage เพื่อนำมาใช้กรอกอัตโนมัติในฟอร์ม
  React.useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      signInForm.setValue('email', savedEmail);
      signInForm.setValue('rememberMe', true);
    }
  }, [signInForm]);

  // เรียกใช้ custom hook สำหรับการส่งคำขอล็อกอินไปยัง Backend API
  const { login, isLoading, error } = useLogin();

  // ฟังก์ชันยิง API เมื่อกดยอมรับฟอร์ม (Submit)
  const onSubmit = (data: SignInData) => {
    login(data, () => {
      // บันทึกหรือลบอีเมลใน localStorage ขึ้นอยู่กับเช็คบ็อกซ์ Remember Me
      if (data.rememberMe) {
        localStorage.setItem('rememberedEmail', data.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      setSuccessMsg(t('auth.signin_success') as string);
      signInForm.reset();
      router.push('/');
    });
  };

  return (
    <AuthPageLayout>
      <AuthFormLayout
        title={t('auth.signin_title') as string}
        subtitle={t('auth.signin_subtitle') as string}
        footerText={t('auth.dont_have_account') as string}
        footerActionText={t('auth.signup_link') as string}
        onFooterAction={() => router.push(routes.auth.signup)}
        error={error ? (t(error) as string) : undefined}
        successMsg={successMsg ? (t(successMsg) as string) : undefined}
      >
        <SignInForm
          form={signInForm}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </AuthFormLayout>
    </AuthPageLayout>
  );
}
