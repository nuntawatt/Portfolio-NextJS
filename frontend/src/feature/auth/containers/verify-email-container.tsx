'use client';

import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { AuthPageLayout } from '@/shared/components/auth-page-layout';
import { routes } from '@/config/routes';
import Link from 'next/link';
import { useVerifyEmail } from '../hooks/use-verify-email';
import { LoadingCard } from '@/shared/components/loading/loading-card';

// คอนเทนเนอร์หลักสำหรับหน้าตรวจสอบยืนยันอีเมล (Verify Email Container)
export function VerifyEmailContainer() {
  // ดึงสถานะผลลัพธ์ (status) และข้อความแจ้งเตือน (message) จาก custom hook สำหรับการยืนยันอีเมล
  const { status, message } = useVerifyEmail();

  return (
    <AuthPageLayout>
      <div className="w-full max-w-[480px] p-8 bg-white dark:bg-[#1a1a1a] rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-black/50 border border-gray-100 dark:border-white/10 text-center relative overflow-hidden">
        
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {status === 'loading' && (
            <LoadingCard 
              flat 
              title="Verifying Email" 
              subtitle={message || "Please wait"} 
            />
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Email Verified!</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">{message}</p>
              
              <Link 
                href={routes.auth.signin}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 cursor-pointer text-white text-[15px] font-semibold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              >
                Go to Sign In
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-6">
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Verification Failed</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">{message}</p>
              
              <Link 
                href={routes.auth.signup}
                className="text-sm font-semibold text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                Back to Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </AuthPageLayout>
  );
}
