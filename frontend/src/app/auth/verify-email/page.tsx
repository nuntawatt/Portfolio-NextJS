import { Metadata } from 'next';
import { VerifyEmailContainer } from '@/features/auth/verify-email/containers/verify-email-container';
import { Suspense } from 'react';
import { LoadingScreen } from '@/shared/ui';

// ข้อมูล Meta สำหรับหน้ายืนยันอีเมล
export const metadata: Metadata = {
  title: 'Verify Email',
  description: 'Verify your email address.',
};

// หน้าเพจสำหรับยืนยันอีเมล (Verify Email Page) ห่อหุ้มด้วย Suspense สำหรับจัดการสถานะการโหลด
export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<LoadingScreen title="Loading verification..." subtitle="Please wait" />}>
      <VerifyEmailContainer />
    </Suspense>
  );
}


