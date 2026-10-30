import React, { useEffect, useCallback, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { EventImageConfig } from '../../config/images';

interface GalleryLightboxProps {
  images: EventImageConfig[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onNavigate,
  savedIds,
  onToggleSave,
}) => {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const currentImage = currentIndex !== null ? images[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    const nextIdx = (currentIndex - 1 + images.length) % images.length;
    onNavigate(nextIdx);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    const nextIdx = (currentIndex + 1) % images.length;
    onNavigate(nextIdx);
  }, [currentIndex, images.length, onNavigate]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    if (currentIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, onClose, handlePrev, handleNext]);

  if (currentIndex === null || !currentImage) return null;

  const isSaved = savedIds.includes(currentImage.id);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-900/95 backdrop-blur-md animate-in fade-in duration-200 select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Bar Controls */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-3.5 sm:p-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent text-cream-50">
        <div className="max-w-[65%] sm:max-w-none">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-gold font-semibold block">
            {currentImage.category} · {currentIndex + 1} of {images.length}
          </span>
          <h4 className="font-display text-xs sm:text-base text-cream-100 truncate">
            {currentImage.title}
          </h4>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={() => onToggleSave(currentImage.id)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md transition-colors ${
              isSaved
                ? 'bg-cream-50 text-gold-dark shadow'
                : 'bg-white/10 hover:bg-white/20 text-cream-100'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-gold-dark text-gold-dark' : ''}`} />
            <span className="hidden xs:inline">{isSaved ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 text-cream-200 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Prev Navigation Button */}
      <button
        onClick={handlePrev}
        className="absolute left-2 sm:left-6 z-20 p-2.5 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 text-cream-100 hover:text-white transition-all transform hover:scale-105 active:scale-95"
        aria-label="Previous Image"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Main Image View */}
      <div className="relative w-full max-w-5xl max-h-[85vh] p-2 sm:p-4 flex items-center justify-center">
        <img
          src={currentImage.url}
          alt={currentImage.alt}
          className="max-w-full max-h-[75vh] sm:max-h-[80vh] object-contain rounded-lg shadow-2xl"
          draggable={false}
        />
      </div>

      {/* Next Navigation Button */}
      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-6 z-20 p-2.5 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 text-cream-100 hover:text-white transition-all transform hover:scale-105 active:scale-95"
        aria-label="Next Image"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Bottom Information */}
      <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 text-center text-[11px] sm:text-xs text-cream-300 pointer-events-none px-4">
        <span className="hidden sm:inline">Use ← and → arrow keys to navigate · Press Esc to close</span>
        <span className="sm:hidden">Swipe left or right to browse setups</span>
      </div>
    </div>
  );
};
