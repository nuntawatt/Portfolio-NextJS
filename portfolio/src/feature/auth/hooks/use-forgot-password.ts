'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AuthService, getErrorMessage } from '../core/lib';

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'auth.validation.email_required').email('auth.validation.email_invalid'),
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
      setSuccessMsg(res.message || 'auth.validation.forgot_success');
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
