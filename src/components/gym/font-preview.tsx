'use client';

import { useState } from 'react';

const fonts = [
  { name: 'Bebas Neue', var: 'var(--font-bebas)', desc: 'Tall, tight, military style — most popular gym font' },
  { name: 'Oswald', var: 'var(--font-oswald)', desc: 'Bold condensed, strong and powerful' },
  { name: 'Anton', var: 'var(--font-anton)', desc: 'Ultra heavy, maximum impact' },
  { name: 'Montserrat', var: 'var(--font-montserrat)', desc: 'Modern bold, premium fitness brand' },
  { name: 'Russo One', var: 'var(--font-russo)', desc: 'Blocky military, very gym-like' },
  { name: 'Teko', var: 'var(--font-teko)', desc: 'Condensed sharp, warrior viking vibe' },
];

export default function FontPreview() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[999] max-w-md mx-auto">
      <button
        onClick={() => setSelected(selected === null ? -1 : null)}
        className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-accent transition-colors shadow-lg"
      >
        {selected !== null ? '✕ Close Font Preview' : '🔤 Preview VIKING Fonts'}
      </button>
      {selected !== null && (
        <div className="mt-2 bg-card border border-border rounded-xl shadow-2xl overflow-hidden max-h-[70vh] overflow-y-auto">
          {fonts.map((font, i) => (
            <button
              key={font.name}
              onClick={() => {}}
              className="w-full text-left px-5 py-4 border-b border-border last:border-b-0 hover:bg-accent/50 transition-colors"
            >
              <p className="text-xs text-muted-foreground mb-1">{font.desc}</p>
              <p
                className="text-4xl tracking-tight leading-none gradient-text"
                style={{ fontFamily: font.var, fontWeight: 700 }}
              >
                VIKING
              </p>
              <p className="text-[10px] text-muted-foreground/50 mt-1 uppercase tracking-widest">
                {font.name}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
