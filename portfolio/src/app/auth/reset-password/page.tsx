import { Metadata } from 'next';
import { ResetPasswordContainer } from '@/feature/auth/containers/reset-password';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Reset Password | Morgorn',
  description: 'Create a new password for your account.',
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContainer />
    </Suspense>
  );
}