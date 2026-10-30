import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';
import { EVENT_IMAGES } from '../../config/images';

export const BeforeAfterSection: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();

    const resizeObserver = new ResizeObserver(() => updateWidth());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    window.addEventListener('resize', updateWidth);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="py-20 lg:py-28 border-t border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-gold-dark font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VENUE TRANSFORMATION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal-900">
            From Space To Celebration
          </h2>
          <p className="text-base text-charcoal-500">
            See how our fabrication, floral installations, and atmospheric lighting elevate bare convention halls and lawns into awe-inspiring venues.
          </p>
        </div>

        {/* Interactive Comparison Slider Container */}
        <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-card border border-cream-200 select-none">
          <div
            ref={containerRef}
            onClick={(e) => handleMove(e.clientX)}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchMove}
            onTouchMove={handleTouchMove}
            className="relative aspect-[16/9] w-full cursor-ew-resize overflow-hidden bg-charcoal-900"
          >
            {/* After Image (Background) */}
            <img
              src={EVENT_IMAGES.transformation.after}
              alt="Celebration Setup After SR Events Styling"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
            <span className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-charcoal-900/85 backdrop-blur-md text-gold text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider">
              AFTER · CELEBRATION
            </span>

            {/* Before Image (Clipped Overlay) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={EVENT_IMAGES.transformation.before}
                alt="Bare Venue Space Before SR Events Setup"
                className="absolute inset-0 h-full object-cover max-w-none"
                style={{ width: containerWidth > 0 ? `${containerWidth}px` : '100%' }}
                draggable={false}
              />
              <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-charcoal-900/85 backdrop-blur-md text-cream-200 text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider">
                BEFORE · RAW VENUE
              </span>
            </div>

            {/* Draggable Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-xl z-20 flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-charcoal-900 text-gold border-2 border-white flex items-center justify-center shadow-2xl">
                <MoveHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
          </div>

          {/* Bottom Caption Bar */}
          <div className="p-4 bg-cream-50 border-t border-cream-200 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-500 gap-2">
            <span>Drag the slider left and right to inspect the styling transformation</span>
            <span className="font-semibold text-charcoal-400">VENUE TRANSFORMATION PLACEHOLDER</span>
          </div>
        </div>
      </div>
    </section>
  );
};
