'use client';

import React from 'react';
import { AuthFormLayout } from '@/shared/auth/auth-form-layout';
import { AuthPageLayout } from '@/shared/auth/auth-page-layout';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
import { useResetPassword } from '../hooks/use-reset-password';
import { ResetPasswordForm } from '../components/reset-password-form';
import { useTranslation } from '@/shared/providers/LanguageProvider';

// คอนเทนเนอร์สำหรับจัดการหน้าตั้งค่ารหัสผ่านใหม่ (Reset Password Container)
export function ResetPasswordContainer() {
  // เรียกใช้งาน Router จาก Next.js
  const router = useRouter();
  // ดึงข้อมูลฟอร์ม สถานะการโหลด ข้อความ และฟังก์ชันการส่งข้อมูลจาก custom hook
  const { form, isLoading, errorMsg, successMsg, onSubmit } = useResetPassword();
  // ดึงฟังก์ชันสำหรับการแปลภาษา
  const { t } = useTranslation();

  return (
    <AuthPageLayout>
      <AuthFormLayout
        title={t('auth.reset_title') as string}
        subtitle={t('auth.reset_subtitle') as string}
        footerText={t('auth.reset_back_to') as string}
        footerActionText={t('auth.signin_link') as string}
        onFooterAction={() => router.push(routes.auth.signin)}
        error={errorMsg ? (t(errorMsg) as string) : undefined}
        successMsg={successMsg ? (t(successMsg) as string) : undefined}
      >
        <ResetPasswordForm
          form={form}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </AuthFormLayout>
    </AuthPageLayout>
  );
}
