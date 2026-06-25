import { AuthCallback } from '@/features/auth/callback/components/auth-callback';

// ข้อมูล Meta สำหรับหน้า Auth Callback
export const metadata = {
  title: 'Auth Callback',
  description: 'Authentication callback page for handling OAuth responses.',
};

// หน้าเพจรองรับผลลัพธ์การยืนยันตัวตน (Authentication Callback) เช่น OAuth หรือการเปลี่ยนเส้นทางกลับ
export default function AuthCallbackPage() {
  return <AuthCallback />;
}

