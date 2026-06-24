'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { AuthInput } from '@/shared/components/auth-input';
import { useTranslation } from '@/shared/providers/LanguageProvider';
import { ForgotPasswordData } from '../types';

interface ForgotPasswordFormProps {
  form: UseFormReturn<ForgotPasswordData>;
  onSubmit: (data: ForgotPasswordData) => void;
  isLoading: boolean;
}

// คอมโพเนนต์แสดงผลฟอร์มขอลืมรหัสผ่าน (Forgot Password Form)
export function ForgotPasswordForm({ form, onSubmit, isLoading }: ForgotPasswordFormProps) {
  const { t } = useTranslation();
  const { register, formState: { errors }, handleSubmit } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <AuthInput
        id="forgot-email"
        label={t('auth.email') as string}
        type="email"
        placeholder={t('auth.email_placeholder') as string}
        {...register('email')}
        error={errors.email?.message ? (t(errors.email.message) as string) : undefined}
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
  );
}
