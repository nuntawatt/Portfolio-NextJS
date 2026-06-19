'use client';

import { Suspense } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
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
    <div className="relative p-8 rounded-3xl bg-white/80 dark:bg-zinc-900/80 border border-gray-100 dark:border-white/10 shadow-2xl backdrop-blur-xl max-w-sm w-full mx-4 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
      {/* Animated outer ring */}
      <div className="absolute inset-0 rounded-3xl border border-orange-500/10 pointer-events-none" />

      <div className="relative w-48 h-48 overflow-hidden rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-100 dark:bg-zinc-800">
        <Image
          src={siteConfig.animations.loading}
          alt="Securing session..."
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>
      <div className="space-y-2 select-none">
        <h3 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white animate-pulse">
          Securing your session...
        </h3>
        <p className="text-xs text-orange-500 dark:text-orange-400 font-mono font-medium tracking-wide">
          Connecting to account
        </p>
      </div>
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
          <div className="relative p-8 rounded-3xl bg-white/80 dark:bg-zinc-900/80 border border-gray-100 dark:border-white/10 shadow-2xl backdrop-blur-xl max-w-sm w-full mx-4 flex flex-col items-center justify-center text-center space-y-6">
            <div className="absolute inset-0 rounded-3xl border border-orange-500/10 pointer-events-none" />
            <div className="relative w-48 h-48 overflow-hidden rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-100 dark:bg-zinc-800">
              <Image
                src={siteConfig.animations.loading}
                alt="Loading..."
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
            <div className="space-y-2 select-none">
              <h3 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white animate-pulse">
                Initializing...
              </h3>
              <p className="text-xs text-orange-500 dark:text-orange-400 font-mono font-medium tracking-wide">
                Please wait
              </p>
            </div>
          </div>
        }
      >
        <AuthCallbackContent />
      </Suspense>
    </div>
  );
}
