'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import en from '@/locales/en.json';
import th from '@/locales/th.json';

type Language = 'en' | 'th';
type Translations = Record<string, string | string[]>;

// อินเตอร์เฟซสำหรับข้อมูลในบริบทภาษา (Language Context Type)
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string | string[];
}

const translations: Record<Language, Translations> = {
  en,
  th,
};

// คอนเทกสต์สำหรับจัดการด้านภาษาภายในระบบ (Language Context)
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// คอมโพเนนต์ตัวให้บริการจัดการด้านภาษา (Language Provider)
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // สถานะสำหรับกำหนดภาษาปัจจุบัน โดยตรวจสอบจาก localStorage หรือกำหนดให้เป็นภาษาอังกฤษ (en) เสมอเป็นค่าตั้งต้น
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') as Language;
      if (savedLang && (savedLang === 'en' || savedLang === 'th')) {
        return savedLang;
      }
    }
    return 'en';
  });
  // สถานะที่ระบุว่าคอมโพเนนต์ทำการเมาท์บนเบราว์เซอร์เสร็จแล้ว เพื่อลดปัญหาความไม่สอดคล้องของ HTML (Hydration)
  const [mounted, setMounted] = useState(false);

  // ตั้งค่าเมื่อคอมโพเนนต์ติดตั้งเสร็จสิ้น
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // คอยเพิ่ม/ลดคลาสตามภาษาที่เลือกบนแท็ก HTML เพื่อรองรับการปรับฟอนต์ (เช่น font-th หรือ font-en)
  useEffect(() => {
    if (!mounted) return;
    
    // Apply font class to HTML tag based on language
    const html = document.documentElement;
    html.classList.remove('lang-en', 'lang-th');
    html.classList.add(`lang-${language}`);
  }, [language, mounted]);

  // ฟังก์ชันสำหรับกำหนดภาษาใหม่และบันทึกข้อมูลลงใน localStorage
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  }, []);

  // ฟังก์ชันแปลภาษาเพื่อดึงค่าผลลัพธ์คำศัพท์ตามคีย์ที่ระบุ
  const t = useCallback(
    (key: string): string | string[] => {
      const currentTranslations = translations[language];
      return currentTranslations[key] || key;
    },
    [language]
  );

  // Prevent hydration mismatch by returning empty div instead of null, but STILL WRAP with Provider
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {!mounted ? (
        <div style={{ visibility: 'hidden' }}>{children}</div>
      ) : (
        children
      )}
    </LanguageContext.Provider>
  );
}

// คัสตอมฮุกสำหรับเข้าถึงค่าตัวแปลภาษาและฟังก์ชันจัดการภาษา (Translation Hook)
export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
