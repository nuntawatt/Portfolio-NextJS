'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { LogOut, User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { useAuth } from '@/feature/auth/hook/auth';
import { AuthService } from '@/feature/auth/core/lib';

export function AuthButton() {
  const { data: session, status: nextAuthStatus } = useSession();
  const { user: localUser, isAuthenticated: isLocalAuthenticated, logout: localLogout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isLoading = nextAuthStatus === 'loading';

  // Determine user info and authenticated state
  const isUserAuthenticated = !!session?.user || isLocalAuthenticated;
  const userEmail = session?.user?.email || localUser?.email;
  const userName = session?.user?.name || (localUser ? `${localUser.firstName} ${localUser.lastName}`.trim() : '');
  const userImage = session?.user?.image || null;

  const handleSignOut = () => {
    if (session) {
      signOut();
    } else {
      AuthService.logout();
      localLogout();
    }
    setIsProfileOpen(false);
  };

  if (isUserAuthenticated) {
    return (
      <div className="relative" ref={profileRef}>
        <button
          disabled={isLoading}
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 transition duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg focus:outline-none overflow-hidden bg-white dark:bg-neutral-800 disabled:opacity-50"
          aria-expanded={isProfileOpen}
        >
          {userImage ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={userImage} alt={userName || 'User'} className="w-full h-full object-cover" />
          ) : (
            <UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          )}
        </button>

        {isProfileOpen && (
          <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-white/10 rounded-xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-3 py-2 mb-2 border-b border-gray-100 dark:border-white/5 pb-3">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {userName || 'User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                {userEmail}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-start gap-3 px-3 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors duration-300 ease-out active:scale-95"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Sign In Button: Sleek primary gradient (Swapped) */}
      <Link
        href={routes.auth.signin}
        className="transition-all duration-500 ease-out flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 border border-transparent rounded-xl transform hover:-translate-y-1 hover:scale-105 shadow-md hover:shadow-orange-500/30"
      >
        Sign In
      </Link>

      {/* Sign Up Button: Premium Dark Solid to match theme */}
      <Link
        href={routes.auth.signup}
        className="transition-all duration-500 ease-out flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white dark:text-gray-900 bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-white rounded-xl transform hover:-translate-y-1 hover:scale-105 shadow-md shadow-gray-900/20 dark:shadow-white/20"
      >
        Sign Up
      </Link>
    </div>
  );
}
