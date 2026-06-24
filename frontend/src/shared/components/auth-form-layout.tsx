'use client';

import React from 'react';

// อินเตอร์เฟซสำหรับ Props ของคอมโพเนนต์ AuthFormLayout
interface AuthFormLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerText: string;
  footerActionText: string;
  onFooterAction: () => void;
  error?: string | null;
  successMsg?: string | null;
}

// คอมโพเนนต์เลย์เอาต์สำหรับกล่องฟอร์มยืนยันตัวตน (Authentication Form Card Layout)
// รองรับการแสดงหัวข้อ, รายละเอียด, กล่องข้อความผิดพลาด/สำเร็จ และลิงก์การนำทางด้านล่าง
export function AuthFormLayout({
  title,
  subtitle,
  children,
  footerText,
  footerActionText,
  onFooterAction,
  error,
  successMsg,
}: AuthFormLayoutProps) {
  return (
    <div className="w-full max-w-[480px] mx-auto relative">
      {/* Main card */}
      <div className="relative p-8 sm:p-10 bg-white/95 dark:bg-[#111111]/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-200/50 dark:shadow-black/50 border border-gray-100 dark:border-white/10 transition-all duration-500 overflow-hidden">

        {/* Decorative background glows */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-50/10 dark:bg-orange-50/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-50/5 dark:bg-orange-50/10 rounded-full blur-3xl pointer-events-none" />

        {/* Animated top border accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-60" />

        <div className="text-center mb-8 relative z-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-white dark:to-gray-200 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed sm:whitespace-nowrap">
            {subtitle}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400 text-sm font-medium animate-in fade-in zoom-in-95 relative z-10 flex items-center gap-3">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-400 text-sm font-medium animate-in fade-in zoom-in-95 relative z-10 flex items-center gap-3">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            <span>{successMsg}</span>
          </div>
        )}

        <div className="relative z-10">{children}</div>

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/10 text-center relative z-10">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {footerText}{' '}
            <button
              onClick={onFooterAction}
              className="font-semibold text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 transition-colors focus:outline-none cursor-pointer rounded-sm"
            >
              {footerActionText}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
