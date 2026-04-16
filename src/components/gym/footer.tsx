'use client';

import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Instagram, Facebook, MapPin, Phone, Clock } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/vikingsclubb', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/vikingclubtanger', label: 'Facebook' },
];

export function Footer() {
  const { t } = useTranslation();

  const quickLinks = [
    { label: t('home'), href: '#home' },
    { label: t('about'), href: '#about' },
    { label: t('services'), href: '#services' },
    { label: t('pricing'), href: '#pricing' },
    { label: t('locations'), href: '#locations' },
  ];

  const services = [
    { label: t('services_muscu'), href: '#services' },
    { label: t('services_crossfit'), href: '#services' },
    { label: t('services_boxing'), href: '#services' },
    { label: t('services_cardio'), href: '#services' },
    { label: t('services_coaching'), href: '#services' },
    { label: t('services_group'), href: '#services' },
  ];

  return (
    <footer className="relative bg-background overflow-hidden text-foreground">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="space-y-4">
            <Link href="#home" className="inline-flex items-center gap-3 group">
              <img
                src="/gym-logo.png"
                alt="Vikings Club Tanger"
                width={130}
                height={40}
                className="rounded-md"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Train Like a Viking — {t('footer_tagline')}
            </p>
            <p className="text-muted-foreground text-xs leading-relaxed max-w-xs">
              {t('footer_description')}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80" style={{ fontFamily: "'Russo One', sans-serif" }}>
              {t('quick_links')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80" style={{ fontFamily: "'Russo One', sans-serif" }}>
              {t('services')}
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <Link href={service.href} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80" style={{ fontFamily: "'Russo One', sans-serif" }}>
              {t('contact_info')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="size-4 text-primary shrink-0" />
                <a href="tel:+212611087382" className="hover:text-primary transition-colors font-medium">
                  0611-087382
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="block text-xs font-semibold text-foreground/70">{t('footer_branch1')}</span>
                  <span className="block">{t('footer_branch1_address')}</span>
                  <span className="block text-xs font-semibold text-foreground/70 mt-2">{t('footer_branch2')}</span>
                  <span className="block">{t('footer_branch2_address')}</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Clock className="size-4 text-primary shrink-0 mt-0.5" />
                <span>{t('footer_hours')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex items-center gap-3">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center justify-center size-11 rounded-lg border border-border/50 bg-card/30 text-muted-foreground hover:bg-primary hover:text-white hover:border-primary hover:shadow-[0_4px_20px_oklch(0.65_0.22_55/0.3)] transition-all duration-300"
            >
              <Icon className="size-4" />
            </Link>
          ))}
        </div>
      </div>

      <Separator className="bg-border/30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; 2025 Vikings Club Tanger. {t('footer_rights')}</p>
          <div className="flex items-center gap-4">
            <a
              href="https://maps.app.goo.gl/Mt5wmHa8NQM78rkM9"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200"
            >
              📍 {t('footer_branch1_address')}
            </a>
            <span className="text-border">|</span>
            <a
              href="https://maps.app.goo.gl/MUHsAPWeKtex4BfK8"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200"
            >
              📍 {t('footer_branch2_address')}
            </a>
          </div>
        </div>
      </div>

      {/* Signature */}
      <div className="text-center pb-4">
        <p className="text-primary/30 text-sm italic" style={{ fontFamily: "'Permanent Marker', cursive" }}>Made by Elhajao</p>
      </div>
    </footer>
  );
}