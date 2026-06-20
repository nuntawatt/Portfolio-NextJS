'use client';

import React, { useState } from 'react';
import { Loader2, Eye } from 'lucide-react';
import { AuthFormLayout } from '@/shared/components/auth';
import { AuthPageLayout } from '@/shared/components/auth-page-layout';
import { AuthInput, CustomEyeOff } from '@/shared/components/auth-in';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
import { useResetPassword } from '../hooks/use-reset-password';

import { useTranslation } from '@/shared/providers/LanguageProvider';

export function ResetPasswordContainer() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { form, isLoading, errorMsg, successMsg, onSubmit } = useResetPassword();
  const { t } = useTranslation();

  return (
    <AuthPageLayout>
      <AuthFormLayout
        title={t('auth.reset_title') as string}
        subtitle={t('auth.reset_subtitle') as string}
        footerText={t('auth.reset_back_to') as string}
        footerActionText={t('auth.signin_link') as string}
        onFooterAction={() => router.push(routes.auth.signin)}
        error={errorMsg}
        successMsg={successMsg}
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
          <AuthInput
            id="reset-password"
            label={t('auth.reset_new_password') as string}
            type={showPassword ? 'text' : 'password'}
            placeholder={t('auth.password_placeholder') as string}
            {...form.register('password')}
            error={form.formState.errors.password?.message ? (t(form.formState.errors.password.message) as string) : undefined}
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
            label={t('auth.confirm_password') as string}
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder={t('auth.password_placeholder') as string}
            {...form.register('confirmPassword')}
            error={form.formState.errors.confirmPassword?.message ? (t(form.formState.errors.confirmPassword.message) as string) : undefined}
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
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-[15px] font-semibold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> {t('auth.reset_loading')}
                </>
              ) : (
                t('auth.reset_btn') as string
              )}
            </button>
          </div>
        </form>
      </AuthFormLayout>
    </AuthPageLayout>
  );
}
