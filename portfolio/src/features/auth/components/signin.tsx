'use client';

import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Loader2, Eye } from 'lucide-react';
import { SignInData } from '../core/types';
import { AuthInput, CustomEyeOff } from './auth-form';

interface SignInFormProps {
    form: UseFormReturn<SignInData>;
    onSubmit: (data: SignInData) => void;
    isLoading: boolean;
}

export function SignInForm({ form, onSubmit, isLoading }: SignInFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = form;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <AuthInput
                id="signin-email"
                label="Email address"
                type="email"
                placeholder="you@example.com"
                {...register('email')}
                error={errors.email?.message}
            />

            <div>
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
                            className="transition-colors focus:outline-none text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <Eye className="w-5 h-5" /> : <CustomEyeOff className="w-5 h-5" />}
                        </button>
                    }
                />
                {/* Remember me + Forgot password */}
                <div className="flex items-center justify-between mt-3">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 dark:border-white/20 text-orange-500 focus:ring-orange-500/30 bg-gray-50 dark:bg-white/5 transition-colors" />
                        <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors font-medium">Remember me</span>
                    </label>
                    <button type="button" className="text-xs font-semibold text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                        Forgot password?
                    </button>
                </div>
            </div>

            <div className="pt-2">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full relative flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-[15px] font-semibold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-orange-500/50 group overflow-hidden"
                >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <span className="relative flex items-center gap-2">
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" /> Signing in...
                            </>
                        ) : (
                            <>
                                Sign In
                                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                            </>
                        )}
                    </span>
                </button>
            </div>
        </form>
    );
}
