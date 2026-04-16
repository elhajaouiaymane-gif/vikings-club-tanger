'use client';
import { useEffect, useRef } from 'react';
import { Camera } from 'lucide-react';

var moments = [
  { label: 'Morning Pump', desc: 'Early warriors crushing it', gradient: 'from-orange-900/60 to-red-900/40', icon: '🌅' },
  { label: 'CrossFit Zone', desc: 'High intensity group sessions', gradient: 'from-amber-900/50 to-orange-900/40', icon: '🔥' },
  { label: 'Boxing Ring', desc: 'Combat sports training', gradient: 'from-red-900/50 to-rose-900/40', icon: '🥊' },
  { label: 'Heavy Lifts', desc: 'Strength & power zone', gradient: 'from-emerald-900/50 to-teal-900/40', icon: '🏋️' },
  { label: 'Cardio Area', desc: 'Endurance training', gradient: 'from-sky-900/50 to-blue-900/40', icon: '🏃' },
  { label: 'Team Spirit', desc: 'The Vikings community', gradient: 'from-violet-900/50 to-purple-900/40', icon: '👥' },
];

export default function DayGym() {
  var ref = useRef<HTMLElement>(null);
  useEffect(function() {
    var el = ref.current;
    if (!el) return;
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    el.querySelectorAll('.reveal, .reveal-stagger').forEach(function(c) { obs.observe(c); });
    return function() { obs.disconnect(); };
  }, []);

  return (
    <section id="gallery" ref={ref} className="relative py-16 md:py-20 px-4 md:px-8 overflow-hidden">
      <div className="bg-glow-gold absolute inset-0 pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-10 reveal">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
            <Camera className="w-7 h-7 text-primary" />
          </div>
          <span className="text-sm font-bold tracking-[0.2em] uppercase gradient-text">Gallery</span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground heading-glow" style={{ fontFamily: "'Russo One', sans-serif" }}>A DAY AT VIKINGS</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Step inside our gym and feel the energy. Every day is a battle worth fighting.
          </p>
        </div>
        <div className="section-divider mb-10" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {moments.map(function(m, i) {
            var tall = i === 0 || i === 3;
            return (
              <div key={m.label} className={'reveal-stagger group relative rounded-2xl overflow-hidden border border-white/5 cursor-pointer ' + (tall ? 'md:row-span-2 min-h-[200px] md:min-h-0' : 'min-h-[180px]')} style={{ transitionDelay: (i * 80) + 'ms' }}>
                <div className={'absolute inset-0 bg-gradient-to-br ' + m.gradient + ' transition-all duration-500 group-hover:scale-110'} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">{m.icon}</span>
                  <h3 className="font-bold text-white text-sm md:text-base mb-1">{m.label}</h3>
                  <p className="text-white/50 text-xs group-hover:text-white/70 transition-colors">{m.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-center mt-6 text-xs text-muted-foreground/50 reveal">📸 Replace with real gym photos for maximum impact</p>
      </div>
    </section>
  );
}