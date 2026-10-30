import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES_DATA } from '../../config/services';
import { EVENT_IMAGES } from '../../config/images';
import { EventCategory } from '../../types';

interface ServicesSectionProps {
  onSelectService: (category: EventCategory) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  // Mapping service id to EventCategory type
  const mapServiceToCategory = (id: string): EventCategory => {
    switch (id) {
      case 'weddings':
        return 'Wedding';
      case 'engagements':
        return 'Engagement';
      case 'receptions':
        return 'Reception';
      case 'birthdays':
        return 'Birthday';
      case 'corporate':
        return 'Corporate Event';
      case 'private':
        return 'Private Event';
      default:
        return 'Other';
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl space-y-3">
            <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
              Our Capabilities
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal-900">
              What We Do
            </h2>
            <p className="text-base text-charcoal-500">
              Everything you need to create a memorable event with seamless execution and aesthetic precision.
            </p>
          </div>
          <span className="text-xs text-charcoal-400 font-medium">
            Addanki & Surrounding Districts
          </span>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => {
            const categoryImage = EVENT_IMAGES.categories[service.categoryKey];
            const eventCategory = mapServiceToCategory(service.id);

            return (
              <div
                key={service.id}
                onClick={() => onSelectService(eventCategory)}
                className="group cursor-pointer bg-cream-50 rounded-xl overflow-hidden border border-cream-200 shadow-subtle hover:shadow-floating transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
              >
                {/* Image Frame with Zoom */}
                <div className="relative aspect-[16/10] overflow-hidden bg-cream-100">
                  <img
                    src={categoryImage.url}
                    alt={categoryImage.alt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                  
                  {/* Number Badge */}
                  <span className="absolute top-4 left-4 bg-cream-50/90 backdrop-blur-sm text-charcoal-900 text-xs font-semibold px-2.5 py-1 rounded">
                    {service.number}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-charcoal-900 group-hover:text-gold-dark transition-colors mb-2.5">
                      {service.title}
                    </h3>
                    <p className="text-sm text-charcoal-500 leading-relaxed mb-4">
                      {service.description}
                    </p>
                  </div>

                  {/* Footer Arrow & Link */}
                  <div className="pt-4 border-t border-cream-200/80 flex items-center justify-between text-xs font-semibold text-charcoal-900 group-hover:text-gold-dark transition-colors">
                    <span>Enquire for {service.title}</span>
                    <div className="w-8 h-8 rounded-full bg-cream-100 group-hover:bg-charcoal-900 group-hover:text-cream-50 flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
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
