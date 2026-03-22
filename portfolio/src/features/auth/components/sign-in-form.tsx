'use client';

import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { SignInData } from '../types/auth.type';
import { AuthInput, CustomEye, CustomEyeOff } from './auth-form';

interface SignInFormProps {
  form: UseFormReturn<SignInData>;
  onSubmit: (data: SignInData) => void;
  isLoading: boolean;
}

export function SignInForm({ form, onSubmit, isLoading }: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isValid } } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <AuthInput
        id="signin-email"
        label="Email address"
        type="email"
        placeholder="you@example.com"
        {...register('email')}
        error={errors.email?.message}
      />

      <AuthInput
        id="signin-password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="••••••••"
        {...register('password')}
        error={errors.password?.message}
        icon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-md transition-colors focus:outline-none text-gray-400 hover:text-gray-600 dark:hover:text-white"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <CustomEyeOff className="w-5 h-5" /> : <CustomEye className="w-5 h-5" />}
          </button>
        }
      />

      <div className="pt-2">
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#f89e7b] hover:bg-[#f08a65] dark:bg-orange-500 dark:hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[15px] font-semibold rounded-xl shadow-sm transition-all duration-200 active:scale-[0.98] focus:outline-none"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </div>
    </form>
  );
}
