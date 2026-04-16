'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Volume2, VolumeX, SkipBack, SkipForward,
  Play, Pause, X, Music,
} from 'lucide-react';

const TRACKS = [
  { src: '/music/main1.mp3', name: 'Track 1', icon: '⚔️', color: '#F97316', theme: 'fire' },
  { src: '/music/main2.mp3', name: 'Track 2', icon: '🔥', color: '#EF4444', theme: 'ember' },
  { src: '/music/main3.mp3', name: 'Track 3', icon: '🛡️', color: '#A855F7', theme: 'thunder' },
  { src: '/music/main4.mp3', name: 'Track 4', icon: '⚡', color: '#EAB308', theme: 'lightning' },
  { src: '/music/main5.mp3', name: 'Track 5', icon: '🐺', color: '#22C55E', theme: 'forest' },
  { src: '/music/main6.mp3', name: 'Track 6', icon: '🪓', color: '#EC4899', theme: 'blood' },
  { src: '/music/main6b.mp3', name: 'Track 6.5', icon: '💀', color: '#F43F5E', theme: 'dark' },
  { src: '/music/main7.mp3', name: 'Track 7', icon: '🐉', color: '#06B6D4', theme: 'ice' },
  { src: '/music/main8.mp3', name: 'Track 8', icon: '🏴', color: '#8B5CF6', theme: 'magic' },
];

var _audioEl: HTMLAudioElement | null = null;
var _vol = 0.5;
var _shouldPlay = false;
var _currentTrackIdx = 0;

export function startMusic() {
  _shouldPlay = true;
  if (_audioEl) {
    _audioEl.volume = _vol;
    _audioEl.play().then(function() {
      document.dispatchEvent(new Event('viking-music-start'));
    }).catch(function() {});
  }
}

export function stopMusic() {
  if (_audioEl) _audioEl.pause();
}

export function getCurrentTrack() {
  return TRACKS[_currentTrackIdx];
}

