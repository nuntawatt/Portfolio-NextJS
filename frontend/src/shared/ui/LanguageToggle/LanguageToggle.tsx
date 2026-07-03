'use client';

import React from 'react';
import { useTranslation } from '@/shared/providers/LanguageProvider';

// อินเตอร์เฟซสำหรับ Props ของคอมโพเนนต์ LanguageToggle
interface LanguageToggleProps {
  className?: string;
}

// คอมโพเนนต์ปุ่มสลับภาษา (Language Switcher) ระหว่าง ภาษาอังกฤษ (EN) และภาษาไทย (TH)
export function LanguageToggle({ className }: Readonly<LanguageToggleProps>) {
  // ดึงค่าภาษาปัจจุบัน (language) และฟังก์ชันสำหรับเปลี่ยนภาษา (setLanguage) จาก Context
  const { language, setLanguage } = useTranslation();

  return (
    <div 
      className={`flex items-center gap-1.5 font-bold text-lg text-foreground tracking-wide select-none ${className || ''}`}
      style={{ fontFamily: 'var(--font-en)' }}
    >
      <button
        onClick={() => setLanguage('en')}
        className={`
          transition-all duration-200 ease-in-out hover:text-foreground
          ${language === 'en' ? 'border-b-[3px] border-foreground pb-0.5' : 'text-muted-foreground pb-[5px]'}
        `}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-foreground/50 mx-1 pb-1">|</span>
      <button
        onClick={() => setLanguage('th')}
        className={`
          transition-all duration-200 ease-in-out hover:text-foreground
          ${language === 'th' ? 'border-b-[3px] border-foreground pb-0.5' : 'text-muted-foreground pb-[5px]'}
        `}
        aria-label="เปลี่ยนเป็นภาษาไทย"
      >
        TH
      </button>
    </div>
  );
}
