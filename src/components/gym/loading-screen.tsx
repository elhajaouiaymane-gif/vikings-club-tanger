'use client';

import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [hiding, setHiding] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    let pageLoaded = document.readyState === 'complete';

    const onLoad = () => { pageLoaded = true; };
    if (!pageLoaded) window.addEventListener('load', onLoad);

    // Progress bar animation
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min((elapsed / 2000) * 100, 100));
      if (elapsed >= 2000) clearInterval(interval);
    }, 30);

    // Check if both conditions met (2s elapsed + page loaded)
    const check = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= 2000 && pageLoaded) {
        clearInterval(interval);
        window.removeEventListener('load', onLoad);
        setHiding(true);
        setTimeout(() => setVisible(false), 500);
      } else {
        requestAnimationFrame(check);
      }
    };
    requestAnimationFrame(check);

    return () => {
      clearInterval(interval);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500 ${hiding ? 'opacity-0' : 'opacity-100'}`}
      style={{ background: 'oklch(0.07 0.015 30)' }}
    >
      {/* Ambient glow behind logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, oklch(0.65 0.22 55 / 0.4) 0%, transparent 70%)' }}
        />
      </div>

      {/* Logo */}
      <div className="relative animate-pulse-red rounded-full">
        <img
          src="/gym-logo.png"
          alt="Vikings Club Tanger"
          className="w-28 h-28 sm:w-36 sm:h-36 object-contain"
          style={{ filter: 'drop-shadow(0 0 20px oklch(0.65 0.22 55 / 0.5))' }}
        />
      </div>

      {/* Text */}
      <p className="gradient-text text-xl sm:text-2xl font-bold tracking-wider mt-8 uppercase">
        Forging Warriors...
      </p>

      {/* Loading bar */}
      <div className="mt-6 w-48 sm:w-56 h-1 rounded-full overflow-hidden"
        style={{ background: 'oklch(0.25 0.02 30)' }}
      >
        <div
          className="h-full rounded-full transition-[width] duration-100 ease-out"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, oklch(0.6 0.2 50), oklch(0.72 0.22 60), oklch(0.65 0.22 55))',
            boxShadow: '0 0 12px oklch(0.65 0.22 55 / 0.6)',
          }}
        />
      </div>

      {/* Subtle rune dots */}
      <div className="flex gap-3 mt-4">
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="block w-1.5 h-1.5 rounded-full"
            style={{
              background: 'oklch(0.65 0.22 55)',
              animation: `glowPulse 1.5s ease-in-out ${delay}ms infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
