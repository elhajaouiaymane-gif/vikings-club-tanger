'use client';

import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Instagram, Twitter } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const trainers = [
  {
    name: 'Youssef Bennani',
    initials: 'YB',
    specialty: 'Head Coach / Musculation & Crossfit',
    bio: '10+ years of experience in strength training and athletic coaching in Tangier',
  },
  {
    name: 'Karim Tazi',
    initials: 'KT',
    specialty: 'Crossfit & Functional Training',
    bio: 'Certified Crossfit Level 2 trainer specializing in high-intensity workouts',
  },
  {
    name: 'Amine Fassi',
    initials: 'AF',
    specialty: 'Personal Coaching & Nutrition',
    bio: 'Sports nutrition expert with personalized coaching for all fitness levels',
  },
  {
    name: 'Omar Lahlou',
    initials: 'OL',
    specialty: 'Cardio & Group Training',
    bio: 'Energetic group trainer focused on cardio endurance and team motivation',
  },
];

function TrainerCard({
  trainer,
  index,
}: {
  trainer: (typeof trainers)[number];
  index: number;
}) {
  return (
    <Card
      className="card-glow bg-card/80 backdrop-blur-sm border-border/50 text-center group"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <CardContent className="flex flex-col items-center gap-4 pt-8 pb-6 px-6">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-shadow duration-400 ring-2 ring-orange-500/10 group-hover:ring-orange-500/30">
          {trainer.initials}
        </div>

        {/* Info */}
        <div className="space-y-1.5">
          <h3 className="text-lg font-semibold text-foreground">
            {trainer.name}
          </h3>
          <p className="text-sm font-medium text-primary">
            {trainer.specialty}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px] mx-auto">
            {trainer.bio}
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            aria-label={`${trainer.name} Instagram`}
            className="w-9 h-9 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
          >
            <Instagram className="w-4 h-4" />
          </button>
          <button
            aria-label={`${trainer.name} Twitter`}
            className="w-9 h-9 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
          >
            <Twitter className="w-4 h-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Trainers() {
  useScrollReveal();

  return (
    <section id="trainers" className="py-20 md:py-28 relative bg-photo-overlay overflow-hidden">
      {/* Real gym photo background — reverse Ken Burns */}
      <div
        className="bg-rune-pattern bg-glow-silver"
      />
      <div className="bg-rune-pattern-dust" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 reveal">
          <span className="text-sm font-semibold tracking-widest text-primary uppercase">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4 text-foreground">
            Expert Trainers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Our certified professionals bring decades of combined experience to help
            you reach your fitness goals with personalized guidance and unwavering
            support.
          </p>
          <div className="section-divider max-w-xs mx-auto mt-8" />
        </div>

        {/* Trainer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((trainer, index) => (
            <div
              key={trainer.name}
              className="reveal-stagger"
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <TrainerCard trainer={trainer} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
