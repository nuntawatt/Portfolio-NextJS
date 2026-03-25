'use client';

import React, { useState, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Loader2, Eye } from 'lucide-react';
import { SignUpData } from '../core/types';
import { AuthInput, CustomEyeOff } from '@/shared/components/AuthInput';

interface SignUpFormProps {
    form: UseFormReturn<SignUpData>;
    onSubmit: (data: SignUpData) => void;
    isLoading: boolean;
}

function PasswordStrength({ password }: { password: string }) {
    const strength = useMemo(() => {
        if (!password) return { score: 0, label: '', color: '' };
        let score = 0;
        if (password.length >= 6) score++;
        if (password.length >= 10) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-red-500' };
        if (score <= 2) return { score: 2, label: 'Fair', color: 'bg-orange-500' };
        if (score <= 3) return { score: 3, label: 'Good', color: 'bg-yellow-500' };
        if (score <= 4) return { score: 4, label: 'Strong', color: 'bg-green-500' };
        return { score: 5, label: 'Very Strong', color: 'bg-emerald-500' };
    }, [password]);

    if (!password) return null;

    return (
        <div className="mt-2 space-y-1.5">
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            i <= strength.score ? strength.color : 'bg-gray-200 dark:bg-white/10'
                        }`}
                    />
                ))}
            </div>
            <p className={`text-xs font-medium transition-colors ${
                strength.score <= 1 ? 'text-red-500' :
                strength.score <= 2 ? 'text-orange-500' :
                strength.score <= 3 ? 'text-yellow-600 dark:text-yellow-500' :
                'text-green-600 dark:text-green-500'
            }`}>
                {strength.label}
            </p>
        </div>
    );
}

export function SignUpForm({ form, onSubmit, isLoading }: SignUpFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = form;
    const watchedPassword = watch('password') || '';

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-0" noValidate>
            {/* Name and Email Section */}
            <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <AuthInput
                        id="signup-firstname"
                        label="First name"
                        type="text"
                        placeholder="John"
                        {...register('firstName')}
                        error={errors.firstName?.message}
                    />
                    <AuthInput
                        id="signup-lastname"
                        label="Last name"
                        type="text"
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
                    wrapperClassName="sm:col-span-2"
                />
            </div>

            {/* Password Section */}
            <div className="space-y-5 pt-5">
                <div>
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
                                className="transition-colors focus:outline-none text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <Eye className="w-5 h-5" /> : <CustomEyeOff className="w-5 h-5" />}
                            </button>
                        }
                    />
                    <PasswordStrength password={watchedPassword} />
                </div>

                <AuthInput
                    id="signup-confirmpassword"
                    label="Confirm password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('confirmPassword')}
                    error={errors.confirmPassword?.message}
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
            </div>

            <div className="pt-6">
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
                                <Loader2 className="w-5 h-5 animate-spin" /> Creating account...
                            </>
                        ) : (
                            <>
                                Create Account
                                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                            </>
                        )}
                    </span>
                </button>
            </div>
        </form>
    );
}
