'use client';

import { ArrowRight } from 'lucide-react';

interface SectionCTAProps {
  text: string;
  buttonText: string;
  onClick: () => void;
}

export function SectionCTA({ text, buttonText, onClick }: SectionCTAProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-10 md:py-14 reveal">
      <p className="text-lg sm:text-xl font-semibold gradient-text text-center">
        {text}
      </p>
      <button
        onClick={onClick}
        className="btn-primary text-white font-semibold rounded-lg px-6 h-11 text-sm flex items-center gap-2 shrink-0"
      >
        {buttonText}
        <ArrowRight className="size-4" />
      </button>
    </div>
  );
}
