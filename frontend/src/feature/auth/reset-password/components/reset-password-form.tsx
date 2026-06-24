'use client';

import React, { useState } from 'react';
import { Loader2, Eye } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { AuthInput, CustomEyeOff } from '@/shared/auth-input';
import { useTranslation } from '@/shared/LanguageProvider';
import { ResetPasswordData } from '../types';

interface ResetPasswordFormProps {
  form: UseFormReturn<ResetPasswordData>;
  onSubmit: (data: ResetPasswordData) => void;
  isLoading: boolean;
}

// คอมโพเนนต์ฟอร์มสำหรับตั้งรหัสผ่านใหม่ (Reset Password Form)
export function ResetPasswordForm({ form, onSubmit, isLoading }: ResetPasswordFormProps) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, formState: { errors }, handleSubmit } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <AuthInput
        id="reset-password"
        label={t('auth.reset_new_password') as string}
        type={showPassword ? 'text' : 'password'}
        placeholder={t('auth.password_placeholder') as string}
        {...register('password')}
        error={errors.password?.message ? (t(errors.password.message) as string) : undefined}
        icon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="transition-colors focus:outline-none text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label={showPassword ? (t('auth.hide_password') as string) : (t('auth.show_password') as string)}
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
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message ? (t(errors.confirmPassword.message) as string) : undefined}
        icon={
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="transition-colors focus:outline-none text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label={showConfirmPassword ? (t('auth.hide_password') as string) : (t('auth.show_password') as string)}
          >
            {showConfirmPassword ? <Eye className="w-5 h-5" /> : <CustomEyeOff className="w-5 h-5" />}
          </button>
        }
      />

      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer text-white text-[15px] font-semibold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-orange-500/50"
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
  );
}
