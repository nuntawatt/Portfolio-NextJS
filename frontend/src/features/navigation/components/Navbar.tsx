'use client';

import React, { useState, useRef, useMemo, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { ThemeToggle } from '@/features/theme';
import { AuthButton } from '@/shared/auth/AuthButton';
import { AudioToggle } from '@/features/audio';
import { LanguageToggle } from '@/shared/ui';
import { useTranslation } from '@/shared/providers/LanguageProvider';
import { routes } from '@/shared/config/routes';
import { NavLink } from './NavLink';
import { MobileMenu } from './MobileMenu';
import {
  smoothScrollToElement,
  useTimeoutCleanup,
  useBodyScrollLock,
  useEscapeKey,
  useActiveSectionObserver,
} from '../hooks/useNavbar';

// Stable reference - ป้องกัน useEffect teardown/setup ซ้ำทุก render
const OBSERVED_SECTIONS = ['home', 'about', 'skills'];

// --- Main Navbar Component ---

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>('');
  const isClickScrolling = useRef(false);
  const clickScrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const pathname = usePathname();
  const { t } = useTranslation();
  const activeLink = pathname === '/contact' ? routes.contact : activeHash;

  const navLinks = useMemo(() => [
    { name: t('nav.home') as string, href: routes.home },
    { name: t('nav.about') as string, href: routes.about },
    { name: t('nav.skills') as string, href: routes.skills },
    { name: t('nav.contact') as string, href: routes.contact },
  ], [t]);

  // เรียกใช้งาน Custom Hooks จากโฟลเดอร์ hook
  useTimeoutCleanup(clickScrollTimeout);
  useBodyScrollLock(isOpen);

  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleOpen = useCallback(() => setIsOpen(true), []);

  useEscapeKey(handleClose, isOpen);
  useActiveSectionObserver(OBSERVED_SECTIONS, pathname, isClickScrolling, setActiveHash);

  // [FIX] ดัก e.preventDefault() สำหรับ hash link เพื่อ bypass Next.js Router
  // แล้วสั่ง scrollIntoView เอง + อัปเดต URL ด้วย history.pushState
  const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isHashLink = href.startsWith('/#');

    if (isHashLink && pathname === '/') {
      e.preventDefault();

      setActiveHash(href);
      setIsOpen(false);
      isClickScrolling.current = true;

      const targetId = href.replace('/#', '');
      const el = document.getElementById(targetId);
      if (el) {
        smoothScrollToElement(el);
      }

      // อัปเดต URL โดยไม่ trigger Next.js Router
      window.history.pushState(null, '', href);

      if (clickScrollTimeout.current) {
        clearTimeout(clickScrollTimeout.current);
      }
      clickScrollTimeout.current = setTimeout(() => {
        isClickScrolling.current = false;
      }, 600);
    } else {
      // ลิงก์ข้ามหน้า (เช่น /contact) ปล่อยให้ทำงานปกติ
      setIsOpen(false);
    }
  }, [pathname]);

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
                    onClick={handleLinkClick}
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
                  onClick={handleOpen}
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
        onClose={handleClose}
        navLinks={navLinks}
        activeLink={activeLink}
        onLinkClick={handleLinkClick}
        t={t}
      />
    </>
  );
}
