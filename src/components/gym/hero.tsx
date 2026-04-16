'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, Users, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';

const trustIndicators = [
  { id: 'followers', icon: Users, valueKey: 'hero_followers_value' as const, labelKey: 'instagram_followers' as const },
  { id: 'days', icon: Calendar, valueKey: 'hero_days_value' as const, labelKey: 'days_open' as const },
  { id: 'hours', icon: Award, valueKey: 'hero_hours_value' as const, labelKey: 'hours_daily' as const },
];

/* Glow rings — 3 concentric expanding rings */
const glowRings = [
  { id: 'ring-1', size: 300, cls: 'hero-ring-d0 hero-ring-dur4' },
  { id: 'ring-2', size: 380, cls: 'hero-ring-d1 hero-ring-dur4' },
  { id: 'ring-3', size: 460, cls: 'hero-ring-d2 hero-ring-dur4' },
];

/* Spark particles around the logo — deterministic */
const sparks = [
  { id: 'spark-0', angle: 0, distance: 140, duration: 2.5, size: 2, drift: -20, delay: 'd0' },
  { id: 'spark-1', angle: 30, distance: 160, duration: 3.0, size: 3, drift: 15, delay: 'd0' },
  { id: 'spark-2', angle: 60, distance: 130, duration: 2.8, size: 4, drift: -10, delay: 'd0' },
  { id: 'spark-3', angle: 90, distance: 180, duration: 3.5, size: 2, drift: 25, delay: 'd1' },
  { id: 'spark-4', angle: 120, distance: 150, duration: 2.6, size: 3, drift: -25, delay: 'd0' },
  { id: 'spark-5', angle: 150, distance: 170, duration: 3.2, size: 5, drift: 10, delay: 'd1' },
  { id: 'spark-6', angle: 180, distance: 135, duration: 2.7, size: 2, drift: -15, delay: 'd0' },
  { id: 'spark-7', angle: 210, distance: 165, duration: 3.8, size: 3, drift: 20, delay: 'd1' },
  { id: 'spark-8', angle: 240, distance: 145, duration: 2.9, size: 4, drift: -30, delay: 'd0' },
  { id: 'spark-9', angle: 270, distance: 175, duration: 3.3, size: 2, drift: 5, delay: 'd2' },
  { id: 'spark-10', angle: 300, distance: 155, duration: 2.4, size: 3, drift: -18, delay: 'd1' },
  { id: 'spark-11', angle: 330, distance: 185, duration: 3.6, size: 4, drift: 12, delay: 'd2' },
];

const sparkPositions = sparks.map((s) => ({
  ...s,
  left: Math.round(Math.cos((s.angle * Math.PI) / 180) * s.distance * 100) / 100,
  top: Math.round(Math.sin((s.angle * Math.PI) / 180) * s.distance * 100) / 100,
}));

/* Fire embers — CSS delay classes, NO inline animation styles */
const embers = [
  { id: 'e0', left: 5, sz: 3, dur: 'dur7', delay: 'd0' },
  { id: 'e1', left: 12, sz: 2, dur: 'dur9', delay: 'd1' },
  { id: 'e2', left: 18, sz: 4, dur: 'dur6', delay: 'd0' },
  { id: 'e3', left: 25, sz: 2, dur: 'dur8', delay: 'd2' },
  { id: 'e4', left: 32, sz: 3, dur: 'dur7-5', delay: 'd0' },
  { id: 'e5', left: 40, sz: 5, dur: 'dur6-5', delay: 'd1' },
  { id: 'e6', left: 47, sz: 2, dur: 'dur8-5', delay: 'd3' },
  { id: 'e7', left: 53, sz: 4, dur: 'dur7', delay: 'd0' },
  { id: 'e8', left: 60, sz: 3, dur: 'dur9-5', delay: 'd2' },
  { id: 'e9', left: 68, sz: 2, dur: 'dur6-8', delay: 'd1' },
  { id: 'e10', left: 75, sz: 3, dur: 'dur7-2', delay: 'd0' },
  { id: 'e11', left: 82, sz: 5, dur: 'dur8', delay: 'd2' },
  { id: 'e12', left: 88, sz: 2, dur: 'dur7-8', delay: 'd1' },
  { id: 'e13', left: 95, sz: 4, dur: 'dur6-2', delay: 'd0' },
  { id: 'e14', left: 8, sz: 3, dur: 'dur9-2', delay: 'd3' },
  { id: 'e15', left: 22, sz: 2, dur: 'dur7-6', delay: 'd4' },
  { id: 'e16', left: 36, sz: 4, dur: 'dur8-3', delay: 'd1' },
  { id: 'e17', left: 55, sz: 3, dur: 'dur6-9', delay: 'd2' },
  { id: 'e18', left: 72, sz: 2, dur: 'dur8-8', delay: 'd3' },
  { id: 'e19', left: 90, sz: 3, dur: 'dur7-3', delay: 'd0' },
];

