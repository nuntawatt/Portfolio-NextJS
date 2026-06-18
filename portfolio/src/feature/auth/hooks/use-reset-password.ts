'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams, useRouter } from 'next/navigation';
import { AuthService, getErrorMessage } from '../core/lib';
import { routes } from '@/config/routes';

export const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export function useResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordData) => {
    if (!token) {
      setErrorMsg('No reset token found. Please request a new password reset link.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await AuthService.resetPassword({ token, newPassword: data.password });
      setSuccessMsg(res.message || 'Password reset successfully!');
      form.reset();
      setTimeout(() => {
        router.push(routes.auth.signin);
      }, 3000);
    } catch (err) {
      setErrorMsg(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    errorMsg,
    successMsg,
    onSubmit,
  };
}
