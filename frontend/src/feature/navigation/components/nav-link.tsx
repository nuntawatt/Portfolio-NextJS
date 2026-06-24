'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';

interface NavLinkProps {
  name: string;
  href: string;
  isActive: boolean;
  onClick: () => void;
}

// คอมโพเนนต์ลิงก์เดี่ยวของแถบนำทาง พร้อมเส้นใต้เคลื่อนไหว
export function NavLink({ name, href, isActive, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "relative px-3 py-2 text-sm font-medium transition-colors duration-200 group",
        isActive ? "text-orange-600 dark:text-orange-500" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {name}
      <span
        className={cn(
          "absolute left-0 -bottom-1 h-[2px] w-full bg-orange-500 rounded-full transition-all duration-300 ease-out origin-center",
          isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-50 group-hover:scale-x-75"
        )}
      />
    </a>
  );
}
