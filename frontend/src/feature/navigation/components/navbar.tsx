'use client';

import React, { useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/shared/components/theme';
import { AuthButton } from '@/shared/components/auth-btn';
import { AudioToggle } from '@/feature/audio';
import { LanguageToggle } from '@/shared/components/language-toggle';
import { useTranslation } from '@/shared/providers/LanguageProvider';
import { routes } from '@/config/routes';
import { cn } from '@/shared/lib/utils';
import {
  useTimeoutCleanup,
  useBodyScrollLock,
  useEscapeKey,
  useActiveSectionObserver,
} from '../hooks/use-navbar';

// --- Sub-Components ---

interface NavLinkProps {
  name: string;
  href: string;
  isActive: boolean;
  onClick: () => void;
}

// คอมโพเนนต์ลิงก์เดี่ยวของแถบนำทาง พร้อมเส้นใต้เคลื่อนไหว
function NavLink({ name, href, isActive, onClick }: NavLinkProps) {
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

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ name: string; href: string }>;
  activeLink: string;
  onLinkClick: (href: string) => void;
  t: (key: string) => string;
}

// คอมโพเนนต์เมนูดึงสไลด์สำหรับหน้าจอมือถือ
function MobileMenu({ isOpen, onClose, navLinks, activeLink, onLinkClick, t }: MobileMenuProps) {
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
        aria-label={t('nav.drawer_label')}
      >
        {/* หัวเมนู พร้อมโลโก้และปุ่มปิด */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <span className="text-2xl font-bold text-foreground tracking-tighter" style={{ fontFamily: 'var(--font-logo)' }}>
            Mor<span className="text-orange-500">gorn</span>
          </span>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-muted-foreground hover:bg-secondary rounded-md transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            aria-label={t('nav.close_menu')}
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

// --- Main Navbar Component ---

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>('');
  const isClickScrolling = useRef(false);
  const clickScrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const pathname = usePathname();
  const { t } = useTranslation();
  const activeLink = pathname === '/contact' ? routes.contact : activeHash;

  const navLinks = [
    { name: t('nav.home') as string, href: routes.home },
    { name: t('nav.about') as string, href: routes.about },
    { name: t('nav.skills') as string, href: routes.skills },
    { name: t('nav.contact') as string, href: routes.contact },
  ];

  // เรียกใช้งาน Custom Hooks จากโฟลเดอร์ hook
  useTimeoutCleanup(clickScrollTimeout);
  useBodyScrollLock(isOpen);
  useEscapeKey(() => setIsOpen(false), isOpen);
  useActiveSectionObserver(['home', 'about', 'skills'], pathname, isClickScrolling, setActiveHash);

  // ควบคุมการคลิกข้าม Section ป้องกันการเลื่อนสมูทแย่งสถานะ Active ระหว่างทาง
  const handleLinkClick = (href: string) => {
    setActiveHash(href);
    setIsOpen(false);
    isClickScrolling.current = true;
    
    if (clickScrollTimeout.current) {
      clearTimeout(clickScrollTimeout.current);
    }
    clickScrollTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 1000);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4 lg:gap-8">
            
            {/* โลโก้แบรนด์ */}
            <div className="flex-shrink-0 flex items-center">
              <a href={routes.home} className="text-2xl font-bold text-foreground tracking-tighter transition-colors" style={{ fontFamily: 'var(--font-logo)' }}>
                Mor<span className="text-orange-500">gorn</span>
              </a>
            </div>

            {/* ส่วนจัดแสดงเมนู Desktop */}
            <div className="hidden lg:flex flex-1 items-center justify-center">
              <div className="flex items-center justify-center space-x-6 xl:space-x-8">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    name={link.name}
                    href={link.href}
                    isActive={activeLink === link.href}
                    onClick={() => handleLinkClick(link.href)}
                  />
                ))}
              </div>
            </div>

            {/* ส่วนขวาของแถบนำทาง (ท็อกเกิลการตั้งค่า และปุ่มเปิดลิ้นชักมือถือ) */}
            <div className="flex-shrink-0 flex justify-end items-center gap-3 xl:gap-4">
              <div className="hidden lg:flex items-center gap-5 xl:gap-6">
                <AudioToggle />
                <ThemeToggle />
                <AuthButton />
                <LanguageToggle className="lg:ml-2" />
              </div>

               <div className="-mr-2 flex items-center lg:hidden">
                <button
                  onClick={() => setIsOpen(true)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary focus:outline-none transition-all duration-200 active:scale-95"
                  aria-expanded={isOpen}
                  aria-controls="mobile-menu-drawer"
                  aria-label={(isOpen ? t('nav.close_menu') : t('nav.open_menu')) as string}
                >
                  <span className="sr-only">{t('nav.open_menu')}</span>
                  <Menu className="block h-6 w-6" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </nav>

      {/* เลย์เอาต์เมนูบนหน้าจอมือถือ */}
      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navLinks={navLinks}
        activeLink={activeLink}
        onLinkClick={handleLinkClick}
        t={t}
      />
    </>
  );
}
