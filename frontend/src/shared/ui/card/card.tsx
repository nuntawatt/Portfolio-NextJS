import React, { HTMLAttributes } from 'react';

// อินเตอร์เฟซสำหรับ Props ของคอมโพเนนต์ Card
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

// คอมโพเนนต์การ์ดเนื้อหา (Card Component) ใช้แสดงบล็อกข้อมูล พร้อมตัวเลือกเอฟเฟกต์โฮเวอร์ (Hover Effect)
export function Card({ children, hoverEffect = false, className = '', ...props }: Readonly<CardProps>) {
  // สไตล์พื้นฐานสำหรับการ์ด
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
