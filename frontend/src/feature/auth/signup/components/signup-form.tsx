'use client';

import { useState, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Loader2, Eye } from 'lucide-react';
import { SignUpData } from '../types';
import { AuthInput, CustomEyeOff } from '@/shared/components/auth-input';
import { useTranslation } from '@/shared/providers/LanguageProvider';

// กำหนด Props สำหรับคอมโพเนนต์ฟอร์มลงทะเบียน (SignUpForm)
interface SignUpFormProps {
    form: UseFormReturn<SignUpData>;
    onSubmit: (data: SignUpData) => void;
    isLoading: boolean;
}

// คอมโพเนนต์สำหรับแสดงความแข็งแกร่งของรหัสผ่าน (Password Strength Indicator)
function PasswordStrength({ password }: { password: string }) {
    const { t } = useTranslation();
    // คำนวณระดับความแข็งแกร่งของรหัสผ่านโดยอิงตามเกณฑ์ความปลอดภัยต่างๆ
    const strength = useMemo(() => {
        if (!password) return { score: 0, label: '', color: '' };
        let score = 0;
        if (password.length >= 6) score++;
        if (password.length >= 10) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score <= 1) return { score: 1, label: t('auth.password_strength_weak') as string, color: 'bg-red-500' };
        if (score <= 2) return { score: 2, label: t('auth.password_strength_fair') as string, color: 'bg-orange-500' };
        if (score <= 3) return { score: 3, label: t('auth.password_strength_good') as string, color: 'bg-yellow-500' };
        if (score <= 4) return { score: 4, label: t('auth.password_strength_strong') as string, color: 'bg-green-500' };
        return { score: 5, label: t('auth.password_strength_very_strong') as string, color: 'bg-emerald-500' };
    }, [password, t]);

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

// คอมโพเนนต์ฟอร์มลงทะเบียน (Sign Up) สำหรับสร้างบัญชีผู้ใช้งานใหม่
export function SignUpForm({ form, onSubmit, isLoading }: SignUpFormProps) {
    // สถานะสำหรับควบคุมการแสดงผลรหัสผ่านและยืนยันรหัสผ่าน (เปิด/ปิดตา)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    // ดึงฟังก์ชันจัดการฟอร์มและตรวจสอบค่าที่เปลี่ยนแปลงจาก React Hook Form
    const { register, handleSubmit, formState: { errors }, watch } = form;
    // ติดตามข้อมูลการพิมพ์รหัสผ่านเพื่อนำไปส่งต่อให้ตัวประเมินระดับความปลอดภัย
    const watchedPassword = watch('password') || '';
    // ดึงฟังก์ชันสำหรับการแปลภาษา
    const { t } = useTranslation();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-0" noValidate>
            {/* Name and Email Section */}
            <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <AuthInput
                        id="signup-firstname"
                        label={t('auth.firstname') as string}
                        type="text"
                        placeholder={t('auth.firstname_placeholder') as string}
                        {...register('firstName')}
                        error={errors.firstName?.message ? (t(errors.firstName.message) as string) : undefined}
                    />
                    <AuthInput
                        id="signup-lastname"
                        label={t('auth.lastname') as string}
                        type="text"
                        placeholder={t('auth.lastname_placeholder') as string}
                        {...register('lastName')}
                        error={errors.lastName?.message ? (t(errors.lastName.message) as string) : undefined}
                    />
                </div>
                <AuthInput
                    id="signup-email"
                    label={t('auth.email') as string}
                    type="email"
                    placeholder={t('auth.email_placeholder') as string}
                    {...register('email')}
                    error={errors.email?.message ? (t(errors.email.message) as string) : undefined}
                    wrapperClassName="sm:col-span-2"
                />
            </div>

            {/* Password Section */}
            <div className="space-y-5 pt-5">
                <div>
                    <AuthInput
                        id="signup-password"
                        label={t('auth.password') as string}
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
                    <PasswordStrength password={watchedPassword} />
                </div>

                <AuthInput
                    id="signup-confirmpassword"
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
            </div>

            <div className="pt-6">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer text-white text-[15px] font-semibold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" /> {t('auth.signing_up')}
                        </>
                    ) : (
                        t('auth.signup_btn')
                    )}
                </button>
            </div>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-200 dark:border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-[#111111] text-gray-500 dark:text-gray-400 font-medium">
                        {t('auth.or_continue_with')}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <a
                    href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/auth/google`}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 rounded-xl transition-colors font-medium text-sm text-gray-700 dark:text-gray-300"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Google
                </a>
                <a
                    href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/auth/github`}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 rounded-xl transition-colors font-medium text-sm text-gray-700 dark:text-gray-300"
                >
                    <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    GitHub
                </a>
            </div>
        </form>
    );
}
