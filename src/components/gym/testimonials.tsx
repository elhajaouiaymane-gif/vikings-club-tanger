'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Camera, MapPin } from 'lucide-react';

const testimonials = [
  { quote: "Good gym overall. Gets a bit crowded in the evening but mornings are chill. You can get a serious workout done without much waiting before 10 AM.", name: 'Yassine Benali', role: 'Training since 2023', location: 'Socco Alto' },
  { quote: "Salle propre en général, mais aux heures de pointe il y a un peu de monde donc faut s'organiser. Sinon les coachs sont corrects et le matériel est bien entretenu.", name: 'Amine Tazi', role: 'Member for 1 year', location: 'Centre Ville' },
  { quote: "Been training here for a while now, I can see progress but you need discipline on your own too. The coaches give good advice but you have to ask for it, they don't always come to you.", name: 'Omar Berrada', role: '2 years at Vikings', location: 'Marshan' },
  { quote: "Franchement ça fait le job. Rien de luxe mais tout ce qu'il faut pour progresser. Bonne ambiance entre les gars et les prix sont corrects pour ce que t'as.", name: 'Redouane El Idrissi', role: 'Member for 6 months', location: 'Ibn Batouta' },
  { quote: "Bdiit hna mn ch'hour, kaynin l'amélioration mais khassak tkoun mundabb bi wahdek hit mashi kolchi kayt3aleb m3ak. L'mou3adil khdam f 7alou.", name: 'Ayoub Filali', role: 'New member', location: 'Malabata' },
  { quote: "It's solid for the price. Not fancy, but you can get serious workouts done. The CrossFit zone is the best part honestly, coach Youssef knows his stuff.", name: 'Mehdi Ouazzani', role: 'Crossfit member', location: 'Tangier City' },
];

function StarRating() {
  return (
    <div className="flex gap-1" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map(function(_, i) {
        return <Star key={i} className="w-5 h-5 text-amber-400" fill="currentColor" />;
      })}
    </div>
  );
}

function getInitials(name: string) {
  return name.split(' ').map(function(n) { return n[0]; }).join('');
}

var gradients = [
  'from-orange-500 to-amber-600',
  'from-rose-500 to-pink-600',
  'from-emerald-500 to-teal-600',
  'from-violet-500 to-purple-600',
  'from-sky-500 to-blue-600',
  'from-fuchsia-500 to-pink-600',
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);
  const autoSlideTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = testimonials.length;

  const goToSlide = useCallback(function(index: number) {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((index + total) % total);
  }, [isTransitioning, total]);

  const nextSlide = useCallback(function() { goToSlide(currentIndex + 1); }, [currentIndex, goToSlide]);
  const prevSlide = useCallback(function() { goToSlide(currentIndex - 1); }, [currentIndex, goToSlide]);

  useEffect(function() {
    if (isPaused) { if (autoSlideTimer.current) { clearInterval(autoSlideTimer.current); autoSlideTimer.current = null; } return; }
    autoSlideTimer.current = setInterval(function() { setCurrentIndex(function(p) { return (p + 1) % total; }); }, 5000);
    return function() { if (autoSlideTimer.current) { clearInterval(autoSlideTimer.current); autoSlideTimer.current = null; } };
  }, [isPaused, total]);

  useEffect(function() { if (!isTransitioning) return; var t = setTimeout(function() { setIsTransitioning(false); }, 500); return function() { clearTimeout(t); }; }, [isTransitioning, currentIndex]);

  useEffect(function() {
    var section = sectionRef.current; if (!section) return;
    var obs = new IntersectionObserver(function(entries) { entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); }); }, { threshold: 0.1 });
    section.querySelectorAll('.reveal-stagger').forEach(function(el) { obs.observe(el); });
    section.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });
    return function() { obs.disconnect(); };
  }, []);

  var handleTouchStart = useCallback(function(e: React.TouchEvent) { touchStartX.current = e.touches[0].clientX; touchDeltaX.current = 0; }, []);
  var handleTouchMove = useCallback(function(e: React.TouchEvent) { if (touchStartX.current === null) return; touchDeltaX.current = e.touches[0].clientX - touchStartX.current; }, []);
  var handleTouchEnd = useCallback(function() {
    if (touchStartX.current === null) return;
    if (touchDeltaX.current < -50) nextSlide();
    else if (touchDeltaX.current > 50) prevSlide();
    touchStartX.current = null; touchDeltaX.current = 0;
  }, [nextSlide, prevSlide]);

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-16 md:py-20 px-4 md:px-8 bg-background overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-10 reveal">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
            <Camera className="w-7 h-7 text-primary" />
          </div>
          <span className="text-sm font-bold tracking-[0.2em] uppercase gradient-text">TESTIMONIALS</span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground" style={{ fontFamily: "'Russo One', sans-serif" }}>WARRIOR REVIEWS</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">Real reviews from real Vikings in Tangier.</p>
        </div>

        <div className="section-divider mb-10" />

        <div className="relative reveal-stagger" onMouseEnter={function() { setIsPaused(true); }} onMouseLeave={function() { setIsPaused(false); }}>
          <div className="overflow-hidden rounded-2xl">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: 'translateX(-' + (currentIndex * 100) + '%)' }} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
              {testimonials.map(function(tm, index) {
                return (
                  <div key={tm.name} className="w-full shrink-0 flex items-center justify-center px-4">
                    <div className="w-full max-w-2xl mx-auto">
                      <div className="glass-card relative rounded-2xl p-8 md:p-10 flex flex-col items-center text-center gap-5">
                        <Quote className="w-12 h-12 text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-amber-600" strokeWidth={1.5} />
                        <StarRating />
                        <p className="text-lg md:text-xl text-foreground/90 leading-relaxed font-light">&ldquo;{tm.quote}&rdquo;</p>
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                        <div className="flex items-center gap-3">
                          <div className={'w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg ' + gradients[index % gradients.length]}>{getInitials(tm.name)}</div>
                          <div className="min-w-0 text-left">
                            <p className="font-semibold text-sm md:text-base text-foreground truncate">{tm.name}</p>
                            <p className="text-xs md:text-sm text-muted-foreground truncate">{tm.role}</p>
                            <p className="text-[10px] text-primary/60 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{tm.location}</p>
                          </div>
                        </div>
                        <span className="text-[11px] text-muted-foreground/50 font-mono">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <button onClick={prevSlide} className="absolute left-2 md:left-[-18px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full glass-card flex items-center justify-center text-foreground/70 hover:text-foreground hover:border-primary/30 transition-all duration-200 cursor-pointer" aria-label="Previous"><ChevronLeft className="w-5 h-5" /></button>
          <button onClick={nextSlide} className="absolute right-2 md:right-[-18px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full glass-card flex items-center justify-center text-foreground/70 hover:text-foreground hover:border-primary/30 transition-all duration-200 cursor-pointer" aria-label="Next"><ChevronRight className="w-5 h-5" /></button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-8" role="tablist">
          {testimonials.map(function(_, index) {
            return <button key={index} onClick={function() { goToSlide(index); }} className={'h-2.5 rounded-full transition-all duration-300 cursor-pointer ' + (index === currentIndex ? 'w-8 bg-gradient-to-r from-orange-400 to-amber-600' : 'w-2.5 bg-foreground/20 hover:bg-foreground/40')} role="tab" aria-selected={index === currentIndex} />;
          })}
        </div>
      </div>
    </section>
  );
}