function Equalizer({ playing, color, small }: { playing: boolean; color: string; small?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const barsRef = useRef<number[]>(Array(12).fill(0));

  useEffect(function() {
    var canvas = canvasRef.current;
    if (!canvas) return;
    var c = canvas.getContext('2d');
    if (!c) return;
    var w = canvas.width = small ? 80 : 120;
    var h = canvas.height = small ? 20 : 32;
    var n = 12;
    var bW = small ? 3 : 4;
    var gap = small ? 4 : 6;
    var x0 = (w - (n * bW + (n - 1) * gap)) / 2;
    var draw = function() {
      if (!c) return;
      c.clearRect(0, 0, w, h);
      for (var i = 0; i < n; i++) {
        if (playing) {
          var t = Math.random() * h * 0.85 + h * 0.15;
          barsRef.current[i] += (t - barsRef.current[i]) * 0.3;
        } else {
          barsRef.current[i] *= 0.9;
          if (barsRef.current[i] < 1) barsRef.current[i] = 0;
        }
        var bH = Math.max(2, barsRef.current[i]);
        var x = x0 + i * (bW + gap);
        var y = h - bH;
        var g = c.createLinearGradient(x, y, x, h);
        g.addColorStop(0, color);
        g.addColorStop(1, color + '33');
        c.fillStyle = g;
        c.beginPath();
        c.roundRect(x, y, bW, bH, 2);
        c.fill();
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return function() { cancelAnimationFrame(animRef.current); };
  }, [playing, color, small]);

  return <canvas ref={canvasRef} className={small ? 'w-[80px] h-[20px]' : 'w-[120px] h-[32px]'} />;
}

export default function MusicToggle({ center }: { center?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const trackElRef = useRef<HTMLDivElement>(null);
  const trackIdxRef = useRef(0);
  const dragStartY = useRef(0);
  const dragDY = useRef(0);
  const dragging = useRef(false);

  var track = TRACKS[trackIdx];

  function playTrackAtIndex(idx: number) {
    _currentTrackIdx = idx;
    trackIdxRef.current = idx;
    setTrackIdx(idx);
    var a = audioRef.current;
    if (a) {
      a.pause();
      a.currentTime = 0;
      a.src = TRACKS[idx].src;
      a.oncanplaythrough = function() {
        a.volume = _vol;
        a.play().catch(function() {});
        a.oncanplaythrough = null;
      };
      setTimeout(function() {
        if (a.paused && a.src === TRACKS[idx].src) {
          a.play().catch(function() {});
        }
      }, 3000);
    }
    document.dispatchEvent(new CustomEvent('viking-track-change', {
      detail: TRACKS[idx]
    }));
  }

  var bindAudio = useCallback(function(el: HTMLAudioElement | null) {
    audioRef.current = el;
    _audioEl = el;
    if (el) {
      el.src = TRACKS[trackIdxRef.current].src;
      el.volume = _vol;
      if (_shouldPlay) {
        el.play().then(function() {
          document.dispatchEvent(new Event('viking-music-start'));
          setPlaying(true);
        }).catch(function() {});
      }
      el.addEventListener('ended', function onEnd() {
        var next = (_currentTrackIdx + 1) % TRACKS.length;
        _currentTrackIdx = next;
        trackIdxRef.current = next;
        setTrackIdx(next);
        el.pause();
        el.currentTime = 0;
        el.src = TRACKS[next].src;
        el.oncanplaythrough = function() {
          el.volume = _vol;
          el.play().catch(function() {});
          el.oncanplaythrough = null;
        };
        setTimeout(function() {
          if (el.paused && el.src === TRACKS[next].src) {
            el.play().catch(function() {});
          }
        }, 3000);
        document.dispatchEvent(new CustomEvent('viking-track-change', { detail: TRACKS[next] }));
      });
    }
  }, []);

  useEffect(function() {
    try {
      var saved = localStorage.getItem('viking-music');
      if (saved) {
        var s = JSON.parse(saved);
        if (typeof s.trackIdx === 'number' && s.trackIdx >= 0 && s.trackIdx < TRACKS.length) {
          setTrackIdx(s.trackIdx);
          trackIdxRef.current = s.trackIdx;
          _currentTrackIdx = s.trackIdx;
        }
        if (typeof s.volume === 'number') { setVolume(s.volume); _vol = s.volume; }
      }
    } catch {}
    setMounted(true);
    setTimeout(function() { setVisible(true); }, 1500);
  }, []);

  useEffect(function() { trackIdxRef.current = trackIdx; }, [trackIdx]);

  useEffect(function() {
    if (!mounted) return;
    localStorage.setItem('viking-music', JSON.stringify({ trackIdx: trackIdx, volume: volume }));
  }, [trackIdx, volume, mounted]);

  useEffect(function() {
    var onPlay = function() { setPlaying(true); };
    var onPause = function() { setPlaying(false); };
    document.addEventListener('viking-music-start', onPlay);
    document.addEventListener('viking-music-pause', onPause);
    return function() {
      document.removeEventListener('viking-music-start', onPlay);
      document.removeEventListener('viking-music-pause', onPause);
    };
  }, []);

  useEffect(function() {
    var a = audioRef.current;
    if (!a) return;
    var onTime = function() {
      setCurrentTime(a.currentTime);
      if (a.duration) setProgress((a.currentTime / a.duration) * 100);
    };
    var onLoaded = function() { setDuration(a.duration); };
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('loadedmetadata', onLoaded);
    return function() {
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('loadedmetadata', onLoaded);
    };
  });

  var toggle = useCallback(function() {
    var audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      document.dispatchEvent(new Event('viking-music-pause'));
    } else {
      audio.volume = volume;
      audio.play().catch(function() {});
      _shouldPlay = true;
    }
  }, [playing, volume]);

  var changeTrack = useCallback(function(dir: number) {
    var next = (trackIdxRef.current + dir + TRACKS.length) % TRACKS.length;
    playTrackAtIndex(next);
  }, []);

  var selectTrack = useCallback(function(i: number) {
    _shouldPlay = true;
    playTrackAtIndex(i);
  }, []);

  var changeVolume = useCallback(function(v: number) {
    setVolume(v); _vol = v;
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  var onDragStart = useCallback(function(y: number) { dragStartY.current = y; dragging.current = true; }, []);
  var onDragMove = useCallback(function(y: number) {
    if (!dragging.current) return;
    dragDY.current = Math.max(0, y - dragStartY.current);
    if (trackElRef.current) {
      trackElRef.current.style.transform = 'translateY(' + dragDY.current + 'px)';
      trackElRef.current.style.opacity = String(Math.max(0, 1 - dragDY.current / 200));
    }
  }, []);
  var onDragEnd = useCallback(function() {
    if (!dragging.current) return;
    dragging.current = false;
    if (dragDY.current > 80) setExpanded(false);
    else if (trackElRef.current) { trackElRef.current.style.transform = ''; trackElRef.current.style.opacity = ''; }
    dragDY.current = 0;
  }, []);

  var fmt = function(s: number) {
    if (!s || isNaN(s)) return '0:00';
    return Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
  };

  if (!mounted) return null;

  /* ═══ MOBILE OPTIMIZED POSITIONING ═══ */
  /* Above bottom nav (h-16 = 64px) + 8px gap = bottom-20 on mobile */
  var posClass = center
    ? 'fixed bottom-20 left-1/2 -translate-x-1/2 md:bottom-6 z-50'
    : 'fixed bottom-20 left-3 md:bottom-6 md:left-6 z-50';

  return (
    <>
      <audio ref={bindAudio} preload="auto" />
      <div data-music-player className={posClass + ' transition-all duration-500 ' + (visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none')}>
        {expanded ? (
          <div ref={trackElRef} className="w-64 sm:w-72 max-h-[80vh] overflow-y-auto rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl p-4 shadow-2xl select-none"
            onTouchStart={function(e) { onDragStart(e.touches[0].clientY); }}
            onTouchMove={function(e) { onDragMove(e.touches[0].clientY); }}
            onTouchEnd={onDragEnd}
            onMouseDown={function(e) { onDragStart(e.clientY); }}
            onMouseMove={function(e) { onDragMove(e.clientY); }}
            onMouseUp={onDragEnd}
            onMouseLeave={function() { if (dragging.current) onDragEnd(); }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-lg">{track.icon}</span>
                <div>
                  <p className="text-white text-sm font-semibold leading-tight">{track.name}</p>
                  <p className="text-white/40 text-[10px]">Vikings Club Tanger</p>
                </div>
              </div>
              <button onClick={function() { setExpanded(false); }} className="p-1.5 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/10 transition-colors"><X className="w-3.5 h-3.5" /></button>
            </div>
            <div className="flex justify-center mb-2"><Equalizer playing={playing} color={track.color} /></div>
            <div className="mb-4">
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer" onClick={function(e) {
                var rect = e.currentTarget.getBoundingClientRect();
                var pct = (e.clientX - rect.left) / rect.width;
                if (audioRef.current && duration) audioRef.current.currentTime = pct * duration;
              }}>
                <div className="h-full rounded-full transition-all duration-200" style={{ width: progress + '%', backgroundColor: track.color }} />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-white/30">{fmt(currentTime)}</span>
                <span className="text-[10px] text-white/30">{fmt(duration)}</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6 mb-4">
              <button onClick={function() { changeTrack(-1); }} className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all active:scale-90"><SkipBack className="w-4 h-4" /></button>
              <button onClick={toggle} className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 hover:scale-105" style={{ backgroundColor: track.color + '25', boxShadow: '0 0 20px ' + track.color + '33' }}>
                {playing ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
              </button>
              <button onClick={function() { changeTrack(1); }} className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all active:scale-90"><SkipForward className="w-4 h-4" /></button>
            </div>
            <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2">Playlist</p>
            <div className="grid grid-cols-3 gap-1.5 mb-4">
              {TRACKS.map(function(t, i) {
                return (
                  <button key={i} onClick={function() { selectTrack(i); }}
                    className={'flex flex-col items-center gap-0.5 p-2 rounded-xl transition-all duration-200 ' + (i === trackIdx ? 'bg-white/10 border border-white/20 scale-105' : 'hover:bg-white/5 border border-transparent')}>
                    <span className={'text-base ' + (i === trackIdx ? 'scale-110 ' : '') + 'transition-transform'}>{t.icon}</span>
                    <span className={'text-[10px] leading-tight ' + (i === trackIdx ? 'text-white' : 'text-white/40')}>{t.name}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <VolumeX className="w-3.5 h-3.5 text-white/30 shrink-0" />
              <input type="range" min={0} max={1} step={0.01} value={volume} onChange={function(e) { changeVolume(parseFloat(e.target.value)); }} className="flex-1 h-1 rounded-full appearance-none cursor-pointer" style={{ background: 'linear-gradient(to right, ' + track.color + ' ' + (volume * 100) + '%, rgba(255,255,255,0.1) ' + (volume * 100) + '%)' }} />
              <Volume2 className="w-3.5 h-3.5 text-white/30 shrink-0" />
            </div>
          </div>
        ) : (
          /* ═══ MINI PLAYER — compact on mobile ═══ */
          <button onClick={function() { setExpanded(true); }} className="group flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/10 text-white/70 shadow-lg transition-all duration-300 hover:bg-black/80 hover:border-white/20 hover:scale-105 active:scale-95">
            {playing ? (
              <>
                <span className="text-sm sm:text-base">{track.icon}</span>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] sm:text-xs font-medium text-white/90">{track.name}</span>
                  <Equalizer playing={playing} color={track.color} small={true} />
                </div>
              </>
            ) : (
              <><Music className="w-3.5 h-3.5 sm:w-4 sm:h-4" /><span className="text-[10px] sm:text-xs text-white/40">Music</span></>
            )}
          </button>
        )}
      </div>
    </>
  );
}