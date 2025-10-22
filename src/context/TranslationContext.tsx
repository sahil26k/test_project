'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getTranslation, type LanguageCode, SUPPORTED_LANGUAGES } from '@/lib/translations';

interface TranslationContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('annadataa_language') as LanguageCode;
    if (saved && (Object.keys(SUPPORTED_LANGUAGES) as LanguageCode[]).includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('annadataa_language', lang);
  }, []);

  const t = useCallback((key: string) => getTranslation(language, key), [language]);

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }
  return context;
}
