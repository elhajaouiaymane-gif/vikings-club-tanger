'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Dumbbell, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/components/gym/i18n-provider';
import LanguageSwitcher from '@/components/gym/language-switcher';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinkKeys = [
  { key: 'home' as const, href: '#home' },
  { key: 'about' as const, href: '#about' },
  { key: 'services' as const, href: '#services' },
  { key: 'pricing' as const, href: '#pricing' },
  { key: 'locations' as const, href: '#locations' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinkKeys.map((link) => link.href.replace('#', ''));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback(
    (href: string) => {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileOpen(false);
    },
    []
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'glass-dark shadow-lg shadow-black/20'
          : 'bg-transparent'
      )}
      suppressHydrationWarning
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="flex items-center group"
        >
          <div className="relative">
            <div className="flex items-center justify-center bg-black/80 dark:bg-white/90 rounded-sm border border-border pl-2 pr-2 pt-1.5 pb-0 sm:pl-3 sm:pr-3 sm:pt-2 sm:pb-0 mb-[20px]">
              <img
                src="/gym-logo.png"
                alt="Vikings Club Tanger"
                className="h-[50px] sm:h-[56px] md:h-[60px] lg:h-[64px] xl:h-[70px] w-auto object-contain transition-all duration-300 group-hover:scale-105 max-w-[140px] sm:max-w-[160px] md:max-w-[180px]"
              />
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinkKeys.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  'relative px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-200',
                  activeSection === link.href.replace('#', '')
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {t(link.key)}
                {activeSection === link.href.replace('#', '') && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-primary" />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            <span className="toggle-icon toggle-icon-moon"><Moon className="size-3" /></span>
            <span className="toggle-icon toggle-icon-sun"><Sun className="size-3" /></span>
          </button>
          <Button
            onClick={() => handleNavClick('#pricing')}
            className="btn-primary text-white font-semibold rounded-md px-5 h-9"
          >
            {t('join_now')}
          </Button>
        </div>

        {/* Mobile Hamburger + Sheet */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="size-11 text-foreground hover:bg-white/10"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-72 bg-background/95 backdrop-blur-xl border-l border-white/10"
          >
            <SheetHeader className="pb-4 border-b border-white/10">
              <SheetTitle className="flex items-center gap-3 text-left">
                <div className="relative bg-black/80 dark:bg-white/90 rounded-sm px-1.5 py-0.5 border border-white/5">
                  <img
                    src="/gym-logo.png"
                    alt="Vikings Club Tanger"
                    width={100}
                    height={33}
                  />
                </div>
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-1 mt-4">
              {navLinkKeys.map((link) => (
                <SheetClose asChild key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3.5 rounded-lg text-sm font-medium transition-all duration-200 text-left w-full min-h-[44px]',
                      activeSection === link.href.replace('#', '')
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    )}
                  >
                    {activeSection === link.href.replace('#', '') && (
                      <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    )}
                    {t(link.key)}
                  </button>
                </SheetClose>
              ))}
            </div>

            <div className="mt-auto pt-6">
              <div className="flex items-center gap-3 px-4 mb-4">
                <LanguageSwitcher />
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="theme-toggle ml-auto"
                  aria-label="Toggle theme"
                >
                  <span className="toggle-icon toggle-icon-moon"><Moon className="size-3" /></span>
                  <span className="toggle-icon toggle-icon-sun"><Sun className="size-3" /></span>
                </button>
              </div>
              <SheetClose asChild>
                <Button
                  onClick={() => handleNavClick('#pricing')}
                  className="btn-primary text-white font-semibold rounded-md w-full h-11"
                >
                  <Dumbbell className="size-4" />
                  {t('join_now')}
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}