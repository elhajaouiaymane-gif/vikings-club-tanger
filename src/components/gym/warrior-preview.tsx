'use client';

import { useState } from 'react';

const warriors = [
  { file: 'warrior-stats.png', section: 'Stats', desc: 'Warrior flexing with stone pillars & runes', emoji: '💪' },
  { file: 'warrior-services.png', section: 'Services', desc: 'Two warriors clashing swords — sparks', emoji: '⚔️' },
  { file: 'warrior-trainers.png', section: 'Trainers', desc: 'Viking chief pointing forward', emoji: '👑' },
  { file: 'warrior-gallery.png', section: 'Gallery', desc: 'Warriors marching into fog', emoji: '🚶' },
  { file: 'warrior-schedule.png', section: 'Schedule', desc: 'Warrior with glowing rune shield', emoji: '🛡️' },
  { file: 'warrior-pricing.png', section: 'Pricing', desc: 'Guards flanking treasure gate', emoji: '🚪' },
  { file: 'warrior-footer.png', section: 'Footer', desc: 'Longship sailing through storm', emoji: '🚢' },
  { file: 'warrior-testimonials.png', section: 'Testimonials', desc: 'King on throne, warriors kneeling', emoji: '🪑' },
  { file: 'warrior-cta.png', section: 'CTA (Join)', desc: 'Army charging with fire behind', emoji: '🔥' },
  { file: 'warrior-locations.png', section: 'Locations', desc: 'Viking fortress gates with torches', emoji: '🏰' },
  { file: 'warrior-why.png', section: 'Why-Vikings', desc: 'Close-up helmet, fire reflection', emoji: '⛑️' },
  { file: 'warrior-featured.png', section: 'Featured Reel', desc: 'Warrior raising axe, lightning', emoji: '⚡' },
];

export default function WarriorPreview() {
  const [viewMode, setViewMode] = useState<'grid' | 'fullbleed'>('grid');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="fixed inset-0 z-[9999] bg-black/95 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-white/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-2xl">⚔️</span> Warrior Backgrounds Preview
            </h2>
            <p className="text-sm text-white/60 mt-1">Review all 12 images — tell me which to keep, regenerate, or change</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'fullbleed' : 'grid')}
              className="px-3 py-1.5 text-xs rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              {viewMode === 'grid' ? '🔲 Full Bleed' : '📋 Grid View'}
            </button>
            <span className="text-xs text-white/40">Scroll down to see all</span>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {warriors.map((w, i) => (
            <div
              key={w.file}
              className="group relative rounded-xl overflow-hidden border border-white/10 hover:border-orange-500/50 transition-all cursor-pointer"
              onClick={() => setSelectedIndex(selectedIndex === i ? null : i)}
            >
              <div className="relative aspect-video bg-black">
                <img
                  src={`/${w.file}?v=${Date.now()}`}
                  alt={w.section}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Number badge */}
                <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/70 border border-orange-500/50 flex items-center justify-center text-sm font-bold text-orange-400">
                  {i + 1}
                </div>
                {/* Section badge */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 border border-white/20 text-xs font-medium text-white">
                  {w.section}
                </div>
              </div>
              <div className="bg-zinc-900/90 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{w.emoji}</span>
                  <span className="text-sm font-semibold text-white">{w.desc}</span>
                </div>
                <p className="text-xs text-white/40 mt-1">/{w.file}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Full Bleed View — simulates how backgrounds actually look */
        <div className="space-y-0">
          {warriors.map((w, i) => (
            <div
              key={w.file}
              className="relative h-[70vh] overflow-hidden border-b border-white/10"
            >
              {/* Background image with overlay — simulates actual site appearance */}
              <div
                className="absolute inset-0 bg-cover bg-center scale-105"
                style={{ backgroundImage: `url('/${w.file}?v=${Date.now()}')`, filter: 'brightness(0.5) contrast(1.1) saturate(1.2)' }}
              />
              {/* Dark overlay like bg-photo-overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/94 via-black/88 to-black/94" />
              {/* Content placeholder */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                <span className="text-4xl mb-3">{w.emoji}</span>
                <span className="text-xs uppercase tracking-widest text-orange-400 font-bold mb-2">Section {i + 1} of 12</span>
                <h3 className="text-3xl md:text-5xl font-black text-white mb-3" style={{ fontFamily: 'Anton, sans-serif' }}>
                  {w.section.toUpperCase()}
                </h3>
                <p className="text-sm text-white/60 max-w-md">{w.desc}</p>
                <p className="text-xs text-white/30 mt-4">/{w.file}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom instruction */}
      <div className="sticky bottom-0 z-10 bg-gradient-to-t from-black via-black/95 to-transparent px-4 py-6 text-center">
        <p className="text-white/50 text-sm">
          👆 Review all images above, then tell me:
        </p>
        <p className="text-white/40 text-xs mt-1">
          ✅ Keep | 🔄 Regenerate | ❌ Change concept
        </p>
      </div>
    </div>
  );
}
