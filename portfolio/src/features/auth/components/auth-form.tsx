'use client';

import React from 'react';

// ----------------------------------------------------------------------
// AuthForm Layout Wrapper
// ----------------------------------------------------------------------
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
    <div className="w-full max-w-md mx-auto p-8 sm:p-10 bg-white dark:bg-[#0a0a0a] rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-white/10 transition-all duration-500 relative overflow-hidden">

      {/* Decorative background glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/10 dark:bg-orange-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="text-center mb-8 relative z-10">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {title}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm font-medium">
          {subtitle}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 text-sm font-medium animate-in fade-in zoom-in-95 relative z-10">
          {error}
        </div>
      )}

      {successMsg && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400 text-sm font-medium animate-in fade-in zoom-in-95 relative z-10 flex items-center gap-2">
          {successMsg}
        </div>
      )}

      <div className="relative z-10">{children}</div>

      <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/10 text-center relative z-10">
        <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
          {footerText}{' '}
          <button
            onClick={onFooterAction}
            className="text-orange-600 dark:text-orange-500 hover:text-orange-700 dark:hover:text-orange-400 font-semibold transition-colors focus:outline-none focus:underline rounded-sm"
          >
            {footerActionText}
          </button>
        </p>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Reusable Auth Input
// ----------------------------------------------------------------------
interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, icon, id, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1.5">
        <label htmlFor={id} className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={id}
            {...props}
            className={`w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border ${error
              ? 'border-red-500 focus:ring-red-500/20'
              : 'border-gray-200 dark:border-white/10 focus:border-orange-500 focus:ring-orange-500/20'
              } rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 transition-all duration-200 ${icon ? 'pr-12' : ''
              }`}
            aria-invalid={error ? 'true' : 'false'}
          />
          {icon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
        </div>
        {error && (
          <span className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
            {error}
          </span>
        )}
      </div>
    );
  }
);
AuthInput.displayName = 'AuthInput';
