import { Metadata } from 'next';
import { ForgotPasswordContainer } from '@/features/auth/forgot-password/containers/forgot-password-container';

// ข้อมูล Meta สำหรับหน้าขอลืมรหัสผ่าน
export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your password.',
};

// หน้าเพจสำหรับขอลืมรหัสผ่าน (Forgot Password Page)
export default function ForgotPasswordPage() {
  return <ForgotPasswordContainer />;
}