/* Speed lines — pre-computed endpoints, NO inline styles */
const speedLines = [
  { id: 'l0', angle: 0, len: 350, w: 1, delay: 'd0', dur: 'dur3' },
  { id: 'l1', angle: 24, len: 280, w: 1.5, delay: 'd0', dur: 'dur3-5' },
  { id: 'l2', angle: 48, len: 400, w: 1, delay: 'd1', dur: 'dur3-2' },
  { id: 'l3', angle: 72, len: 320, w: 1, delay: 'd1', dur: 'dur2-8' },
  { id: 'l4', angle: 96, len: 360, w: 1.5, delay: 'd0', dur: 'dur3-3' },
  { id: 'l5', angle: 120, len: 300, w: 1, delay: 'd2', dur: 'dur3-6' },
  { id: 'l6', angle: 144, len: 380, w: 1, delay: 'd0', dur: 'dur2-9' },
  { id: 'l7', angle: 168, len: 260, w: 1.5, delay: 'd1', dur: 'dur3-4' },
  { id: 'l8', angle: 192, len: 340, w: 1, delay: 'd2', dur: 'dur3-1' },
  { id: 'l9', angle: 216, len: 290, w: 1, delay: 'd0', dur: 'dur3-7' },
  { id: 'l10', angle: 240, len: 370, w: 1.5, delay: 'd1', dur: 'dur2-7' },
  { id: 'l11', angle: 264, len: 310, w: 1, delay: 'd2', dur: 'dur3' },
  { id: 'l12', angle: 288, len: 390, w: 1, delay: 'd0', dur: 'dur3-5' },
  { id: 'l13', angle: 312, len: 270, w: 1.5, delay: 'd1', dur: 'dur3-3' },
  { id: 'l14', angle: 336, len: 350, w: 1, delay: 'd1', dur: 'dur2-8' },
];

const slComputed = speedLines.map((l) => {
  const rad = (l.angle * Math.PI) / 180;
  return {
    ...l,
    sx: Math.round(Math.cos(rad) * 80 * 100) / 100,
    sy: Math.round(Math.sin(rad) * 80 * 100) / 100,
    ex: Math.round(Math.cos(rad) * l.len * 100) / 100,
    ey: Math.round(Math.sin(rad) * l.len * 100) / 100,
  };
});

/* Floating particles — CSS-only delays */
const floaters = [
  { id: 'f0', left: 12, dur: 'dur8', delay: 'd0' },
  { id: 'f1', left: 27, dur: 'dur10', delay: 'd1' },
  { id: 'f2', left: 42, dur: 'dur12', delay: 'd2' },
  { id: 'f3', left: 57, dur: 'dur14', delay: 'd3' },
  { id: 'f4', left: 72, dur: 'dur16', delay: 'd4' },
  { id: 'f5', left: 87, dur: 'dur18', delay: 'd6' },
];

/* Eye glow — image-relative coordinates for aspect-ratio independence */
const IMG_W = 1040;
const IMG_H = 1546;
const IMG_ASPECT = IMG_W / IMG_H;

