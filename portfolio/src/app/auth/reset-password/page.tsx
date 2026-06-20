import { Metadata } from 'next';
import { ResetPasswordContainer } from '@/feature/auth';
import { Suspense } from 'react';
import { LoadingScreen } from '@/shared/components/loading/loading-card';

export const metadata: Metadata = {
  title: 'Reset Password | Morgorn',
  description: 'Create a new password for your account.',
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingScreen title="Loading password reset..." subtitle="Please wait" />}>
      <ResetPasswordContainer />
    </Suspense>
  );
}