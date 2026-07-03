'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/shared/config/site';
import { useTranslation } from '@/shared/providers/LanguageProvider';

// อินเตอร์เฟซสำหรับ Props ของหน้าเลย์เอาต์ระบบยืนยันตัวตน
interface AuthPageLayoutProps {
  children: React.ReactNode;
}

// คอมโพเนนต์เลย์เอาต์หลักของหน้าระบบเข้าสู่ระบบ / สมัครสมาชิก (Authentication Layout)
// แสดงข้อมูลแบรนดิ้งที่ฝั่งซ้าย (เฉพาะหน้าจอขนาดใหญ่) และแสดงฟอร์มกรอกข้อมูลที่ฝั่งขวา
export function AuthPageLayout({ children }: Readonly<AuthPageLayoutProps>) {
  // ดึงฟังก์ชันสำหรับจัดการแปลภาษา
  const { t } = useTranslation();

  return (
    <main className="min-h-screen flex overflow-hidden relative w-full">
      {/* Absolute Back Button */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50">
        <Link 
          href="/" 
          className="group flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-md text-xs sm:text-sm font-semibold transition-all duration-200 
                     text-gray-700 bg-gray-100/80 hover:bg-gray-200 border border-gray-200/50 
                     dark:text-gray-200 dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/10
                     lg:text-white lg:bg-white/10 lg:hover:bg-white/20 lg:border-white/20 lg:dark:bg-white/10 lg:dark:hover:bg-white/20"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t('auth.back_to_home')}
        </Link>
      </div>

      {/* ── Left branding panel (hidden on mobile) ── */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-orange-50/20 dark:bg-orange-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-orange-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-400/10 rounded-full blur-[150px] pointer-events-none" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: [
              'linear-gradient(rgba(249,115,22,0.05) 1px, transparent 1px)',
              'linear-gradient(90deg, rgba(249,115,22,0.05) 1px, transparent 1px)',
            ].join(', '),
            backgroundSize: '40px 40px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-md px-12 text-center">
          {/* Mascot Welcome Gif */}
          <div className="relative w-48 h-48 mx-auto overflow-hidden rounded-3xl border border-white/10 shadow-2xl mb-8 bg-zinc-900/50">
            <Image
              src={siteConfig.animations.welcome}
              alt="Welcome Mascot"
              fill
              className="object-cover"
              unoptimized
              priority
            />
          </div>

          <h1 className="text-4xl font-black text-white mb-4 tracking-tight">
            {t('auth.welcome')}{' '}
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              Morgorn
            </span>
          </h1>

          <p className="text-gray-400 text-base leading-relaxed mb-10">
            {t('auth.description')}
          </p>

          {/* Feature highlights */}
          <div className="space-y-4 text-left">
            {[
              { text: t('auth.feature1') as string },
              { text: t('auth.feature2') as string },
              { text: t('auth.feature3') as string },
            ].map((feature) => (
              <div key={feature.text} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]/60">
                <span className="text-sm text-gray-300">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Bottom quote */}
          <div className="mt-12 pt-8 border-t border-white/[0.06]">
            <p className="text-sm text-gray-500 italic">
              &ldquo;{t('auth.quote')}&rdquo;
            </p>
            <p className="text-xs text-orange-500/70 mt-2 font-semibold">Nuntawat SaeHuam</p>
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-b from-gray-50/50 to-white dark:from-[#0a0a0a] dark:to-[#0a0a0a] relative">
        {/* Subtle background orbs */}
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-orange-50/5 dark:bg-orange-50/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-blue-50/5 dark:bg-blue-50/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-[480px] px-6 sm:px-8 pt-20 pb-8 sm:py-12 relative z-10">
          {/* Mobile logo (visible only on small screens) */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-block transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-2xl mb-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m18 16 4-4-4-4" />
                  <path d="m6 8-4 4 4 4" />
                  <path d="m14.5 4-5 16" />
                </svg>
              </div>
            </Link>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Morgorn <span className="text-orange-500">Portfolio</span>
            </h2>
          </div>

          {children}
        </div>
      </div>
    </main>
  );
}
