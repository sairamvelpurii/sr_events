import React from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { EVENT_IMAGES } from '../../config/images';
import { storageService } from '../../services/storageService';
import { EventCategory } from '../../types';

interface FeaturedEventsProps {
  onSelectEvent: (category: EventCategory) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

export const FeaturedEvents: React.FC<FeaturedEventsProps> = ({
  onSelectEvent,
  savedIds,
  onToggleSave,
}) => {
  const featuredList = [
    {
      id: 'feat-01',
      category: 'Wedding' as EventCategory,
      title: 'Colossal Royal Temple Mandap',
      description: 'Expansive multi-tiered temple gopuram outdoor mandap, red carpet ceremonial walkway, and high-truss illumination.',
      image: EVENT_IMAGES.featured.wedding.url,
      alt: 'Colossal outdoor royal wedding mandap by SriRam Events',
    },
    {
      id: 'feat-02',
      category: 'Engagement' as EventCategory,
      title: 'Romantic Draped Hall Ring Ceremony',
      description: 'Peach draped banquet hall stage with deep red rose centerpiece and warm lighting for intimate family ceremonies.',
      image: EVENT_IMAGES.featured.engagement.url,
      alt: 'Engagement ceremony setup in Addanki',
    },
    {
      id: 'feat-03',
      category: 'Reception' as EventCategory,
      title: 'Peacock Teal Velvet Luxury Stage',
      description: 'Contemporary teal velvet backdrop with illuminated acrylic fan petals and royal golden couch.',
      image: EVENT_IMAGES.featured.reception.url,
      alt: 'Evening gala reception stage by SriRam Events',
    },
    {
      id: 'feat-04',
      category: 'Corporate Event' as EventCategory,
      title: 'Red Rose Rainbow Arch Stage',
      description: 'Dramatic multi-tiered red floral arches with crystal chandeliers and wisteria canopy for grand celebrations.',
      image: EVENT_IMAGES.featured.corporate.url,
      alt: 'Corporate event execution by SriRam Events',
    },
  ];

  return (
    <section id="events" className="py-20 lg:py-28 bg-cream-100/50 border-t border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
              SIGNATURE PORTFOLIO
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal-900">
              Moments We've Helped Create
            </h2>
            <p className="text-base text-charcoal-500">
              A curated look into our stage setups, ceremonial decor, and custom celebration atmospheres across Addanki.
            </p>
          </div>
          <a
            href="#gallery"
            className="text-xs uppercase tracking-wider font-semibold text-charcoal-900 hover:text-gold-dark transition-colors flex items-center space-x-1.5"
          >
            <span>View Complete Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {featuredList.map((item) => {
            const isSaved = savedIds.includes(item.id);

            return (
              <div
                key={item.id}
                className="group relative bg-cream-50 rounded-2xl overflow-hidden border border-cream-200 shadow-subtle hover:shadow-floating transition-all duration-500 flex flex-col justify-between"
              >
                {/* Visual Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-cream-200">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-charcoal-900/10 to-transparent" />

                  {/* Category Tag */}
                  <span className="absolute top-4 left-4 bg-charcoal-900/80 backdrop-blur-md text-gold text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full">
                    {item.category}
                  </span>

                  {/* Save Inspiration Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(item.id);
                    }}
                    aria-label={isSaved ? 'Remove from Saved Inspiration' : 'Save Inspiration'}
                    className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all active:scale-90 ${
                      isSaved
                        ? 'bg-cream-50 text-gold shadow-md'
                        : 'bg-charcoal-900/60 hover:bg-charcoal-900/80 text-cream-100 hover:text-gold'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-gold' : ''}`} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-charcoal-900 group-hover:text-gold-dark transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-charcoal-500 leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Action */}
                  <div className="pt-4 border-t border-cream-200/80 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2.5">
                    <button
                      onClick={() => onSelectEvent(item.category)}
                      className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold text-charcoal-900 hover:text-gold-dark transition-colors"
                    >
                      <span>Enquire For This Style</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] text-charcoal-400">
                      Addanki Region
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
