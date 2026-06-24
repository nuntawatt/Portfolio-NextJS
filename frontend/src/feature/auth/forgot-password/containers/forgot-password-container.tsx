'use client';

import React from 'react';
import { AuthFormLayout } from '@/shared/auth-form-layout';
import { AuthPageLayout } from '@/shared/auth-page-layout';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
import { useForgotPassword } from '../hooks/use-forgot-password';
import { ForgotPasswordForm } from '../components/forgot-password-form';
import { useTranslation } from '@/shared/LanguageProvider';

// คอนเทนเนอร์หลักสำหรับหน้าขอรีเซ็ตรหัสผ่าน (Forgot Password Container)
export function ForgotPasswordContainer() {
  // เรียกใช้งาน Router จาก Next.js เพื่อนำทางไปยังหน้าอื่น
  const router = useRouter();
  // ดึงข้อมูลฟอร์ม สถานะการโหลด ข้อความผลลัพธ์ และฟังก์ชัน Submit จาก custom hook
  const { form, isLoading, errorMsg, successMsg, onSubmit } = useForgotPassword();
  // ดึงฟังก์ชันแปลภาษาสำหรับการแสดงผลหลายภาษา
  const { t } = useTranslation();

  return (
    <AuthPageLayout>
      <AuthFormLayout
        title={t('auth.forgot_title') as string}
        subtitle={t('auth.forgot_subtitle') as string}
        footerText={t('auth.forgot_remember') as string}
        footerActionText={t('auth.signin_link') as string}
        onFooterAction={() => router.push(routes.auth.signin)}
        error={errorMsg ? (t(errorMsg) as string) : undefined}
        successMsg={successMsg ? (t(successMsg) as string) : undefined}
      >
        <ForgotPasswordForm
          form={form}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </AuthFormLayout>
    </AuthPageLayout>
  );
}
