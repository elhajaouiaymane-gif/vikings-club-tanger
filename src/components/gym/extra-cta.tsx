'use client';
import { useEffect, useRef } from 'react';
import { Flame, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ExtraCTA() {
  var ref = useRef<HTMLElement>(null);
  useEffect(function() {
    var el = ref.current;
    if (!el) return;
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    el.querySelectorAll('.reveal').forEach(function(c) { obs.observe(c); });
    return function() { obs.disconnect(); };
  }, []);

  return (
    <section ref={ref} className="relative py-16 md:py-24 px-4 md:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-photo-img" style={{ backgroundImage: "url('/gym-interior.jpg')" }} />
      <div className="absolute inset-0 bg-photo-overlay" />
      <div className="absolute inset-0 bg-photo-cta" />
      <div className="bg-glow-fire absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center reveal">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 mb-6">
          <Zap className="w-4 h-4 text-red-400" />
          <span className="text-sm font-bold text-red-300 uppercase tracking-wider animate-pulse">Limited Spots Available</span>
        </div>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 heading-glow" style={{ fontFamily: "'Russo One', sans-serif" }}>
          READY TO TRANSFORM?
        </h2>
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
          Stop waiting for tomorrow. Your warrior journey starts TODAY. Join hundreds of Vikings who already made the change. First session is FREE.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={function() {
              var el = document.getElementById('pricing');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            size="lg"
            className="btn-primary text-white font-bold rounded-xl px-10 h-14 text-lg gap-2 animate-pulse-red"
          >
            <Flame className="w-5 h-5" />
            Get Strong Now
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button
            onClick={function() { window.open('https://wa.me/212611087382?text=Hello%20Vikings!%20I%20want%20to%20join!', '_blank'); }}
            size="lg"
            variant="outline"
            className="rounded-xl px-8 h-14 text-base font-semibold border-white/20 text-white/80 hover:bg-white/10 hover:text-white hover:border-white/40 gap-2"
          >
            Message Us on WhatsApp
          </Button>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6 text-white/40 text-sm">
          <span>✅ No Commitment</span>
          <span>✅ Expert Coaches</span>
        </div>
      </div>
    </section>
  );
}