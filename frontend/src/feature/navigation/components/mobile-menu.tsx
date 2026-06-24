'use client';

import React from 'react';
import { X } from 'lucide-react';
import { ThemeToggle } from '@/feature/theme';
import { AuthButton } from '@/shared/auth/auth-btn';
import { AudioToggle } from '@/feature/audio';
import { LanguageToggle } from '@/shared/components/language-toggle';
import { cn } from '@/shared/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ name: string; href: string }>;
  activeLink: string;
  onLinkClick: (href: string) => void;
  t: (key: string) => string | string[];
}

// คอมโพเนนต์เมนูดึงสไลด์สำหรับหน้าจอมือถือ
export function MobileMenu({ isOpen, onClose, navLinks, activeLink, onLinkClick, t }: MobileMenuProps) {
  return (
    <>
      {/* ม่านดาร์กฉากหลังเมื่อกดเปิดเมนูมือถือ */}
      <div
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300 ease-out",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ลิ้นชักเลย์เอาต์เมนูมือถือ */}
      <div
        id="mobile-menu-drawer"
        className={cn(
          "fixed top-0 right-0 h-full w-[280px] bg-card border-l border-border shadow-2xl z-50 lg:hidden transform flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label={t('nav.drawer_label') as string}
      >
        {/* หัวเมนู พร้อมโลโก้และปุ่มปิด */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <span className="text-2xl font-bold text-foreground tracking-tighter" style={{ fontFamily: 'var(--font-logo)' }}>
            Mor<span className="text-orange-500">gorn</span>
          </span>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-muted-foreground hover:bg-secondary rounded-md transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            aria-label={t('nav.close_menu') as string}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* รายการลิงก์และปุ่มฟังก์ชันปรับสไตล์ */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col">
          <div className="flex flex-col space-y-1.5 mb-auto">
            <span className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider mb-2 px-3">
              {t('nav.navigation')}
            </span>
            {navLinks.map((link) => {
              const isActive = activeLink === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-base font-medium px-4 py-3 rounded-xl transition-all duration-200 active:scale-95",
                    isActive
                      ? "bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                  onClick={() => onLinkClick(link.href)}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="pt-8 mt-8 border-t border-border flex flex-col gap-6">
            <div className="flex items-center justify-between px-2">
              <span className="text-sm font-semibold text-muted-foreground">{t('nav.language')}</span>
              <LanguageToggle />
            </div>

            <div className="flex items-center justify-between px-2">
              <span className="text-sm font-semibold text-muted-foreground">{t('nav.music')}</span>
              <AudioToggle />
            </div>
            
            <div className="flex items-center justify-between px-2">
              <span className="text-sm font-semibold text-muted-foreground">{t('nav.theme')}</span>
              <ThemeToggle />
            </div>

            <div className="mt-2" onClick={onClose}>
              <AuthButton className="flex-col" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
