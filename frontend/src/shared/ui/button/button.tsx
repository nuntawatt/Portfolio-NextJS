'use client';

import React, { ButtonHTMLAttributes } from 'react';

// อินเตอร์เฟซสำหรับ Props ของคอมโพเนนต์ Button
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

// คอมโพเนนต์ปุ่มอเนกประสงค์ (Button Component) ที่รองรับหลากหลายดีไซน์ (variant)
export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  // สไตล์พื้นฐานของปุ่ม ทุกแบบจะใช้ร่วมกัน
  const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 shadow-sm cursor-pointer';
  
  const variants = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-md hover:shadow-orange-500/10',
    outline: 'border border-border text-foreground hover:bg-secondary dark:hover:bg-white/5 hover:border-foreground/30 bg-transparent hover:shadow-sm',
    ghost: 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 bg-transparent hover:shadow-none',
  };

  const sizes = 'px-6 py-3 text-sm md:text-base';

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes} ${className}`} {...props}>
      {children}
    </button>
  );
}
