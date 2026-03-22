'use client';

import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { SignUpData } from '../types/auth.type';
import { AuthInput, CustomEye, CustomEyeOff } from './auth-form';

interface SignUpFormProps {
  form: UseFormReturn<SignUpData>;
  onSubmit: (data: SignUpData) => void;
  isLoading: boolean;
}

export function SignUpForm({ form, onSubmit, isLoading }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isValid } } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <AuthInput
          id="signup-firstName"
          label="First name"
          placeholder="John"
          {...register('firstName')}
          error={errors.firstName?.message}
        />
        <AuthInput
          id="signup-lastName"
          label="Last name"
          placeholder="Doe"
          {...register('lastName')}
          error={errors.lastName?.message}
        />
      </div>

      <AuthInput
        id="signup-email"
        label="Email address"
        type="email"
        placeholder="you@example.com"
        {...register('email')}
        error={errors.email?.message}
      />

      <AuthInput
        id="signup-password"
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

      <AuthInput
        id="signup-confirmPassword"
        label="Confirm Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="••••••••"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />

      <div className="pt-2">
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#f89e7b] hover:bg-[#f08a65] dark:bg-orange-500 dark:hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[15px] font-semibold rounded-xl shadow-sm transition-all duration-200 active:scale-[0.98] focus:outline-none"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </div>
    </form>
  );
}
