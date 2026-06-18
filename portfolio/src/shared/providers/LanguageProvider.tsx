'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import en from '@/locales/en.json';
import th from '@/locales/th.json';

type Language = 'en' | 'th';
type Translations = Record<string, string | string[]>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string | string[];
}

const translations: Record<Language, Translations> = {
  en,
  th,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'th')) {
      setLanguageState(savedLang);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Apply font class to HTML tag based on language
    const html = document.documentElement;
    html.classList.remove('lang-en', 'lang-th');
    html.classList.add(`lang-${language}`);
  }, [language, mounted]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  }, []);

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

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
