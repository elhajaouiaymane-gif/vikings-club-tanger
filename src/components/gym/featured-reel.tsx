'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Instagram, ExternalLink, Heart, MessageCircle, Send, Bookmark, Volume2, MoreHorizontal, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';

const reelUrl = 'https://www.instagram.com/vikingsclubb/reel/DRQFubxjZTl/';

export default function FeaturedReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

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

    const revealElements = el.querySelectorAll('.reveal');
    revealElements.forEach((r) => observer.observe(r));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="reel" ref={sectionRef} className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 reveal">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
            <Instagram className="size-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              @vikingsclubb
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('reel_title_part1')}{' '}
            <span className="gradient-text">{t('reel_title_highlight')}</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base md:text-lg leading-relaxed">
            {t('reel_subtitle')}
          </p>
        </div>

        <div className="reveal delay-200">
          <a
            href={reelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block mx-auto max-w-[280px] sm:max-w-sm group"
          >
            <div className="relative mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 via-primary/5 to-blue-500/20 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-800 rounded-[2.5rem] p-[6px] shadow-2xl shadow-black/50 border border-zinc-700/50">
                <div className="relative bg-black rounded-[2.2rem] overflow-hidden">
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20 border border-zinc-800" />

                  <div className="relative aspect-[9/16] overflow-hidden">
                    <div className="bg-rune-pattern bg-glow-yellow" />
                    <div className="bg-rune-pattern-dust" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
                    
                    <div className="absolute inset-0 flex flex-col">
                      <div className="flex items-center justify-between px-5 pt-10">
                        <div className="flex items-center gap-2.5">
                          <div className="size-8 rounded-full bg-gradient-to-tr from-primary via-orange-400 to-amber-500 p-[2px]">
                            <div className="size-full rounded-full bg-black flex items-center justify-center">
                              <span className="text-[9px] font-black text-primary">V</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-white leading-tight">vikingsclubb</p>
                            <p className="text-[9px] text-white/60">Tangier, Morocco</p>
                          </div>
                        </div>
                        <MoreHorizontal className="size-5 text-white/80" />
                      </div>

                      <div className="mt-auto mb-4">
                        <div className="flex items-end justify-between px-4">
                          <div className="flex-1 pr-4">
                            <p className="text-[11px] font-semibold text-white mb-1">
                              vikingsclubb{' '}
                              <span className="font-normal text-white/70">Vikings Club Tanger 🔥</span>
                            </p>
                            <p className="text-[10px] text-white/50">
                              🏋️ Train like a Viking 💪
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-4 pb-2">
                            <button className="flex flex-col items-center gap-1" aria-label="Like">
                              <Heart className="size-6 text-white" />
                              <span className="text-[9px] text-white/80">2.4K</span>
                            </button>
                            <button className="flex flex-col items-center gap-1" aria-label="Comment">
                              <MessageCircle className="size-6 text-white" />
                              <span className="text-[9px] text-white/80">48</span>
                            </button>
                            <button className="flex flex-col items-center gap-1" aria-label="Share">
                              <Send className="size-5 text-white" />
                            </button>
                            <button className="flex flex-col items-center gap-1" aria-label="Save">
                              <Bookmark className="size-5 text-white" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-3 mx-4 flex items-center gap-2">
                          <div className="size-5 rounded-full bg-gradient-to-tr from-zinc-600 to-zinc-400 animate-spin" style={{ animationDuration: '3s' }} />
                          <div className="overflow-hidden flex-1">
                            <p className="text-[9px] text-white/60 whitespace-nowrap animate-marquee">
                              Original Audio — vikingsclubb &nbsp;&nbsp;🔊&nbsp;&nbsp; Original Audio — vikingsclubb &nbsp;&nbsp;🔊
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                      <div className="size-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300 border border-white/30">
                        <Play className="size-7 text-white ml-1" fill="white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-auto mt-2 w-32 h-1 rounded-full bg-zinc-600" />
            </div>

            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-300">
                <span>{t('reel_watch')}</span>
                <ChevronRight className="size-4" />
              </div>
            </div>
          </a>
        </div>

        <div className="reveal delay-400 mt-10 text-center">
          <Button
            onClick={() => {
              const el = document.getElementById('pricing');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary text-white font-semibold rounded-lg px-8 h-11 text-sm"
          >
            {t('reel_cta')}
          </Button>
        </div>
      </div>

    </section>
  );
}