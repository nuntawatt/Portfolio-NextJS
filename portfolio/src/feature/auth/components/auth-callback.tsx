'use client';

import { Suspense } from 'react';
import { useAuthCallback } from '../hooks/use-auth-callback';
import { LoadingCard } from '@/shared/components/loading/loading-card';

function AuthCallbackContent() {
  const { error, router } = useAuthCallback();

  if (error) {
    return (
      <div className="text-center space-y-4">
        <p className="text-red-500 font-medium">{error}</p>
        <button
          onClick={() => router.push('/auth/signin')}
          className="text-orange-500 hover:text-orange-600 transition-colors"
        >
          Return to sign in
        </button>
      </div>
    );
  }

  return (
    <LoadingCard 
      title="Securing your session..." 
      subtitle="Connecting to account" 
    />
  );
}

export function AuthCallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a]">
      {/* 
        Next.js requires components that use useSearchParams() to be wrapped in a Suspense boundary 
        during static rendering. 
      */}
      <Suspense
        fallback={
          <LoadingCard 
            title="Initializing..." 
            subtitle="Please wait" 
          />
        }
      >
        <AuthCallbackContent />
      </Suspense>
    </div>
  );
}

