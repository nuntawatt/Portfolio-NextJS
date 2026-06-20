import { Metadata } from 'next';
import { VerifyEmailContainer } from '@/feature/auth';
import { Suspense } from 'react';
import { LoadingScreen } from '@/shared/components/loading/loading-card';

export const metadata: Metadata = {
  title: 'Verify Email | Morgorn',
  description: 'Verify your email address.',
};

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<LoadingScreen title="Loading verification..." subtitle="Please wait" />}>
      <VerifyEmailContainer />
    </Suspense>
  );
}

