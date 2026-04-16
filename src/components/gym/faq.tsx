'use client';
import { useState, useEffect, useRef } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

var faqs = [
  { q: 'How much does a membership cost?', a: 'We have plans starting from 250 MAD/month. Our 6-month plan at 1,100 MAD is the most popular — you save 400 MAD! First session is always FREE for new warriors. 💪' },
  { q: "I'm a complete beginner. Is this gym for me?", a: "Absolutely! We welcome warriors of ALL levels. Our coaches will create a personalized program for you, and we'll guide you through every exercise step by step. No judgment, only support! ⚔️" },
  { q: 'What are the opening hours?', a: 'We are open 7 days a week: Monday to Sunday, 6:00 AM to 9:00 PM. Come early morning for the best equipment availability!' },
  { q: 'Can I try a session before subscribing?', a: 'Yes! Your first session is completely FREE. Just walk in, bring your motivation, and we\'ll take care of the rest. No commitment needed! 🔥' },
  { q: 'Do you have female trainers?', a: 'Yes, we have both male and female professional trainers available. We ensure a comfortable environment for everyone. Contact us to schedule with a female coach.' },
  { q: 'What equipment and facilities do you have?', a: 'Both branches are fully equipped with: premium machines & free weights, cardio zones, CrossFit areas, boxing bags, locker rooms with showers, and dedicated stretching areas.' },
  { q: 'Is parking available?', a: 'Yes! Branch 1 (City Center) has street parking nearby. Branch 2 (Marshan) has a dedicated parking area. No stress about parking! 🚗' },
  { q: 'Do you offer personal training?', a: 'Yes! We offer 1-on-1 personal training sessions with certified coaches. Whether you want to lose weight, build muscle, or prepare for competition, we have the right program for you. Message us on WhatsApp for pricing! 📲' },
];

export default function FAQ() {
  var ref = useRef<HTMLElement>(null);
  var openRef = useState<number | null>(null);
  var open = openRef[0];
  var setOpen = openRef[1];

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
    <section id="faq" ref={ref} className="relative py-16 md:py-20 px-4 md:px-8 overflow-hidden">
      <div className="bg-rune-pattern absolute inset-0 pointer-events-none" />
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-10 reveal">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
            <HelpCircle className="w-7 h-7 text-primary" />
          </div>
          <span className="text-sm font-bold tracking-[0.2em] uppercase gradient-text">FAQ</span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground heading-glow" style={{ fontFamily: "'Russo One', sans-serif" }}>GOT QUESTIONS?</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Everything you need to know before joining the Vikings family.
          </p>
        </div>
        <div className="section-divider mb-10" />
        <div className="space-y-3">
          {faqs.map(function(faq, i) {
            var isOpen = open === i;
            return (
              <div key={i} className={'reveal-stagger glass-card rounded-xl overflow-hidden transition-all duration-300 ' + (isOpen ? 'border-primary/30 shadow-lg shadow-primary/5' : '')} style={{ transitionDelay: (i * 80) + 'ms' }}>
                <button onClick={function() { setOpen(isOpen ? null : i); }} className="w-full flex items-center justify-between p-5 text-left cursor-pointer">
                  <span className={'font-semibold text-sm md:text-base pr-4 transition-colors duration-200 ' + (isOpen ? 'text-primary' : 'text-foreground')}>{faq.q}</span>
                  <ChevronDown className={'w-5 h-5 shrink-0 text-muted-foreground transition-transform duration-300 ' + (isOpen ? 'rotate-180 text-primary' : '')} />
                </button>
                <div className={'overflow-hidden transition-all duration-300 ' + (isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0')}>
                  <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}