'use client';

import React, { useState } from 'react';
import { Loader2, Eye } from 'lucide-react';
import { AuthFormLayout } from '@/shared/components/auth';
import { AuthPageLayout } from '@/shared/components/auth-page-layout';
import { AuthInput, CustomEyeOff } from '@/shared/components/auth-in';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
import { useResetPassword } from '../hooks/use-reset-password';

export function ResetPasswordContainer() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { form, isLoading, errorMsg, successMsg, onSubmit } = useResetPassword();

  return (
    <AuthPageLayout>
      <AuthFormLayout
        title="Create new password"
        subtitle="Please enter your new password below"
        footerText="Back to"
        footerActionText="Sign in"
        onFooterAction={() => router.push(routes.auth.signin)}
        error={errorMsg}
        successMsg={successMsg}
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
          <AuthInput
            id="reset-password"
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            {...form.register('password')}
            error={form.formState.errors.password?.message}
            icon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="transition-colors focus:outline-none text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <Eye className="w-5 h-5" /> : <CustomEyeOff className="w-5 h-5" />}
              </button>
            }
          />

          <AuthInput
            id="reset-confirm-password"
            label="Confirm New Password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="••••••••"
            {...form.register('confirmPassword')}
            error={form.formState.errors.confirmPassword?.message}
            icon={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="transition-colors focus:outline-none text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <Eye className="w-5 h-5" /> : <CustomEyeOff className="w-5 h-5" />}
              </button>
            }
          />

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-[15px] font-semibold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Resetting...
                </>
              ) : (
                'Reset Password'
              )}
            </button>
          </div>
        </form>
      </AuthFormLayout>
    </AuthPageLayout>
  );
}
