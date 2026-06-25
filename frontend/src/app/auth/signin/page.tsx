import { SignInContainer } from '@/features/auth/signIn/containers/SignInContainer';

// ข้อมูล Meta สำหรับหน้าเข้าสู่ระบบ
export const metadata = {
  title: 'Sign In',
  description: 'Sign in to access the full portfolio experience.',
};

// หน้าเพจสำหรับเข้าสู่ระบบ (Sign In Page)
export default function SignInPage() {
  return <SignInContainer />;
}

