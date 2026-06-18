'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useAuthStore } from '@/feature/auth/stores/store';
import { setAuthToken } from '@/feature/auth/core/lib';

export function useAuthCallback() {
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

  return { error, router };
}
