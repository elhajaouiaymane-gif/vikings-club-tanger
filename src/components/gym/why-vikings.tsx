'use client';

import { Shield, Heart, Zap, BadgePercent } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { useTranslation } from '@/lib/i18n';

const staggerDelays = ['0ms', '120ms', '240ms', '360ms'];

export default function WhyVikings() {
  useScrollReveal();
  const { t } = useTranslation();

  const pillars = [
    {
      icon: Shield,
      title: t('why_title1'),
      points: [t('why_t1_p1'), t('why_t1_p2'), t('why_t1_p3')],
    },
    {
      icon: Heart,
      title: t('why_title2'),
      points: [t('why_t2_p1'), t('why_t2_p2'), t('why_t2_p3')],
    },
    {
      icon: Zap,
      title: t('why_title3'),
      points: [t('why_t3_p1'), t('why_t3_p2'), t('why_t3_p3')],
    },
    {
      icon: BadgePercent,
      title: t('why_title4'),
      points: [t('why_t4_p1'), t('why_t4_p2'), t('why_t4_p3')],
    },
  ];

  return (
    <section className="relative py-14 md:py-20 bg-background overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center reveal">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {t('why_label')}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl" style={{ fontFamily: "'Russo One', sans-serif" }}>
            {t('why_heading')}
            <span className="viking-text-gradient"> VIKINGS</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {t('why_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="reveal-stagger glass-card rounded-2xl p-6 sm:p-7 group hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/40 transition-all duration-300"
                style={{ transitionDelay: staggerDelays[index] }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 shrink-0 group-hover:bg-primary/20 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                    {pillar.title}
                  </h3>
                </div>
                <ul className="space-y-2 pl-1">
                  {pillar.points.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
                    >
                      <span className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}