'use client';

import React from 'react';
import { useTranslation } from '@/shared/providers/LanguageProvider';

export function LanguageToggle() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center gap-1.5 font-bold text-lg text-foreground tracking-wide select-none">
      <button
        onClick={() => setLanguage('en')}
        className={`
          transition-all duration-200 ease-in-out hover:text-foreground
          ${language === 'en' ? 'border-b-[3px] border-foreground pb-0.5' : 'text-muted-foreground pb-[5px]'}
        `}
        style={{ fontFamily: 'var(--font-en)' }}
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
        style={{ fontFamily: 'var(--font-th)' }}
        aria-label="เปลี่ยนเป็นภาษาไทย"
      >
        TH
      </button>
    </div>
  );
}
