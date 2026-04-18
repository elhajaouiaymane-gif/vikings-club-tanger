'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from '@/components/gym/navbar';
import Hero from '@/components/gym/hero';
import Stats from '@/components/gym/stats';
import WhyVikings from '@/components/gym/why-vikings';
import About from '@/components/gym/about';
import Services from '@/components/gym/services';
import MeetCoach from '@/components/gym/meet-coach';
import DayGym from '@/components/gym/day-gym';
import Testimonials from '@/components/gym/testimonials';
import FeaturedReel from '@/components/gym/featured-reel';
import ExtraCTA from '@/components/gym/extra-cta';
import Pricing from '@/components/gym/pricing';
import FAQ from '@/components/gym/faq';
import Locations from '@/components/gym/locations';
import { Footer } from '@/components/gym/footer';
import { ContactModal } from '@/components/gym/contact-modal';
import WhatsAppButton from '@/components/gym/whatsapp-button';
import AIChat from '@/components/gym/ai-chat';
import MusicToggle from '@/components/gym/music-toggle';
import BottomNav from '@/components/gym/bottom-nav';
import BackToTop from '@/components/gym/back-to-top';
import { startMusic } from '@/components/gym/music-toggle';
import { BookOpen, Eye, EyeOff } from 'lucide-react';

/* ── VIKING LOADING SCREEN ── */
function VikingLoadingScreen({ visible, onEnter }: { visible: boolean; onEnter: () => void }) {
  const [fading, setFading] = useState(false);
  const entered = useRef(false);
  var enter = useCallback(function () {
    if (entered.current || fading) return;
    entered.current = true;
    setFading(true);
    startMusic();
    setTimeout(onEnter, 800);
  }, [fading, onEnter]);

  useEffect(function () {
    if (!visible) return;
    var onKey = function () { enter(); };
    document.addEventListener('keydown', onKey);
    return function () { document.removeEventListener('keydown', onKey); };
  }, [visible, enter]);

  return (
    <div
      onClick={enter}
      className={
        'fixed inset-0 z-[9999] flex flex-col items-center justify-center cursor-pointer select-none ' +
        (visible && !fading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none') +
        ' ' + (fading ? 'scale-95' : 'scale-100')
      }
      style={{ transition: 'opacity 0.8s ease, transform 0.8s ease', background: 'radial-gradient(ellipse at center, #1a0a00 0%, #0a0a0a 60%, #000000 100%)' }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #F97316, transparent)', top: '20%', left: '50%', transform: 'translateX(-50%)', animation: 'pulse 4s ease-in-out infinite' }} />
      </div>

      <div className="relative w-44 h-44 sm:w-56 sm:h-56 mb-8">
        <div className="absolute inset-0 rounded-full border-2 border-primary/20" style={{ animation: 'spin 12s linear infinite' }} />
        {Array.from({ length: 6 }).map(function (_, i) {
          return <div key={'r1-' + i} className="absolute w-1.5 h-1.5 rounded-full bg-primary/50" style={{ top: '50%', left: '50%', transform: 'rotate(' + (i * 60) + 'deg) translateY(-96px) translate(-50%, -50%)' }} />;
        })}
        <div className="absolute inset-5 rounded-full border border-primary/25" style={{ animation: 'spin 8s linear infinite reverse' }} />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <img src="/gym-logo.png" alt="" className="w-28 sm:w-36 h-auto drop-shadow-[0_0_40px_rgba(249,115,22,0.4)]" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        </div>
      </div>

      <h2 className="text-white/80 text-xl sm:text-2xl font-bold mb-2 tracking-wider" style={{ fontFamily: "'Permanent Marker', cursive" }}>VIKINGS CLUB</h2>
      <p className="text-white/20 text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-10">Tangier&apos;s Elite Gym</p>

      <div className="flex flex-col items-center gap-3">
        <div className="px-6 py-3 rounded-full border border-primary/30 text-primary/70 text-xs sm:text-sm tracking-[0.2em] uppercase font-medium hover:border-primary/60 hover:text-primary transition-all duration-500" style={{ animation: 'tapPulse 2.5s ease-in-out infinite', boxShadow: '0 0 30px rgba(249,115,22,0.1)' }}>
          ⚔️ Tap to Enter ⚔️
        </div>
        <p className="text-white/15 text-[9px] tracking-[0.3em] uppercase">or press any key</p>
        <p className="text-primary/30 text-sm mt-3 italic" style={{ fontFamily: "'Permanent Marker', cursive" }}>Made by @elhajao</p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  );
}

/* ── PUBLICATION TOGGLE ── */
function PubToggle({ isPub, onToggle }: { isPub: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={'fixed top-4 right-4 z-[100] flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-300 backdrop-blur-xl ' + (isPub ? 'bg-primary/20 border-primary/40 text-primary hover:bg-primary/30' : 'bg-black/40 border-white/10 text-white/50 hover:text-white/80 hover:bg-black/60')}
      title={isPub ? 'Exit Publication Mode' : 'Publication Mode'}
    >
      {isPub ? <EyeOff className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
      <span className="text-[10px] font-medium tracking-wider uppercase hidden sm:inline">{isPub ? 'Exit' : 'Publication'}</span>
    </button>
  );
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'join' | 'contact'>('join');
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number } | null>(null);
  const [mounted, setMounted] = useState(false);
  const [loadingDone, setLoadingDone] = useState(false);
  const [isPublication, setIsPublication] = useState(false);

  useEffect(function () { setMounted(true); }, []);
  var handleEnter = useCallback(function () { setLoadingDone(true); }, []);

  useEffect(function () {
    if (!mounted) return;
    var handler = function () { openContactModal(); };
    window.addEventListener('open-contact-modal', handler);
    return function () { window.removeEventListener('open-contact-modal', handler); };
  }, []);

  var openJoinModal = function () { setModalMode('join'); setIsModalOpen(true); };
  var openContactModal = function () { setModalMode('contact'); setIsModalOpen(true); };
  var closeModal = function () { setIsModalOpen(false); };
  var handleSelectPlan = function (plan: { name: string; price: number }) { setSelectedPlan(plan); };

  if (!mounted) {
    return <VikingLoadingScreen visible={true} onEnter={function () { }} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <VikingLoadingScreen visible={!loadingDone} onEnter={handleEnter} />

      <div className={'flex flex-col min-h-screen ' + (isPublication ? 'publication-mode' : '')} style={{ opacity: loadingDone ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        <Navbar />
        <main className="flex-1">
          <Hero />
          <Stats />
          <WhyVikings />
          <About />
          <Services />
          <MeetCoach />
          <DayGym />
          <Testimonials />
          <FeaturedReel />
          <ExtraCTA />
          <Pricing onSelectPlan={handleSelectPlan} />
          <FAQ />
          <Locations selectedPlan={selectedPlan} />
        </main>
        <Footer />
      </div>

      <ContactModal isOpen={isModalOpen} onClose={closeModal} mode={modalMode} />
      {!isPublication && <WhatsAppButton />}
      {!isPublication && <AIChat />}
      <MusicToggle center={isPublication} />
      {!isPublication && <BottomNav />}
      <BackToTop />
      {loadingDone && <PubToggle isPub={isPublication} onToggle={function () { setIsPublication(!isPublication); }} />}
    </div>
  );
}