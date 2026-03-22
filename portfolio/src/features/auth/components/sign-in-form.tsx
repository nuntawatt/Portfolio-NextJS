'use client';

import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { SignInData } from '../types/auth.type';
import { AuthInput } from './auth-form';

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
            className="p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        }
      />

      <div className="pt-2">
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-600/50 disabled:cursor-not-allowed text-white text-base font-semibold rounded-xl shadow-sm hover:shadow-orange-500/25 transition-all duration-200 active:scale-95 border border-transparent focus:outline-none focus:ring-4 focus:ring-orange-500/30"
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
