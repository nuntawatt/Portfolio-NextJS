'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { AuthService } from '../core/lib';

export function useVerifyEmail() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(() =>
    token ? 'loading' : 'error'
  );
  const [message, setMessage] = useState(() =>
    token ? 'Verifying your email address...' : 'No verification token provided.'
  );
  const hasVerified = useRef(false);

  useEffect(() => {
    if (!token || hasVerified.current) return;
    hasVerified.current = true;

    AuthService.verifyEmail(token)
      .then((res) => {
        setStatus('success');
        setMessage(res.message || 'Email verified successfully!');
      })
      .catch((err) => {
        setStatus('error');
        setMessage(err.message || 'Invalid or expired verification token.');
      });
  }, [token]);

  return {
    status,
    message,
    token,
  };
}
