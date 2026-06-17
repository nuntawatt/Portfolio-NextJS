import React, { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export function Card({ children, hoverEffect = false, className = '', ...props }: CardProps) {
  const baseStyles = 'bg-card border border-border rounded-2xl p-6 shadow-sm';
  
  const hoverStyles = hoverEffect 
    ? 'transition-all duration-300 hover:shadow-md dark:hover:shadow-orange-500/5 hover:border-foreground/25 cursor-pointer' 
    : 'transition-all duration-300';

  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`} {...props}>
      {children}
    </div>
  );
}
