'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { AuthFormLayout } from '@/shared/components/auth';
import { AuthPageLayout } from '@/shared/components/auth-page-layout';
import { AuthInput } from '@/shared/components/auth-in';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
import { useForgotPassword } from '../hooks/use-forgot-password';

export function ForgotPasswordContainer() {
  const router = useRouter();
  const { form, isLoading, errorMsg, successMsg, onSubmit } = useForgotPassword();

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
            placeholder="your@email.com"
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
