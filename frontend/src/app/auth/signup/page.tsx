import { SignUpContainer } from '@/features/auth/signup/containers/signup-container';

// ข้อมูล Meta สำหรับหน้าสมัครสมาชิก
export const metadata = {
  title: 'Sign Up',
  description: 'Create an account to access the full portfolio experience.',
};

// หน้าเพจสำหรับสมัครสมาชิก (Sign Up Page)
export default function SignUpPage() {
  return <SignUpContainer />;
}

