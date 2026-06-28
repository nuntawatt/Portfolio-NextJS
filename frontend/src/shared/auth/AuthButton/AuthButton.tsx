'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { SignOutButton } from '@/features/auth/signOut/components/SignOutButton';
import { User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import { routes } from '@/shared/config/routes';
import { useTranslation } from '@/shared/providers/LanguageProvider';

// Stepped/Pixelated clip-path for retro border styling
const PIXEL_CLIP_PATH = "polygon(0px 4px, 4px 4px, 4px 0px, calc(100% - 4px) 0px, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0px calc(100% - 4px))";

interface AuthButtonProps {
  className?: string;
  onClose?: () => void;
}

// คอมโพเนนต์ปุ่มยืนยันตัวตน (Authentication Button) และเมนูโปรไฟล์ของผู้ใช้งาน
export function AuthButton({ className = "", onClose }: Readonly<AuthButtonProps>) {
  // ดึงข้อมูลเซสชันการเข้าสู่ระบบและสถานะ
  const { data: session, status: nextAuthStatus } = useSession();
  // สถานะเปิด/ปิดเมนู Dropdown โปรไฟล์ของผู้ใช้งาน
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // ตัวอ้างอิงตำแหน่งของเมนูโปรไฟล์ เพื่อนำไปใช้ตรวจจับการคลิกด้านนอก
  const profileRef = useRef<HTMLDivElement>(null);
  // ดึงฟังก์ชันสำหรับใช้แปลภาษา
  const { t } = useTranslation();

  // จัดการการปิดเมนู Dropdown เมื่อคลิกนอกเมนูหรือกดแป้นพิมพ์ Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isLoading = nextAuthStatus === 'loading';
  const isAuthenticated = nextAuthStatus === 'authenticated';
  
  const userEmail = session?.user?.email;
  const userName = session?.user?.name || '';
  const userImage = session?.user?.image || null;

  if (isAuthenticated && session?.user) {
    const isMobile = className.includes('flex-col');

    if (isMobile) {
      return (
        <div 
          className="w-full bg-orange-500 p-[3px] shadow-lg transition-all duration-200"
          style={{ clipPath: PIXEL_CLIP_PATH }}
        >
          <div
            className="bg-card text-card-foreground p-4 flex flex-col space-y-3.5"
            style={{ clipPath: PIXEL_CLIP_PATH }}
          >
            {/* User Profile Header */}
            <div className="flex items-center gap-3 border-b border-dashed border-gray-200 dark:border-white/10 pb-3 select-none">
              <div className="relative w-11 h-11 rounded-full border border-gray-200 dark:border-white/10 overflow-hidden bg-white dark:bg-neutral-800 flex-shrink-0 flex items-center justify-center">
                {userImage ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={userImage} alt={userName || 'User'} className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate font-mono uppercase tracking-tight">
                  {userName || 'User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                  {userEmail}
                </p>
              </div>
            </div>

            {/* Sign Out Button (Mobile view) */}
            <SignOutButton variant="mobile" onSignOut={() => setIsProfileOpen(false)} />
          </div>
        </div>
      );
    }

    return (
      <div className={`relative ${className}`} ref={profileRef}>
        {/* Circular Avatar Button */}
        <button
          disabled={isLoading}
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          aria-haspopup="menu"
          aria-expanded={isProfileOpen}
          className={`relative w-10 h-10 rounded-full border transition-all duration-200 focus:outline-none overflow-hidden bg-white dark:bg-neutral-800 disabled:opacity-50 cursor-pointer flex items-center justify-center ${
            isProfileOpen 
              ? 'ring-2 ring-orange-500 border-transparent scale-105 shadow-md shadow-orange-500/20' 
              : 'border-gray-200 dark:border-white/10 hover:border-orange-500/50 hover:scale-105'
          }`}
        >
          {userImage ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={userImage} alt={userName || 'User'} className="w-full h-full object-cover" />
          ) : (
            <UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          )}
        </button>

        {/* Pixel Dropdown Menu */}
        {isProfileOpen && (
          <div className="absolute right-0 mt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            {/* Retro Pixel-Style Arrow pointing to avatar */}
            <svg 
              width="10" 
              height="5" 
              viewBox="0 0 10 5" 
              className="absolute right-[15px] -top-[5px] text-orange-500 select-none pointer-events-none"
              shapeRendering="crispEdges"
            >
              <path d="M4 0h2v1H4zm-1 1h4v1H3zm-1 1h6v1H2zm-1 1h8v1H1zm-1 1h10v1H0z" fill="currentColor" />
            </svg>

            <div
              role="menu"
              className="w-56 bg-orange-500 p-[3px] shadow-2xl"
              style={{ clipPath: PIXEL_CLIP_PATH }}
            >
              <div
                className="bg-card text-card-foreground p-4 flex flex-col space-y-3"
                style={{ clipPath: PIXEL_CLIP_PATH }}
              >
                <div className="px-1 py-1 border-b border-dashed border-gray-200 dark:border-white/10 pb-3 select-none">
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate font-mono uppercase tracking-tight">
                    {userName || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                    {userEmail}
                  </p>
                </div>
                {/* Sign Out Button (Desktop view) */}
                <SignOutButton variant="desktop" onSignOut={() => setIsProfileOpen(false)} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-stretch lg:items-center gap-3 w-full lg:w-auto ${className}`}>
      {/* Sign In Button: Sleek primary gradient (Swapped) */}
      <Link
        href={routes.auth.signin}
        onClick={onClose}
        className="flex-1 lg:flex-none transition-all duration-200 ease-out flex items-center justify-center px-4 lg:px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 border border-transparent rounded-xl shadow-md hover:shadow-orange-500/10 whitespace-nowrap"
      >
        {t('nav.signin')}
      </Link>

      {/* Sign Up Button: Premium Dark Solid to match theme */}
      <Link
        href={routes.auth.signup}
        onClick={onClose}
        className="flex-1 lg:flex-none transition-all duration-200 ease-out flex items-center justify-center px-4 lg:px-5 py-2.5 text-sm font-semibold text-white dark:text-gray-900 bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-white rounded-xl shadow-md shadow-gray-900/10 dark:shadow-white/10 whitespace-nowrap"
      >
        {t('nav.signup')}
      </Link>
    </div>
  );
}
