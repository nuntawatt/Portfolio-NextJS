'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { AuthService, getErrorMessage } from '../core/lib';
import { AuthFormLayout } from '@/shared/components/auth';
import { AuthPageLayout } from '@/shared/components/auth-page-layout';
import { AuthInput } from '@/shared/components/auth-in';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordContainer() {
  const router = useRouter();
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

  return (
    <AuthPageLayout>
      <AuthFormLayout
        title="Reset Password"
        subtitle="Enter your email to receive a password reset link"
        footerText="Remember your password?"
        footerActionText="Sign in"
        onFooterAction={() => router.push(routes.auth.signin)}
        error={errorMsg}
        successMsg={successMsg}
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
          <AuthInput
            id="forgot-email"
            label="Email address"
            type="email"
            placeholder="your@example.com"
            {...form.register('email')}
            error={form.formState.errors.email?.message}
          />

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-[15px] font-semibold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </div>
        </form>
      </AuthFormLayout>
    </AuthPageLayout>
  );
}
