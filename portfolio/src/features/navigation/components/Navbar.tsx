'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { AuthButton } from '@/shared/components/AuthButton';
import { routes } from '@/config/routes';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>(routes.home);

  const navLinks = [
    { name: 'Home', href: routes.home },
    { name: 'About', href: routes.about },
    { name: 'Skills', href: routes.skills },
    { name: 'Projects', href: routes.projects },
    { name: 'Contact', href: routes.contact },
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

  const handleLinkClick = (href: string) => {
    setActiveHash(href);
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-white/10 transition-colors duration-300 shadow-sm dark:shadow-none">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href={routes.home} className="text-2xl font-bold text-gray-900 dark:text-white tracking-tighter transition-colors">
                Mor<span className="text-orange-500 drop-shadow-sm">gorn</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center ml-10 space-x-8">
              <div className="flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setActiveHash(link.href)}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 group ${activeHash === link.href
                        ? 'text-orange-600 dark:text-orange-500'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                  >
                    {link.name}
                    {/* Animated Underline Effect */}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] w-full bg-orange-500 rounded-full transition-all duration-300 ease-out origin-center ${activeHash === link.href
                          ? 'opacity-100 scale-x-100'
                          : 'opacity-0 scale-x-0 group-hover:opacity-50 group-hover:scale-x-75'
                        }`}
                    ></span>
                  </a>
                ))}
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <ThemeToggle />
              <AuthButton />
            </div>

            {/* Mobile Menu Trigger */}
            <div className="-mr-2 flex items-center lg:hidden">
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 focus:outline-none transition-all duration-200 active:scale-95"
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
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300 ease-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Drawer (Slide-in from left) */}
      <div
        id="mobile-menu-drawer"
        className={`fixed top-0 left-0 h-full w-[280px] bg-white dark:bg-[#0a0a0a] shadow-2xl z-50 lg:hidden transform flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Drawer"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/10">
          <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tighter">
            Mor<span className="text-orange-500">gorn</span>
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 -mr-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 rounded-md transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            aria-label="Close menu drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col">
          <div className="flex flex-col space-y-1.5 mb-auto">
            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 px-3">
              Navigation
            </span>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-base font-medium px-4 py-3 rounded-xl transition-all duration-200 active:scale-95 ${activeHash === link.href
                    ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                  }`}
                onClick={() => handleLinkClick(link.href)}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-8 mt-8 border-t border-gray-100 dark:border-white/10 flex flex-col gap-6">
            <div className="flex items-center justify-between px-2">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Theme Preference</span>
              <ThemeToggle />
            </div>

            {/* Highlighted Mobile CTA Wrapper */}
            <div className="mt-2" onClick={() => setIsOpen(false)}>
              <AuthButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
