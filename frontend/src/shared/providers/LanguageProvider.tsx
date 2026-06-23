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
  // กำหนดภาษาตั้งต้นเป็น 'en' เพื่อให้ตรงกับการเรนเดอร์ฝั่งเซิร์ฟเวอร์ (Server-Side Rendering) ป้องกันปัญหา Hydration Mismatch
  const [language, setLanguageState] = useState<Language>('en');

  // ดึงภาษาที่บันทึกไว้ใน localStorage หลังจากคอมโพเนนต์ติดตั้งบนฝั่งไคลเอนต์สำเร็จ ( client-side mount )
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'th')) {
      setLanguageState(savedLang);
    }
  }, []);

  // คอยเพิ่ม/ลดคลาสตามภาษาที่เลือกบนแท็ก HTML เพื่อรองรับการปรับฟอนต์ (เช่น font-th หรือ font-en)
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('lang-en', 'lang-th');
    html.classList.add(`lang-${language}`);
  }, [language]);

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

  // แสดงผลเนื้อหาหน้าเว็บทันทีโดยไม่สวม Wrapper ซ่อนรูป เพื่อให้บราวเซอร์ทำ First Contentful Paint ได้ทันที ส่งผลให้ประสิทธิภาพเว็บพุ่งสูง
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
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
