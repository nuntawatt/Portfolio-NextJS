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
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            {error}
          </span>
        )}
      </div>
    );
  }
);
AuthInput.displayName = 'AuthInput';
