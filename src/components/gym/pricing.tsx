'use client';

import { useEffect, useRef, useState, useCallback } from "react";
import { Check, Flame, Zap } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PricingProps {
  onSelectPlan: (plan: { name: string; price: number }) => void;
}

function TiltCard({ children, popular, index, style }: {
  children: React.ReactNode; popular: boolean; index: number; style?: React.CSSProperties;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  var handleMouseMove = useCallback(function(e: React.MouseEvent) {
    if (!cardRef.current) return;
    var rect = cardRef.current.getBoundingClientRect();
    var x = (e.clientY - rect.top) / rect.height;
    var y = (e.clientX - rect.left) / rect.width;
    setTilt({ x: (x - 0.5) * -10, y: (y - 0.5) * 10 });
  }, []);

  return (
    <div ref={cardRef} className="reveal pricing-tilt-card" style={{ ...style, transform: 'perspective(1000px) rotateX(' + tilt.x + 'deg) rotateY(' + tilt.y + 'deg) ' + (popular ? 'scale(1.02)' : ''), transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out, opacity 0.7s ease-out' }} onMouseMove={handleMouseMove} onMouseEnter={function() { setIsHovered(true); }} onMouseLeave={function() { setTilt({ x: 0, y: 0 }); setIsHovered(false); }}>
      <div className="pricing-card-shine" style={{ opacity: isHovered ? 1 : 0, background: 'radial-gradient(circle at ' + ((tilt.y / 10) * 50 + 50) + '% ' + ((-tilt.x / 10) * 50 + 50) + '%, oklch(1 0 0 / 0.12) 0%, transparent 60%)', transition: 'opacity 0.3s ease' }} />
      {children}
    </div>
  );
}

export default function Pricing({ onSelectPlan }: PricingProps) {
  var sectionRef = useRef<HTMLElement>(null);

  var plans = [
    { name: 'Starter', price: 250, period: 'month', popular: false, badge: '', cta: 'Get Started', features: ['Full gym access', 'Musculation zone', 'Locker room & showers', 'CrossFit area'] },
    { name: 'Warrior', price: 650, period: '3 months', popular: false, badge: 'Save 100 MAD', cta: 'Join Now', features: ['Full gym access', 'Musculation zone', 'CrossFit classes', 'Boxing sessions', 'Save 100 MAD vs monthly'] },
    { name: 'Champion', price: 1100, period: '6 months', popular: true, badge: 'MOST POPULAR ⚔️', cta: 'Get Strong Now', features: ['Full gym access', 'All group classes', 'CrossFit + Boxing', 'Personal coaching', 'Save 400 MAD vs monthly'] },
    { name: 'Legend', price: 1800, period: 'year', popular: false, badge: 'BEST VALUE 🏆', cta: 'Start Your Journey', features: ['Full unlimited access', 'All classes included', 'CrossFit + Boxing', '1-on-1 coaching', 'Nutrition plan', 'Save 1,200 MAD!'] },
  ];

  useEffect(function() {
    var section = sectionRef.current;
    if (!section) return;
    var obs = new IntersectionObserver(function(entries) { entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); }); }, { threshold: 0.15 });
    section.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });
    return function() { obs.disconnect(); };
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="relative py-16 md:py-24 px-4 md:px-8 bg-background overflow-hidden">
      <div className="mesh-gradient absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-6 reveal">
          <span className="text-sm font-bold tracking-[0.2em] uppercase gradient-text">PRICING</span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground heading-glow" style={{ fontFamily: "'Russo One', sans-serif" }}>CHOOSE YOUR BATTLE</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">Invest in yourself. Every MAD counts towards your transformation.</p>
        </div>

        {/* Urgency Badge */}
        <div className="text-center mb-10 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20">
            <Zap className="w-4 h-4 text-red-400" />
            <span className="text-sm font-semibold text-red-300">🔥 Limited spots remaining this month — Join now!</span>
          </div>
        </div>

        <div className="section-divider mb-10" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map(function(plan, index) {
            return (
              <TiltCard key={plan.name} popular={plan.popular} index={index} style={{ transitionDelay: (index * 150) + 'ms' }}>
                <Card className={'relative glass-card h-full overflow-visible ' + (plan.popular ? 'border-2 border-primary shadow-[0_0_60px_oklch(0.65_0.22_55/0.25),0_0_120px_oklch(0.65_0.22_55/0.1)]' : 'border')}>
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                      <Badge className={'text-white font-bold px-4 py-1.5 text-xs tracking-wider border-0 rounded-md ' + (plan.popular ? 'popular-badge' : 'bg-primary/80')}>{plan.badge}</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-2 pt-8">
                    <CardTitle className="text-lg font-bold tracking-[0.15em] text-muted-foreground uppercase">{plan.name}</CardTitle>
                    <div className="mt-4 flex items-baseline justify-center gap-1">
                      <span className="text-sm text-muted-foreground">MAD</span>
                      <span className="text-4xl sm:text-5xl font-extrabold gradient-text">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">/{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 px-6">
                    <div className="section-divider mb-6" />
                    <ul className="space-y-3">
                      {plan.features.map(function(feature) {
                        return <li key={feature} className="flex items-start gap-3"><Check className="w-5 h-5 text-primary shrink-0 mt-0.5" /><span className="text-sm text-foreground/90">{feature}</span></li>;
                      })}
                    </ul>
                  </CardContent>
                  <CardFooter className="px-6 pb-8 pt-4">
                    <Button onClick={function() { onSelectPlan({ name: plan.name, price: plan.price }); }} className={'w-full py-3.5 text-sm font-bold tracking-wider uppercase rounded-lg gap-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] ' + (plan.popular ? 'btn-primary text-white border-0' : 'btn-outline bg-transparent')} variant={plan.popular ? 'default' : 'outline'} size="lg">
                      {plan.popular && <Flame className="w-4 h-4" />}
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              </TiltCard>
            );
          })}
        </div>

        <div className="text-center mt-10 reveal">
          <p className="text-sm text-muted-foreground">All plans include: <span className="text-foreground font-medium">free first session</span> · <span className="text-foreground font-medium">no hidden fees</span> · <span className="text-foreground font-medium">cancel anytime</span></p>
        </div>
      </div>
    </section>
  );
}