'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { AuthFormLayout } from '@/shared/components/auth';
import { AuthPageLayout } from '@/shared/components/auth-page-layout';
import { AuthInput } from '@/shared/components/auth-in';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
import { useForgotPassword } from '../hooks/use-forgot-password';

import { useTranslation } from '@/shared/providers/LanguageProvider';

export function ForgotPasswordContainer() {
  const router = useRouter();
  const { form, isLoading, errorMsg, successMsg, onSubmit } = useForgotPassword();
  const { t } = useTranslation();

  return (
    <AuthPageLayout>
      <AuthFormLayout
        title={t('auth.forgot_title') as string}
        subtitle={t('auth.forgot_subtitle') as string}
        footerText={t('auth.forgot_remember') as string}
        footerActionText={t('auth.signin_link') as string}
        onFooterAction={() => router.push(routes.auth.signin)}
        error={errorMsg ? (t(errorMsg) as string) : undefined}
        successMsg={successMsg ? (t(successMsg) as string) : undefined}
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
          <AuthInput
            id="forgot-email"
            label={t('auth.email') as string}
            type="email"
            placeholder={t('auth.email_placeholder') as string}
            {...form.register('email')}
            error={form.formState.errors.email?.message ? (t(form.formState.errors.email.message) as string) : undefined}
          />

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer text-white text-[15px] font-semibold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> {t('auth.forgot_sending')}
                </>
              ) : (
                t('auth.forgot_btn') as string
              )}
            </button>
          </div>
        </form>
      </AuthFormLayout>
    </AuthPageLayout>
  );
}
