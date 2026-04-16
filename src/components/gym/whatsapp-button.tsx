'use client';

import { useState, useEffect } from 'react';

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 transition-all duration-500 ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      {visible && (
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
      )}

      <a
        href="https://wa.me/212611087382?text=Hello%20Vikings%20Club!"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/50 active:scale-95"
      >
        <svg
          viewBox="0 0 32 32"
          fill="currentColor"
          className="w-5 h-5 md:w-6 md:h-6"
        >
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.132 6.744 3.054 9.378L1.054 31.29l6.118-1.96A15.914 15.914 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.35 22.614c-.39 1.1-1.932 2.014-3.17 2.28-.846.18-1.95.322-5.67-1.218-4.762-1.972-7.826-6.8-8.064-7.114-.23-.314-1.93-2.572-1.93-4.904s1.224-3.48 1.658-3.956c.434-.478.948-.598 1.264-.598.316 0 .632.002.908.014.292.014.684-.11 1.07.814.394.94 1.336 3.266 1.454 3.502.118.236.196.512.04.826-.158.314-.236.508-.472.784-.236.274-.498.614-.71.824-.238.236-.486.492-.21.966.276.474 1.226 2.024 2.632 3.278 1.808 1.616 3.332 2.118 3.808 2.354.474.238.75.198 1.028-.118.276-.316 1.186-1.38 1.502-1.856.316-.474.632-.394 1.066-.236.434.158 2.742 1.294 3.212 1.53.47.236.784.354.902.55.118.196.118 1.124-.272 2.224z" />
        </svg>
      </a>
    </div>
  );
}