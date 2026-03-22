import React, { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export function Card({ children, hoverEffect = false, className = '', ...props }: CardProps) {
  const baseStyles = 'bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm';
  
  const hoverStyles = hoverEffect 
    ? 'transition duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/10 hover:border-orange-500/30 cursor-pointer' 
    : 'transition-colors duration-300 ease-out';

  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`} {...props}>
      {children}
    </div>
  );
}
