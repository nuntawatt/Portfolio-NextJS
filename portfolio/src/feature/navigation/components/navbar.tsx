'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/shared/components/theme';
import { AuthButton } from '@/shared/components/auth-btn';
import { AudioToggle } from '@/feature/audio';
import { LanguageToggle } from '@/shared/components/language-toggle';
import { useTranslation } from '@/shared/providers/LanguageProvider';
import { routes } from '@/config/routes';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>('');
  const pathname = usePathname();
  const { t } = useTranslation();

  const activeLink = pathname === '/contact' ? routes.contact : activeHash;

  const navLinks = [
    { name: t('nav.home'), href: routes.home },
    { name: t('nav.about'), href: routes.about },
    { name: t('nav.skills'), href: routes.skills },
    { name: t('nav.contact'), href: routes.contact },
  ];

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key to dismiss the mobile drawer
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  // Handle active section detection using IntersectionObserver to prevent layout thrashing
  useEffect(() => {
    if (pathname === '/contact') {
      return;
    }

    const sections = ['home', 'about', 'skills'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`/#${entry.target.id}`);
          }
        });
      },
      {
        // Highlight active link when section occupies the upper-middle region of the viewport
        rootMargin: '-30% 0px -65% 0px',
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  const handleLinkClick = (href: string) => {
    setActiveHash(href);
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4 lg:gap-8">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href={routes.home} className="text-2xl font-bold text-foreground tracking-tighter transition-colors" style={{ fontFamily: 'var(--font-logo)' }}>
                Mor<span className="text-orange-500">gorn</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1 items-center justify-center">
              <div className="flex items-center justify-center space-x-6 xl:space-x-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name as string}
                    href={link.href}
                    onClick={() => setActiveHash(link.href)}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 group ${activeLink === link.href
                        ? 'text-orange-600 dark:text-orange-500'
                        : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    {link.name}
                    {/* Animated Underline Effect */}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] w-full bg-orange-500 rounded-full transition-all duration-300 ease-out origin-center ${activeLink === link.href
                          ? 'opacity-100 scale-x-100'
                          : 'opacity-0 scale-x-0 group-hover:opacity-50 group-hover:scale-x-75'
                        }`}
                    ></span>
                  </a>
                ))}
              </div>
            </div>

            {/* Actions & Mobile Menu Trigger */}
            <div className="flex-shrink-0 flex justify-end items-center gap-3 xl:gap-4">
              <div className="hidden lg:flex items-center gap-3 xl:gap-4">
                <AudioToggle />
                <ThemeToggle />
                <AuthButton />
                <LanguageToggle />
              </div>

              <div className="-mr-2 flex items-center lg:hidden">
                <button
                  onClick={() => setIsOpen(true)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary focus:outline-none transition-all duration-200 active:scale-95"
                  aria-expanded={isOpen}
                  aria-controls="mobile-menu-drawer"
                  aria-label={isOpen ? "Close main menu" : "Open main menu"}
                >
                  <span className="sr-only">Open main menu</span>
                  <Menu className="block h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300 ease-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Drawer (Slide-in from right) */}
      <div
        id="mobile-menu-drawer"
        className={`fixed top-0 right-0 h-full w-[280px] bg-card border-l border-border shadow-2xl z-50 lg:hidden transform flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Drawer"
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <span className="text-2xl font-bold text-foreground tracking-tighter" style={{ fontFamily: 'var(--font-logo)' }}>
            Mor<span className="text-orange-500">gorn</span>
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 -mr-2 text-muted-foreground hover:bg-secondary rounded-md transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            aria-label="Close menu drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col">
          <div className="flex flex-col space-y-1.5 mb-auto">
            <span className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider mb-2 px-3">
              {t('nav.navigation')}
            </span>
            {navLinks.map((link) => (
               <a
                key={link.name as string}
                href={link.href}
                className={`text-base font-medium px-4 py-3 rounded-xl transition-all duration-200 active:scale-95 ${activeLink === link.href
                    ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                onClick={() => handleLinkClick(link.href)}
              >
                {link.name}
              </a>
            ))}
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

            {/* Highlighted Mobile CTA Wrapper */}
            <div className="mt-2" onClick={() => setIsOpen(false)}>
              <AuthButton className="flex-col" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
