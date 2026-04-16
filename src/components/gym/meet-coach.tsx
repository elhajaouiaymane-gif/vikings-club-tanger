'use client';
import { useEffect, useRef } from 'react';
import { Award, Dumbbell, Flame, Users, Target, Clock } from 'lucide-react';

var stats = [
  { icon: Clock, value: '8+', label: 'Years Experience' },
  { icon: Users, value: '500+', label: 'Warriors Trained' },
  { icon: Award, value: '12', label: 'Certifications' },
  { icon: Target, value: '98%', label: 'Satisfaction Rate' },
];

var specialties = [
  'CrossFit & Functional Training',
  'Bodybuilding & Hypertrophy',
  'Boxing & Combat Sports',
  'HIIT & Fat Loss Programs',
  'Nutrition & Meal Planning',
  'Injury Rehabilitation',
];

export default function MeetCoach() {
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
    <section id="coach" ref={ref} className="relative py-16 md:py-24 px-4 md:px-8 overflow-hidden">
      <div className="bg-glow-fire absolute inset-0 pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
            <Dumbbell className="w-7 h-7 text-primary" />
          </div>
          <span className="text-sm font-bold tracking-[0.2em] uppercase gradient-text">Meet The Coach</span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground heading-glow" style={{ fontFamily: "'Russo One', sans-serif" }}>YOUR VIKING COMMANDER</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Led by our head coach who has dedicated his life to forging warriors.
          </p>
        </div>
        <div className="section-divider mb-12" />

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Coach Image */}
          <div className="reveal">
            <div className="relative group">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-orange-900/40 to-amber-900/20 border border-white/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary/30 to-amber-600/30 flex items-center justify-center mb-4 border-2 border-primary/20">
                      <Flame className="w-16 h-16 text-primary/60" />
                    </div>
                    <p className="text-white/20 text-sm">Coach Photo</p>
                    <p className="text-white/10 text-xs mt-1">Place your photo here</p>
                  </div>
                </div>
              </div>
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
            </div>
          </div>

          {/* Coach Info */}
          <div className="reveal-stagger space-y-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">Coach Youssef</h3>
              <p className="text-primary font-medium mt-1">Head Coach &amp; Founder</p>
            </div>
            <blockquote className="text-lg md:text-xl text-foreground/80 italic border-l-4 border-primary/50 pl-4 leading-relaxed">
              &ldquo;Every warrior who walks through these doors has a battle to fight. My job is to make sure they win it.&rdquo;
            </blockquote>
            <div className="grid grid-cols-2 gap-4">
              {stats.map(function(s) {
                return (
                  <div key={s.label} className="glass-card rounded-xl p-4 text-center">
                    <s.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-xl md:text-2xl font-bold text-foreground">{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                  </div>
                );
              })}
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Specialties</h4>
              <div className="flex flex-wrap gap-2">
                {specialties.map(function(s) {
                  return (
                    <span key={s} className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary/80 border border-primary/15">{s}</span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}