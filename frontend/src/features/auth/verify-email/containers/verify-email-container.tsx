'use client';

import React from 'react';
import { AuthPageLayout } from '@/shared/auth/auth-page-layout';
import { useVerifyEmail } from '../hooks/use-verify-email';
import { VerifyEmailCard } from '../components/verify-email-card';

// คอนเทนเนอร์หลักสำหรับหน้าตรวจสอบยืนยันอีเมล (Verify Email Container)
export function VerifyEmailContainer() {
  // ดึงสถานะผลลัพธ์ (status) และข้อความแจ้งเตือน (message) จาก custom hook สำหรับการยืนยันอีเมล
  const { status, message } = useVerifyEmail();

  return (
    <AuthPageLayout>
      <VerifyEmailCard status={status} message={message} />
    </AuthPageLayout>
  );
}
