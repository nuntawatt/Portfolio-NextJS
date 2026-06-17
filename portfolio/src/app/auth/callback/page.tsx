'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '@/feature/auth/store/store';
import { setAuthToken } from '@/feature/auth/core/lib';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const processCallback = async () => {
      const dataParam = searchParams.get('data');
      if (!dataParam) {
        setError('No authentication data received from server.');
        return;
      }

      try {
        const parsedData = JSON.parse(dataParam);
        const { user, token } = parsedData;

        // Legacy local storage setup for apiClient
        setAuthToken(token.accessToken);
        setAuth({
          id: user.id,
          email: user.email,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          token: token.accessToken,
        });

        // Initialize NextAuth session using CredentialsProvider
        const result = await signIn('credentials', {
          redirect: false,
          token: token.accessToken,
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        router.push('/');
      } catch (err) {
        console.error('Failed to process OAuth callback:', err);
        setError('Failed to securely log you in. Please try again.');
      }
    };

    processCallback();
  }, [searchParams, router, setAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a]">
      {error ? (
        <div className="text-center space-y-4">
          <p className="text-red-500 font-medium">{error}</p>
          <button
            onClick={() => router.push('/auth/signin')}
            className="text-orange-500 hover:text-orange-600 transition-colors"
          >
            Return to sign in
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          <p className="text-gray-500 dark:text-gray-400 font-medium">Securing your session...</p>
        </div>
      )}
    </div>
  );
}
