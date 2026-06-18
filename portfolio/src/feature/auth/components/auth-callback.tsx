'use client';

import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuthCallback } from '../hooks/use-auth-callback';

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
    <div className="flex flex-col items-center gap-3">
      <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      <p className="text-gray-500 dark:text-gray-400 font-medium">Securing your session...</p>
    </div>
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
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            <p className="text-gray-500 dark:text-gray-400 font-medium">Loading...</p>
          </div>
        }
      >
        <AuthCallbackContent />
      </Suspense>
    </div>
  );
}
