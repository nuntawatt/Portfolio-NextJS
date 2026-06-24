import { Metadata } from 'next';
import { ResetPasswordContainer } from '@/feature/auth/reset-password/containers/reset-password-container';
import { Suspense } from 'react';
import { LoadingScreen } from '@/shared/components/loading/loading-card';

// ข้อมูล Meta สำหรับหน้าตั้งรหัสผ่านใหม่
export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Create a new password for your account.',
};

// หน้าเพจสำหรับตั้งรหัสผ่านใหม่ (Reset Password Page) ห่อหุ้มด้วย Suspense สำหรับจัดการสถานะการโหลด
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingScreen title="Loading password reset..." subtitle="Please wait" />}>
      <ResetPasswordContainer />
    </Suspense>
  );
}