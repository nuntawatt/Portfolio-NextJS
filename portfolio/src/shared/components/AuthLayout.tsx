'use client';

import React from 'react';

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
    <div className="w-full max-w-md mx-auto relative">
      {/* Main card */}
      <div className="relative p-8 sm:p-10 bg-white/95 dark:bg-[#111111]/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-200/50 dark:shadow-black/50 border border-gray-100 dark:border-white/10 transition-all duration-500 overflow-hidden">

        {/* Decorative background glows */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/10 dark:bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Animated top border accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-60" />

        <div className="text-center mb-8 relative z-10 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-white dark:to-gray-200 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed">
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

        {/* Divider with "or" */}
        <div className="relative my-8 z-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-[#111111] px-3 text-gray-400 dark:text-gray-500 font-medium tracking-wider">
              or continue with
            </span>
          </div>
        </div>

        {/* Social login buttons */}
        <div className="flex gap-3 relative z-10">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border-2 border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-200 group"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.105 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">GitHub</span>
          </button>
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border-2 border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-200 group"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Google</span>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/10 text-center relative z-10">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {footerText}{' '}
            <button
              onClick={onFooterAction}
              className="font-semibold text-orange-600 dark:text-orange-500 hover:text-orange-700 dark:hover:text-orange-400 transition-colors focus:outline-none focus:underline rounded-sm group"
            >
              <span className="group-hover:underline">{footerActionText}</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
