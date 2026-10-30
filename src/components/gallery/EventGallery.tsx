import React, { useState, useMemo } from 'react';
import { Eye, Heart } from 'lucide-react';
import { EVENT_IMAGES, EventImageConfig } from '../../config/images';
import { GalleryLightbox } from './GalleryLightbox';

interface EventGalleryProps {
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onOpenInspiration: () => void;
}

const CATEGORIES = [
  'All',
  'Weddings',
  'Engagements',
  'Receptions',
  'Birthdays',
  'Corporate',
  'Private',
] as const;

export const EventGallery: React.FC<EventGalleryProps> = ({
  savedIds,
  onToggleSave,
  onOpenInspiration,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = useMemo(() => {
    if (activeCategory === 'All') {
      return EVENT_IMAGES.gallery;
    }
    return EVENT_IMAGES.gallery.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="gallery" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
              CURATED ARCHIVE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal-900">
              Interactive Event Gallery
            </h2>
            <p className="text-base text-charcoal-500">
              Explore our floral mandaps, grand stage installations, and ceremonial decors. Save your favorite setups to share with Ram.
            </p>
          </div>

          {/* Saved Inspiration Quick Action */}
          {savedIds.length > 0 && (
            <button
              onClick={onOpenInspiration}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-cream-100 hover:bg-cream-200 border border-gold/40 text-charcoal-900 text-xs font-semibold shadow-sm transition-all"
            >
              <Heart className="w-3.5 h-3.5 fill-gold text-gold" />
              <span>{savedIds.length} Inspiration Items Saved</span>
            </button>
          )}
        </div>

        {/* Category Filters (Horizontally scrollable on mobile) */}
        <div className="flex items-center gap-2 mb-10 pb-3 border-b border-cream-200 overflow-x-auto scrollbar-none sm:flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all whitespace-nowrap flex-shrink-0 ${
                activeCategory === cat
                  ? 'bg-charcoal-900 text-cream-50 shadow-sm'
                  : 'bg-cream-100/70 hover:bg-cream-200/80 text-charcoal-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredImages.map((image, index) => {
            const isSaved = savedIds.includes(image.id);

            return (
              <div
                key={image.id}
                className="group relative bg-cream-50 rounded-xl overflow-hidden border border-cream-200 shadow-subtle hover:shadow-floating transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Frame */}
                <div
                  className="relative aspect-[4/3] overflow-hidden bg-cream-200 cursor-pointer"
                  onClick={() => setLightboxIndex(index)}
                >
                  <img
                    src={image.thumbnail}
                    alt={image.alt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-charcoal-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-cream-50/90 text-charcoal-900 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Category Chip */}
                  <span className="absolute bottom-3 left-3 bg-charcoal-900/80 backdrop-blur-sm text-gold text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded">
                    {image.category}
                  </span>

                  {/* Heart Save Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(image.id);
                    }}
                    aria-label={isSaved ? 'Remove from Saved Inspiration' : 'Save Inspiration'}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all active:scale-90 ${
                      isSaved
                        ? 'bg-cream-50 text-gold shadow-md'
                        : 'bg-charcoal-900/60 hover:bg-charcoal-900/80 text-cream-100 hover:text-gold'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-gold' : ''}`} />
                  </button>
                </div>

                {/* Caption Bar */}
                <div className="p-4 flex items-center justify-between">
                  <h3 className="font-display text-sm font-semibold text-charcoal-900 group-hover:text-gold-dark transition-colors truncate">
                    {image.title}
                  </h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(image.id);
                    }}
                    className="text-[11px] font-medium text-charcoal-500 hover:text-charcoal-900 ml-2 flex-shrink-0"
                  >
                    {isSaved ? '♥ Saved' : '♡ Save'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Component */}
      <GalleryLightbox
        images={filteredImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        savedIds={savedIds}
        onToggleSave={onToggleSave}
      />
    </section>
  );
};
