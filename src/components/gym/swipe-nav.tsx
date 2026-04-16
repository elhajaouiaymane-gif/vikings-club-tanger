'use client';

import { useEffect, useRef } from 'react';

const sectionIds = ['home', 'about', 'services', 'gallery', 'trainers', 'schedule', 'pricing', 'testimonials', 'locations'];

export default function SwipeNav() {
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isSwiping = useRef(false);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      isSwiping.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - touchStartX.current;
      const dy = e.touches[0].clientY - touchStartY.current;

      if (!isSwiping.current && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 20) {
        isSwiping.current = true;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isSwiping.current) return;

      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const threshold = 50;

      if (Math.abs(dx) < threshold) return;

      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      let currentSection = 0;
      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < vh * 0.6) currentSection = i;
        }
      }

      let targetSection: number;
      if (dx < 0) {
        targetSection = Math.min(currentSection + 1, sectionIds.length - 1);
      } else {
        targetSection = Math.max(currentSection - 1, 0);
      }

      if (targetSection !== currentSection) {
        const targetEl = document.getElementById(sectionIds[targetSection]);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }

      isSwiping.current = false;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return null;
}
