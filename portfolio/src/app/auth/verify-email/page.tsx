import { Metadata } from 'next';
import { VerifyEmailContainer } from '@/feature/auth/containers/verify-email';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Verify Email | Morgorn',
  description: 'Verify your email address.',
};

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContainer />
    </Suspense>
  );
}
