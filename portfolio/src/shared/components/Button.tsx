import React, { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] shadow-sm cursor-pointer';
  
  const variants = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/10',
    outline: 'border-2 border-orange-500/50 text-orange-600 dark:text-orange-500 hover:bg-orange-500/10 hover:border-orange-500 bg-transparent hover:shadow-lg hover:shadow-orange-500/10',
    ghost: 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 bg-transparent hover:shadow-none hover:-translate-y-0 hover:scale-100',
  };

  const sizes = 'px-6 py-3 text-sm md:text-base';

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes} ${className}`} {...props}>
      {children}
    </button>
  );
}
