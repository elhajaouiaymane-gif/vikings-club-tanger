'use client';

import { useEffect, useRef } from 'react';
import { useTranslation } from '@/components/gym/i18n-provider';
import { Shield, Swords, Flame, Users } from 'lucide-react';

const values = [
  {
    icon: Shield,
    color: 'from-emerald-500/20 to-emerald-600/5',
    borderColor: 'border-emerald-500/20',
    iconColor: 'text-emerald-400',
    glowColor: 'group-hover:shadow-emerald-500/20',
  },
  {
    icon: Swords,
    color: 'from-red-500/20 to-red-600/5',
    borderColor: 'border-red-500/20',
    iconColor: 'text-red-400',
    glowColor: 'group-hover:shadow-red-500/20',
  },
  {
    icon: Flame,
    color: 'from-orange-500/20 to-orange-600/5',
    borderColor: 'border-orange-500/20',
    iconColor: 'text-orange-400',
    glowColor: 'group-hover:shadow-orange-500/20',
  },
  {
    icon: Users,
    color: 'from-blue-500/20 to-blue-600/5',
    borderColor: 'border-blue-500/20',
    iconColor: 'text-blue-400',
    glowColor: 'group-hover:shadow-blue-500/20',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    section.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    section.querySelectorAll('.reveal-stagger').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const valueItems = [
    { ...values[0], title: t('about_strength'), desc: t('about_strength_desc') },
    { ...values[1], title: t('about_discipline'), desc: t('about_discipline_desc') },
    { ...values[2], title: t('about_community'), desc: t('about_community_desc') },
    { ...values[3], title: t('about_legacy'), desc: t('about_legacy_desc') },
  ];

  return (
    <section id="about" ref={sectionRef} className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl" />
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle 1px, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="text-center mb-16 lg:mb-20 reveal">
          {/* Norse diamond divider */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/40" />
            <div className="w-2 h-2 rotate-45 bg-primary/40" />
            <div className="h-px w-8 bg-primary/40" />
            <div className="w-2 h-2 rotate-45 bg-primary/40" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/40" />
          </div>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Shield className="size-4" />
            {t('about_badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            {t('about_title')}
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
            {t('about_subtitle')}
          </p>
        </div>

        {/* ── Main Content: Emblem + Text ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 reveal">

          {/* Left — Epic Viking Emblem */}
          <div className="relative flex items-center justify-center">
            {/* Large outer glow */}
            <div className="absolute inset-0 bg-primary/8 rounded-full blur-3xl scale-150" />

            {/* Emblem */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex items-center justify-center">
              {/* Ring 4 — outermost, very slow */}
              <div className="absolute inset-0 rounded-full border border-primary/8" style={{ animation: 'spin 60s linear infinite' }} />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary/30" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary/30" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary/30" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary/30" />

              {/* Ring 3 — dashed, reverse */}
              <div className="absolute inset-4 rounded-full border border-dashed border-primary/12" style={{ animation: 'spin 45s linear infinite reverse' }} />

              {/* Ring 2 */}
              <div className="absolute inset-8 rounded-full border border-primary/15" style={{ animation: 'spin 30s linear infinite' }} />
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary/50" />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary/50" />

              {/* Ring 1 — innermost, reverse */}
              <div className="absolute inset-12 rounded-full border-2 border-primary/20" style={{ animation: 'spin 20s linear infinite reverse' }} />

              {/* Inner glow + Icon */}
              <div className="absolute inset-16 rounded-full bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center backdrop-blur-sm">
                <div className="absolute inset-0 rounded-full bg-primary/10 animate-[pulse_3s_ease-in-out_infinite]" />
                <Swords className="size-16 sm:size-20 lg:size-24 text-primary relative z-10" strokeWidth={1.5} />
              </div>
            </div>

            {/* Floating badge — Year */}
            <div className="absolute top-2 right-2 lg:top-6 lg:right-6 glass-card rounded-xl px-4 py-3 shadow-2xl animate-float">
              <div className="text-2xl font-bold text-primary">2018</div>
              <div className="text-xs text-muted-foreground">{t('about_founded')}</div>
            </div>
            {/* Floating badge — Trust */}
            <div className="absolute bottom-2 left-2 lg:bottom-6 lg:left-6 glass-card rounded-xl px-4 py-3 shadow-2xl animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-xs text-muted-foreground">{t('trust_badge').split(' ')[0]}</div>
            </div>
          </div>

          {/* Right — Text Content */}
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold">
              {t('about_heading')}
            </h3>
            <div className="relative pl-4 border-l-2 border-primary/30">
              <p className="text-muted-foreground leading-relaxed">
                {t('about_story')}
              </p>
            </div>
            <div className="relative pl-4 border-l-2 border-primary/20">
              <p className="text-muted-foreground leading-relaxed">
                {t('about_mission')}
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {[
                { value: '500+', label: t('about_members') },
                { value: '6+', label: t('about_years') },
                { value: '15+', label: t('about_programs') },
              ].map((s) => (
                <div key={s.label} className="text-center p-4 glass-card rounded-xl hover:border-primary/30 transition-all duration-300">
                  <div className="text-2xl sm:text-3xl font-bold text-primary stat-glow">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Norse Divider ── */}
        <div className="flex items-center justify-center gap-4 mb-16 reveal">
          <div className="h-px flex-1 max-w-[200px] bg-gradient-to-r from-transparent to-primary/30" />
          <Swords className="size-5 text-primary/30" />
          <div className="h-px flex-1 max-w-[200px] bg-gradient-to-l from-transparent to-primary/30" />
        </div>

        {/* ── Core Values Grid ── */}
        <div className="reveal-stagger">
          <h3 className="text-center text-xl sm:text-2xl font-bold mb-12">
            {t('about_values_title')}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className={`group relative p-6 rounded-xl border ${item.borderColor} bg-gradient-to-br ${item.color} hover:scale-[1.03] hover:shadow-xl transition-all duration-500 cursor-default`}
                >
                  {/* Hover glow */}
                  <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${item.glowColor} blur-xl`} />
                  <div className="relative">
                    <Icon className={`size-8 ${item.iconColor} mb-4 group-hover:scale-110 group-hover:drop-shadow-lg transition-all duration-300`} />
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Viking Oath Banner ── */}
        <div className="mt-20 reveal">
          <div className="relative rounded-2xl overflow-hidden border border-primary/20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 p-8 sm:p-12">
            {/* Decorative corners */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-primary/30 rounded-tl" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-primary/30 rounded-tr" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-primary/30 rounded-bl" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-primary/30 rounded-br" />
            <div className="text-center">
              <Swords className="size-8 text-primary/40 mx-auto mb-4" />
              <p className="text-lg sm:text-xl text-foreground/80 font-medium leading-relaxed max-w-2xl mx-auto italic">
                &ldquo;{t('about_subtitle')}&rdquo;
              </p>
              <div className="mt-4 flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-primary/20" />
                <Shield className="size-4 text-primary/30" />
                <div className="h-px w-12 bg-primary/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}