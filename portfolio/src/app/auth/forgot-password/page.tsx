import { Metadata } from 'next';
import { ForgotPasswordContainer } from '@/feature/auth';

export const metadata: Metadata = {
  title: 'Forgot Password | Morgorn',
  description: 'Reset your password.',
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordContainer />;
}