const EYE_IMG_Y = 0.139;
const LEFT_EYE_IMG_X = 0.458;
const RIGHT_EYE_IMG_X = 0.508;
const MOBILE_BREAKPOINT = 1024;
const MOBILE_Y_OFFSET = -0.012;
const MOBILE_LEFT_X_OFFSET = -0.006;
const MOBILE_RIGHT_X_OFFSET = -0.004;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    function updateEyePosition() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const vpAspect = vw / vh;
      const isMobile = vw < MOBILE_BREAKPOINT;
      const eyeY = EYE_IMG_Y + (isMobile ? MOBILE_Y_OFFSET : 0);
      const leftEyeX = LEFT_EYE_IMG_X + (isMobile ? MOBILE_LEFT_X_OFFSET : 0);
      const rightEyeX = RIGHT_EYE_IMG_X + (isMobile ? MOBILE_RIGHT_X_OFFSET : 0);

      let eyeTopPx: number, leftEyePx: number, rightEyePx: number;

      if (vpAspect >= IMG_ASPECT) {
        const renderedW = vw;
        const renderedH = vw / IMG_ASPECT;
        eyeTopPx = eyeY * renderedH;
        leftEyePx = leftEyeX * renderedW;
        rightEyePx = rightEyeX * renderedW;
      } else {
        const renderedH = vh;
        const renderedW = vh * IMG_ASPECT;
        const offsetX = (vw - renderedW) / 2;
        eyeTopPx = eyeY * renderedH;
        leftEyePx = offsetX + leftEyeX * renderedW;
        rightEyePx = offsetX + rightEyeX * renderedW;
      }

      document.documentElement.style.setProperty('--eye-top', `${(eyeTopPx / vh) * 100}%`);
      document.documentElement.style.setProperty('--eye-left', `${(leftEyePx / vw) * 100}%`);
      document.documentElement.style.setProperty('--eye-right', `${(rightEyePx / vw) * 100}%`);
    }

    updateEyePosition();
    window.addEventListener('resize', updateEyePosition);
    return () => window.removeEventListener('resize', updateEyePosition);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
      setScrollY(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = useCallback((href: string) => {
    const el = document.getElementById(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const warriorTranslateY = scrollY * 80;
  const warriorScale = 1 + scrollY * 0.15;
  const contentOpacity = 1 - scrollY * 1.5;
  const contentTranslateY = scrollY * -40;

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ===== BACKGROUND: Pure dark ===== */}
      <div className="absolute inset-0 z-0 bg-background">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-background via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* ===== BACKGROUND LAYERS ===== */}
      <div className="absolute inset-0 z-[1] pointer-events-none hero-bg-grain" />
      <div className="absolute inset-0 z-[1] pointer-events-none hero-bg-split" />
      <div className="absolute inset-0 z-[1] pointer-events-none hero-smoke-full-1" />
      <div className="absolute inset-0 z-[1] pointer-events-none hero-smoke-full-2" />
      <div className="absolute inset-0 z-[1] pointer-events-none hero-smoke-full-3" />
      <div className="absolute inset-0 z-[1] pointer-events-none hero-bg-runes" />
      <div className="hero-rune-symbol" />

      {/* Center glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] lg:w-[900px] lg:h-[900px] rounded-full opacity-50 z-0 pointer-events-none hero-glow-primary" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] rounded-full opacity-30 z-0 pointer-events-none hero-glow-secondary" />

      {/* ===== VIKING WARRIOR ===== */}
      <div
        className="mobile-warrior-center"
        aria-hidden="true"
        style={{
          transform: `translateX(-50%) translateY(${warriorTranslateY}px) scale(${warriorScale})`,
          transition: 'transform 0.1s linear',
        }}
      >
        <div className="mobile-warrior-heat" />
        <div className="mobile-warrior-eye mobile-warrior-eye-left" />
        <div className="mobile-warrior-eye mobile-warrior-eye-right" />
        <div className="mobile-warrior-lightning mobile-warrior-lightning-1" />
        <div className="mobile-warrior-lightning mobile-warrior-lightning-2" />
        <div className="mobile-warrior-lightning mobile-warrior-lightning-3" />
        <img
          src="/viking-warrior.png"
          alt=""
          className="mobile-warrior-center-img"
          draggable={false}
        />
        <div className="mobile-ember mobile-ember-1" />
        <div className="mobile-ember mobile-ember-2" />
        <div className="mobile-ember mobile-ember-3" />
        <div className="mobile-ember mobile-ember-4" />
        <div className="mobile-ember mobile-ember-5" />
        <div className="mobile-ember mobile-ember-6" />
        <div className="mobile-ember mobile-ember-7" />
        <div className="mobile-ember mobile-ember-8" />
      </div>

      {/* ===== FIRE EMBERS ===== */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {embers.map((e) => (
          <div
            key={e.id}
            className={`absolute rounded-full ember-particle ember-${e.dur} ember-${e.delay}`}
            style={{ left: `${e.left}%`, bottom: '-10px', width: e.sz, height: e.sz }}
          />
        ))}
      </div>

      {/* ===== SPEED LINES (SVG) ===== */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] pointer-events-none"
        width="1000"
        height="1000"
        viewBox="-500 -500 1000 1000"
      >
        <defs>
          <linearGradient id="rayGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c2651a" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#c2651a" stopOpacity="0" />
          </linearGradient>
        </defs>
        {slComputed.map((l) => (
          <line
            key={l.id}
            x1={l.sx}
            y1={l.sy}
            x2={l.ex}
            y2={l.ey}
            className={`speed-line sl-${l.dur} sl-${l.delay}`}
            strokeWidth={l.w}
            strokeLinecap="round"
          />
        ))}
      </svg>

      {/* ===== BOTTOM FOG ===== */}
      <div className="absolute bottom-0 left-0 right-0 h-[40vh] z-[1] pointer-events-none overflow-hidden">
        <div className="fog-layer-1 absolute bottom-0 left-[-10%] right-[-10%] h-[300px]" />
        <div className="fog-layer-2 absolute bottom-[-5%] left-[-10%] right-[-10%] h-[250px]" />
        <div className="fog-layer-3 absolute bottom-[-10%] left-[10%] right-[10%] h-[200px]" />
      </div>

      {/* ===== ROTATING LIGHT RAYS ===== */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] pointer-events-none hero-rays-spin">
        <svg
          width="800"
          height="800"
          viewBox="0 0 800 800"
          className="opacity-20 hero-rays-blur"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <polygon
              key={`ray-${i}`}
              points="400,400 395,0 405,0"
              fill="url(#rayGrad)"
              transform={`rotate(${i * 30} 400 400)`}
              opacity={0.3 + (i % 3) * 0.15}
            />
          ))}
        </svg>
      </div>

      {/* ===== EXPANDING GLOW RINGS ===== */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] pointer-events-none">
        {glowRings.map((ring) => (
          <div
            key={ring.id}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/30 ${ring.cls}`}
            style={{ width: ring.size, height: ring.size }}
          />
        ))}
      </div>

      {/* ===== SPARK PARTICLES ===== */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[3] pointer-events-none">
        {sparkPositions.map((spark) => (
          <div
            key={spark.id}
            className={`absolute rounded-full bg-primary hero-spark spark-${spark.dur}s spark-${spark.delay}`}
            style={{
              width: `${spark.size}px`,
              height: `${spark.size}px`,
              left: `${spark.left}px`,
              top: `${spark.top}px`,
              '--spark-drift': `${spark.drift}px`,
              '--spark-shadow-size': `${spark.size * 3}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ===== FLOATING PARTICLES ===== */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {floaters.map((f) => (
          <div
            key={f.id}
            className={`absolute w-1 h-1 rounded-full bg-primary/30 particle-${f.dur} particle-${f.delay}`}
            style={{ left: `${f.left}%`, bottom: '-10px' }}
          />
        ))}
      </div>

      {/* ===== CONTENT with parallax fade ===== */}
      <div
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center"
        style={{
          opacity: Math.max(0, contentOpacity),
          transform: `translateY(${contentTranslateY}px)`,
          transition: 'opacity 0.1s linear, transform 0.1s linear',
        }}
      >
        <div className="mb-12">
          <div className="relative inline-block">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[100px] sm:w-[400px] sm:h-[160px] md:w-[500px] md:h-[200px] rounded-full -z-10 hero-logo-glow" />
            <img
              src="/gym-logo.png"
              alt="Vikings Club Tanger"
              width={480}
              height={160}
              className="w-[280px] sm:w-[340px] md:w-[400px] lg:w-[480px] h-auto animate-hero-logo"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h1>
            {/* TRAIN LIKE A VIKING — brand slogan, never translated */}
            <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[0.25em] sm:tracking-[0.3em] text-foreground/80 animate-fade-in-up delay-500 viking-subtitle">
              TRAIN LIKE A
            </span>
            <span className="viking-word-wrap relative inline-block mt-3 leading-none">
              <span className="viking-slash" aria-hidden="true" />
              <span className="block text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] tracking-tighter viking-text-gradient animate-fade-in-up delay-700" style={{ fontFamily: "'Permanent Marker', cursive" }}>
                VIKING
              </span>
            </span>
          </h1>

          <p className="animate-fade-in-up delay-700 mx-auto max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-muted-foreground" style={{ fontFamily: "'Major Mono Display', monospace" }}>
            {t('subtitle')}
          </p>
        </div>

        <div data-pub-hide className="animate-fade-in-up delay-800 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => handleScrollTo('pricing')}
            size="lg"
            className="btn-primary text-white font-semibold rounded-lg px-8 h-12 text-base animate-pulse-red"
          >
            {t('start_journey')}
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <div data-pub-hide className="animate-fade-in-up mt-16 sm:mt-20 delay-1000">
          <div className="glass-card inline-flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 rounded-2xl px-6 py-5 sm:px-12 sm:divide-x sm:divide-border/20">
            {trustIndicators.map((item) => (
              <div key={item.id} className="flex items-center gap-3 px-4 sm:px-8">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 border border-primary/20">
                  <item.icon className="size-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-lg sm:text-xl font-bold text-foreground stat-glow">
                    {t(item.valueKey)}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {t(item.labelKey as keyof import('@/lib/translations').TranslationKeys)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div data-pub-hide className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-fade-in delay-1200">
        <button
          onClick={() => handleScrollTo('about')}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
          aria-label="Scroll to about section"
        >
          <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
          <div className="h-10 w-6 rounded-full border-2 border-current p-1">
            <div className="h-2 w-full rounded-full bg-current animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}