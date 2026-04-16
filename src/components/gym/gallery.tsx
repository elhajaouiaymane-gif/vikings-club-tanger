'use client';

import { useEffect, useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import GalleryLightbox from './gallery-lightbox';

const gymPhotos = [
  { src: '/gym-real-1-sign.jpg', alt: 'Vikings Club Tanger — Main entrance', caption: 'Branch 1 — Sahat Madina', span: 'md:col-span-2', objectPos: 'object-center' },
  { src: '/gym-real-2-branch.jpg', alt: 'Vikings Club II — Branch 2 entrance', caption: 'Branch 2 — Mesnana', span: 'md:col-span-1', objectPos: 'object-center' },
  { src: '/gym-real-3-interior.jpg', alt: 'Vikings Club gym interior', caption: 'Training Floor', span: 'md:col-span-1', objectPos: 'object-center' },
  { src: '/gym-real-4-dumbbells.jpg', alt: 'Professional dumbbell section', caption: 'Free Weights', span: 'md:col-span-1', objectPos: 'object-center' },
  { src: '/gym-real-5-interior2.jpg', alt: 'Weight machines area', caption: 'Machines Area', span: 'md:col-span-2', objectPos: 'object-center' },
  { src: '/gym-real-6-interior3.jpg', alt: 'Cardio and training zone', caption: 'Cardio Zone', span: 'md:col-span-1', objectPos: 'object-center' },
  { src: '/gym-real-7-poster.jpg', alt: 'Vikings Club motivation', caption: 'Our Motivation', span: 'md:col-span-1', objectPos: 'object-center' },
  { src: '/gym-real-8-poster2.jpg', alt: 'Vikings Club training energy', caption: 'Train Like a Viking', span: 'md:col-span-1', objectPos: 'object-center' },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = section.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="relative py-20 md:py-28 bg-photo-overlay overflow-hidden">
      {/* Subtle gym poster background behind gallery */}
      <div
        className="bg-rune-pattern bg-glow-gold"
      />
      <div className="bg-rune-pattern-dust" />

      {/* Section Header */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center reveal">
          <div className="inline-flex items-center gap-2 mb-3">
            <Camera className="size-4 text-primary" />
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Our Gym
            </p>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Inside <span className="gradient-text">Vikings Club</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Take a look inside our facilities — modern equipment, vibrant energy,
            and a space built for warriors.
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {gymPhotos.map((photo, index) => (
            <button
              key={index}
              type="button"
              className={`reveal gallery-card group relative overflow-hidden rounded-xl border border-border/30 bg-card/30 hover:border-primary/30 active:scale-[0.98] transition-all duration-500 hover:shadow-[0_8px_40px_oklch(0.65_0.22_55/0.1)] text-left ${photo.span}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => openLightbox(index)}
              aria-label={`View ${photo.caption}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className={`h-full w-full ${photo.objectPos} object-cover transition-transform duration-700 group-hover:scale-105`}
                  loading="lazy"
                  draggable={false}
                />
                {/* Overlay on hover — always visible on touch */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent gallery-caption-overlay transition-opacity duration-500" />
                {/* Caption on hover — always visible on touch */}
                <div className="absolute bottom-0 left-0 right-0 p-4 gallery-caption-text transition-transform duration-500 flex items-end justify-between">
                  <p className="text-sm font-semibold text-white">
                    {photo.caption}
                  </p>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                    <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Tagline */}
        <div className="mt-10 text-center reveal">
          <p className="text-sm text-muted-foreground/70 italic">
            100% Hommes • 7/7 Jours • 8:00 AM – 11:00 PM
          </p>
        </div>
      </div>

      {/* Lightbox */}
      <GalleryLightbox
        photos={gymPhotos.map((p) => ({ src: p.src, alt: p.alt, caption: p.caption }))}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
}
