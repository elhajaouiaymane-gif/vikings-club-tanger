'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface Photo {
  src: string;
  alt: string;
  caption: string;
}

interface GalleryLightboxProps {
  photos: Photo[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function GalleryLightbox({
  photos,
  initialIndex,
  isOpen,
  onClose,
}: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [panPos, setPanPos] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalPhotos = photos.length;

  const goToNext = useCallback(() => {
    if (isZoomed) {
      setIsZoomed(false);
      setPanPos({ x: 0, y: 0 });
    }
    setCurrentIndex((prev) => (prev + 1) % totalPhotos);
  }, [totalPhotos, isZoomed]);

  const goToPrevious = useCallback(() => {
    if (isZoomed) {
      setIsZoomed(false);
      setPanPos({ x: 0, y: 0 });
    }
    setCurrentIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos);
  }, [totalPhotos, isZoomed]);

  // Reset state when lightbox opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsZoomed(false);
      setPanPos({ x: 0, y: 0 });
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, goToNext, goToPrevious]);

  const toggleZoom = useCallback(() => {
    if (isZoomed) {
      setIsZoomed(false);
      setPanPos({ x: 0, y: 0 });
    } else {
      setIsZoomed(true);
    }
  }, [isZoomed]);

  // Touch swipe handling
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (isZoomed) return;
      setTouchStart(e.touches[0].clientX);
    },
    [isZoomed]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (isZoomed || touchStart === null) return;
      const diff = touchStart - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goToNext();
        else goToPrevious();
      }
      setTouchStart(null);
    },
    [isZoomed, touchStart, goToNext, goToPrevious]
  );

  // Pan handlers for zoomed state
  const handlePanStart = useCallback((e: React.MouseEvent) => {
    if (!isZoomed) return;
    setIsPanning(true);
    setPanStart({ x: e.clientX - panPos.x, y: e.clientY - panPos.y });
  }, [isZoomed, panPos]);

  const handlePanMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return;
    setPanPos({
      x: e.clientX - panStart.x,
      y: e.clientY - panStart.y,
    });
  }, [isPanning, panStart]);

  const handlePanEnd = useCallback(() => {
    setIsPanning(false);
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const photo = photos[currentIndex];

  return (
    <div
      className="lightbox-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Photo lightbox"
    >
      <button onClick={onClose} className="lightbox-close" aria-label="Close lightbox">
        <X className="size-6" />
      </button>

      <button onClick={goToPrevious} className="lightbox-nav lightbox-nav-left" aria-label="Previous photo">
        <ChevronLeft className="size-8" />
      </button>

      <button onClick={goToNext} className="lightbox-nav lightbox-nav-right" aria-label="Next photo">
        <ChevronRight className="size-8" />
      </button>

      <div
        ref={containerRef}
        className="lightbox-image-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={toggleZoom}
        onMouseDown={handlePanStart}
        onMouseMove={handlePanMove}
        onMouseUp={handlePanEnd}
        onMouseLeave={handlePanEnd}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          className="lightbox-image"
          style={{
            transform: isZoomed
              ? `scale(2) translate(${panPos.x / 2}px, ${panPos.y / 2}px)`
              : 'scale(1)',
            cursor: isZoomed ? (isPanning ? 'grabbing' : 'grab') : 'zoom-in',
            transition: isPanning ? 'none' : 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
          draggable={false}
        />
      </div>

      <button onClick={toggleZoom} className="lightbox-zoom" aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}>
        {isZoomed ? <ZoomOut className="size-5" /> : <ZoomIn className="size-5" />}
      </button>

      <div className="lightbox-counter">
        {currentIndex + 1} / {totalPhotos}
      </div>

      <div className="lightbox-caption">
        <p className="text-base font-semibold text-white">{photo.caption}</p>
      </div>

      <div className="lightbox-thumbs scrollbar-hide">
        {photos.map((p, i) => (
          <button
            key={i}
            onClick={() => {
              if (isZoomed) { setIsZoomed(false); setPanPos({ x: 0, y: 0 }); }
              setCurrentIndex(i);
            }}
            className={`lightbox-thumb ${i === currentIndex ? 'active' : ''}`}
          >
            <img src={p.src} alt={p.alt} draggable={false} />
          </button>
        ))}
      </div>
    </div>
  );
}
