'use client';

import { useEffect, useState, useCallback } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { useScrollVisible } from '@/hooks/use-scroll-reveal';
import { useTranslation } from '@/lib/i18n';

function AnimatedCounter({
  target,
  suffix,
  isVisible,
}: {
  target: number;
  suffix: string;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  const animate = useCallback(() => {
    const duration = 2000;
    const startTime = performance.now();

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    }

    requestAnimationFrame(step);
  }, [target]);

  useEffect(() => {
    if (isVisible) {
      animate();
    }
  }, [isVisible, animate]);

  const formatted = count.toLocaleString('en-US');

  return (
    <span className="stat-glow" suppressHydrationWarning>
      {formatted}
      {suffix}
    </span>
  );
}

export default function Stats() {
  useScrollReveal();
  const { ref, isVisible } = useScrollVisible(0.25);
  const { t } = useTranslation();

  const stats = [
    { value: 3375, suffix: '+', label: t('instagram_followers') },
    { value: 7, suffix: '', label: t('days_open') },
    { value: 15, suffix: 'h', label: t('hours_daily') },
    { value: 2, suffix: '+', label: t('branches') },
  ];

  return (
    <section className="relative py-10 md:py-14 bg-background overflow-hidden">
      <div className="section-divider absolute inset-x-0 top-0 z-10" />

      <div ref={ref} className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Trust Badge */}
        <div className="reveal mb-8">
          <div className="glass-card mx-auto max-w-md rounded-2xl border border-primary/20 px-6 py-5 text-center">
            <div className="flex items-center justify-center gap-2.5">
              <ShieldCheck className="size-5 text-primary" />
              <span className="text-lg sm:text-xl font-extrabold heading-glow">
                {t('trust_badge')}
              </span>
              <ShieldCheck className="size-5 text-primary" />
            </div>
            <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground">
              {t('trust_sub')}
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 reveal-stagger">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="glass-card group relative flex flex-col items-center rounded-2xl px-4 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl font-bold md:text-5xl">
                <span className="gradient-text">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    isVisible={isVisible}
                  />
                </span>
              </div>
              <p className="mt-2 text-xs sm:text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider absolute inset-x-0 bottom-0 z-10" />
    </section>
  );
}