'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface CTASectionProps {
  onOpenModal: () => void;
  onContactModal: () => void;
}

export function CTASection({ onOpenModal, onContactModal }: CTASectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

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

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32 bg-photo-overlay bg-photo-cta bg-photo-glow"
    >
      {/* Real gym entrance photo as full background — Ken Burns */}
      <div
        className="bg-rune-pattern bg-glow-fire"
      />
      <div className="bg-rune-pattern-dust" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Reveal animation wrapper */}
        <div className="reveal">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Ready to Join the{' '}
            <span className="gradient-text">Vikings?</span>
          </h2>
        </div>

        <div className="reveal delay-200">
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Join thousands of members who have already transformed their lives. Your journey starts today.
          </p>
        </div>

        <div className="reveal delay-400 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={onOpenModal}
            className="btn-primary h-13 px-8 text-base font-semibold text-white rounded-lg"
          >
            Join Now — It&apos;s Free to Start
          </Button>
          <Button
            onClick={onContactModal}
            variant="outline"
            className="btn-outline h-13 px-8 text-base font-semibold rounded-lg"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
