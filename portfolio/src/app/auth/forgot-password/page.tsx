import { Metadata } from 'next';
import { ForgotPasswordContainer } from '@/feature/auth';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your password.',
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordContainer />;
}
