import { Metadata } from 'next';
import { VerifyEmailContainer } from '@/feature/auth';
import { Suspense } from 'react';
import { LoadingScreen } from '@/shared/components/loading/loading-card';

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


