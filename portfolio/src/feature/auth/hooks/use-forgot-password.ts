'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AuthService, getErrorMessage } from '../core/lib';

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
});

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export function useForgotPassword() {
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await AuthService.forgotPassword(data.email);
      setSuccessMsg(res.message || 'If an account exists, a reset link has been sent to your email.');
      form.reset();
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
