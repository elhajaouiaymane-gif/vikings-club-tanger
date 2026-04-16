'use client';

import { useState, useRef, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { useTranslation } from '@/components/gym/i18n-provider';  // ✅ CORRECT
import { localeNames, type Locale } from '@/lib/translations';

const locales: Locale[] = ['en', 'fr', 'es', 'ar'];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const current = localeNames[locale];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors duration-200"
        aria-label="Change language"
        aria-expanded={open}
      >
        <Globe className="size-4" />
        <span className="hidden sm:inline">{current.flag}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 glass-dark rounded-lg border border-white/10 py-1 min-w-[160px] z-[100] shadow-xl shadow-black/30">
          {locales.map((loc) => {
            const info = localeNames[loc];
            const isActive = loc === locale;
            return (
              <button
                key={loc}
                onClick={() => {
                  setLocale(loc);
                  setOpen(false);
                }}
                className={`flex items-center gap-2.5 w-full px-3 py-2 text-sm transition-colors duration-150 ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
                dir={loc === 'ar' ? 'rtl' : 'ltr'}
              >
                <span className="text-base">{info.flag}</span>
                <span className="flex-1 text-left">{info.label}</span>
                {isActive && <Check className="size-3.5 text-primary" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
