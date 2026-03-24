'use client';

import React from 'react';

// Custom Eye Icons
export const CustomEyeOff = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 9c0 0 4 5 8 5s8-5 8-5" />
    <path d="M12 14v4" />
    <path d="M7.75 12.25l-2.5 3.5" />
    <path d="M16.25 12.25l2.5 3.5" />
  </svg>
);

export const CustomEye = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 12c0 0 4-7 8-7s8 7 8 7-4 7-8 7-8-7-8-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);


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
    <div className="w-full max-w-md mx-auto p-8 sm:p-10 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-sm rounded-3xl shadow-2xl shadow-gray-200/50 dark:shadow-black/50 border border-gray-100 dark:border-white/10 transition-all duration-500 relative overflow-hidden">

      {/* Decorative background glows */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/15 dark:bg-orange-500/25 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-500/10 dark:bg-orange-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="text-center mb-8 relative z-10 space-y-2">
        <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-white dark:to-gray-200 bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-relaxed">
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
        <p className="text-gray-600 dark:text-gray-400 text-sm">
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
  );
}

// ----------------------------------------------------------------------
// Reusable Auth Input
// ----------------------------------------------------------------------
interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  wrapperClassName?: string;
}

export const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, icon, id, wrapperClassName = '', ...props }, ref) => {
    return (
      <div className={`flex flex-col space-y-2 ${wrapperClassName}`}>
        <label htmlFor={id} className="text-sm font-semibold text-gray-900 dark:text-gray-200">
          {label}
        </label>
        <div className="relative group">
          <input
            ref={ref}
            id={id}
            {...props}
            className={`w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border-2 transition-all duration-200 rounded-xl text-base placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none ${error
                ? 'border-red-300 dark:border-red-500/50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                : 'border-gray-200 dark:border-white/10 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10'
              } text-gray-900 dark:text-white ${icon ? 'pr-12' : ''}`}
            aria-invalid={error ? 'true' : 'false'}
          />
          {icon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-orange-500 transition-colors">
              {icon}
            </div>
          )}
        </div>
        {error && (
          <span className="text-xs font-medium text-red-600 dark:text-red-400 animate-in fade-in slide-in-from-top-1 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18.101 12.93a1 1 0 00-1.414-1.414L10 16.586l-6.687-6.687a1 1 0 00-1.414 1.414l7.394 7.394a1 1 0 001.414 0l9.394-9.394z" clipRule="evenodd" transform="rotate(45 10 10)" /></svg>
            {error}
          </span>
        )}
      </div>
    );
  }
);
AuthInput.displayName = 'AuthInput';
