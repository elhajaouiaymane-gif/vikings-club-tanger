'use client';

import {
  Dumbbell,
  Flame,
  Heart,
  Swords,
  User,
  Users,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { useTranslation } from '@/components/gym/i18n-provider';

const services = [
  {
    icon: Dumbbell,
    titleKey: 'services_muscu',
    descKey: 'services_muscu_desc',
  },
  {
    icon: Flame,
    titleKey: 'services_crossfit',
    descKey: 'services_crossfit_desc',
  },
  {
    icon: Heart,
    titleKey: 'services_cardio',
    descKey: 'services_cardio_desc',
  },
  {
    icon: User,
    titleKey: 'services_coaching',
    descKey: 'services_coaching_desc',
  },
  {
    icon: Swords,
    titleKey: 'services_boxing',
    descKey: 'services_boxing_desc',
  },
  {
    icon: Users,
    titleKey: 'services_group',
    descKey: 'services_group_desc',
  },
];

const staggerDelays = ['0ms', '80ms', '160ms', '240ms', '320ms', '400ms'];

export default function Services() {
  useScrollReveal();
  const { t } = useTranslation();

  return (
    <section id="services" className="relative py-16 md:py-20 overflow-hidden">
      {/* Subtle mesh background */}
      <div className="mesh-gradient absolute inset-0 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-10 text-center reveal">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            {t('services_label')}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t('services_title')}{' '}
            <span className="gradient-text">{t('services_title_highlight')}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-lg">
            {t('services_subtitle')}
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.titleKey}
                className="reveal-stagger glass-card group border-border/30 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/40 transition-all duration-300"
                style={{ transitionDelay: staggerDelays[index] }}
              >
                <CardContent className="flex flex-col items-start gap-4 p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(service.descKey)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}