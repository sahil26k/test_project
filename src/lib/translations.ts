import en from './translations/en.json';
import hi from './translations/hi.json';
import te from './translations/te.json';
import ta from './translations/ta.json';
import bn from './translations/bn.json';
import kn from './translations/kn.json';
import ml from './translations/ml.json';
import mr from './translations/mr.json';
import gu from './translations/gu.json';
import pa from './translations/pa.json';
import or from './translations/or.json';
import as from './translations/as.json';
import ur from './translations/ur.json';

type LanguageCode = 'en' | 'hi' | 'te' | 'ta' | 'bn' | 'kn' | 'ml' | 'mr' | 'gu' | 'pa' | 'or' | 'as' | 'ur';

const translations: Record<LanguageCode, any> = {
  en,
  hi,
  te,
  ta,
  bn,
  kn,
  ml,
  mr,
  gu,
  pa,
  or,
  as,
  ur,
};

export function getTranslation(lang: LanguageCode, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang] || translations['en'];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  // Fallback to English if translation not found
  if (!value) {
    value = translations['en'];
    for (const k of keys) {
      value = value?.[k];
    }
  }
  
  return value || key;
}

export const SUPPORTED_LANGUAGES: Record<LanguageCode, string> = {
  en: 'English',
  hi: 'हिंदी',
  te: 'తెలుగు',
  ta: 'தமிழ்',
  bn: 'বাংলা',
  kn: 'ಕನ್ನಡ',
  ml: 'മലയാളം',
  mr: 'मराठी',
  gu: 'ગુજરાતી',
  pa: 'ਪੰਜਾਬੀ',
  or: 'ଓଡ଼ିଆ',
  as: 'অসমীয়া',
  ur: 'اردو'
};

export type { LanguageCode };
