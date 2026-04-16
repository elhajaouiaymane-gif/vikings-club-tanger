'use client';

import { ThemeProvider } from 'next-themes';
import { TranslationProvider } from '@/components/gym/i18n-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <TranslationProvider>{children}</TranslationProvider>
    </ThemeProvider>
  );
}