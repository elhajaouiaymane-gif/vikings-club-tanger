'use client';
import { useEffect, useRef } from 'react';

var DEFAULT_COLOR = '#F97316';

export default function MusicVibe() {
  var canvasRef = useRef<HTMLCanvasElement>(null);
  var colorRef = useRef(DEFAULT_COLOR);
  var playingRef = useRef(false);
  var animRef = useRef(0);
  var barsRef = useRef<number[]>([]);
  var n = 28;

  useEffect(function() {
    if (barsRef.current.length === 0) {
      barsRef.current = [];
      for (var i = 0; i < n; i++) barsRef.current.push(0);
    }
    var onTrack = function(e: Event) {
      var d = (e as CustomEvent).detail;
      if (d && d.color) colorRef.current = d.color;
    };
    var onStart = function() { playingRef.current = true; };
    var onPause = function() { playingRef.current = false; };
    document.addEventListener('viking-track-change', onTrack);
    document.addEventListener('viking-music-start', onStart);
    document.addEventListener('viking-music-pause', onPause);
    return function() {
      document.removeEventListener('viking-track-change', onTrack);
      document.removeEventListener('viking-music-start', onStart);
      document.removeEventListener('viking-music-pause', onPause);
    };
  }, []);

  useEffect(function() {
    var canvas = canvasRef.current;
    if (!canvas) return;
    var c = canvas.getContext('2d');
    if (!c) return;
    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    var draw = function() {
      if (!canvas || !c) return;
      var w = canvas.width;
      var h = canvas.height;
      c.clearRect(0, 0, w, h);
      var totalW = w * 0.5;
      var bW = Math.max(3, totalW / (n * 1.8));
      var gap = bW * 0.8;
      var startX = (w - (n * bW + (n - 1) * gap)) / 2;
      var baseY = h * 0.55;
      var maxH = h * 0.35;
      var col = colorRef.current;

      for (var i = 0; i < n; i++) {
        if (playingRef.current) {
          var center = Math.abs(i - n / 2) / (n / 2);
          var centerBoost = 1 - center * 0.6;
          var target = (Math.random() * 0.8 + 0.15) * maxH * centerBoost;
          barsRef.current[i] += (target - barsRef.current[i]) * 0.12;
        } else {
          barsRef.current[i] *= 0.94;
          if (barsRef.current[i] < 0.5) barsRef.current[i] = 0;
        }
        var bH = Math.max(1, barsRef.current[i]);
        var x = startX + i * (bW + gap);
        var alpha = playingRef.current ? (0.15 + (bH / maxH) * 0.25) : (bH / maxH) * 0.08;

        /* upward bars */
        var g = c.createLinearGradient(x, baseY - bH, x, baseY);
        g.addColorStop(0, col + hexAlpha(alpha));
        g.addColorStop(1, col + '00');
        c.fillStyle = g;
        c.beginPath();
        c.roundRect(x, baseY - bH, bW, bH, [bW / 2, bW / 2, 0, 0]);
        c.fill();

        /* mirror downward */
        var mH = bH * 0.4;
        var g2 = c.createLinearGradient(x, baseY, x, baseY + mH);
        g2.addColorStop(0, col + hexAlpha(alpha * 0.4));
        g2.addColorStop(1, col + '00');
        c.fillStyle = g2;
        c.beginPath();
        c.roundRect(x, baseY, bW, mH, [0, 0, bW / 2, bW / 2]);
        c.fill();
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return function() {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[2] pointer-events-none" />;
}

function hexAlpha(a: number): string {
  var v = Math.round(Math.max(0, Math.min(1, a)) * 255);
  return v.toString(16).padStart(2, '0');
}