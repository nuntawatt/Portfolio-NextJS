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
    const { register, handleSubmit, formState: { errors, isValid } } = form;

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

            <div className="pt-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 dark:from-orange-500 dark:to-orange-600 dark:hover:from-orange-600 dark:hover:to-orange-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-[15px] font-semibold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-orange-500/50 group"
                >
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
                </button>
            </div>
        </form>
    );
}
