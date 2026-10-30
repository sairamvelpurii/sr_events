import React from 'react';
import { ArrowRight, MessageCircle, Calendar, Sparkles } from 'lucide-react';
import { EVENT_IMAGES } from '../../config/images';
import { buildWhatsAppLink } from '../../config/business';

interface HeroSectionProps {
  onOpenWizard: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenWizard }) => {
  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Subtle Warm Background Glow */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 -z-10 w-80 h-80 bg-cream-200/50 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cream-100 border border-cream-200 text-charcoal-700 text-xs font-medium tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
              <span>SR EVENTS · ADDANKI & SURROUNDING AREAS</span>
            </div>

            {/* Editorial Heading */}
            <h1 className="font-display font-medium text-3xl xs:text-4xl sm:text-5xl lg:text-6xl text-charcoal-900 leading-[1.15] tracking-tight">
              We Create Events <br className="hidden sm:inline" />
              <span className="italic font-normal text-gold-dark">Worth Remembering.</span>
            </h1>

            {/* Editorial Description */}
            <p className="text-sm sm:text-base lg:text-lg text-charcoal-500 font-normal leading-relaxed max-w-2xl">
              From intimate celebrations to grand occasions, SR Events brings together thoughtful
              planning, creative presentation, and reliable execution to make every moment seamless and special.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onOpenWizard}
                className="inline-flex items-center justify-center space-x-2.5 bg-charcoal-900 hover:bg-charcoal-800 text-cream-50 font-medium text-sm sm:text-base px-6 sm:px-7 py-3.5 rounded-full shadow-card hover:shadow-floating transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <Calendar className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Plan Your Event</span>
                <ArrowRight className="w-4 h-4 text-cream-200 flex-shrink-0" />
              </button>

              <div className="flex items-center gap-2.5">
                <a
                  href="#events"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 bg-cream-100 hover:bg-cream-200/80 text-charcoal-900 font-medium text-sm sm:text-base px-5 sm:px-6 py-3.5 rounded-full border border-cream-200 transition-colors"
                >
                  <span>Explore Events</span>
                </a>

                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 text-charcoal-800 hover:text-charcoal-900 font-medium text-sm px-4 py-3.5 rounded-full bg-cream-100/60 hover:bg-cream-200/80 border border-cream-200 sm:border-transparent transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#128C7E] flex-shrink-0" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Additional Trust Line */}
            <div className="pt-4 border-t border-cream-200/90 flex flex-wrap items-center gap-y-2 text-xs sm:text-sm text-charcoal-500 font-medium">
              <span className="text-charcoal-900 font-semibold">Specializing in:</span>
              <span className="ml-2">Weddings</span>
              <span className="mx-2 text-gold">·</span>
              <span>Engagements</span>
              <span className="mx-2 text-gold">·</span>
              <span>Receptions</span>
              <span className="mx-2 text-gold">·</span>
              <span>Birthdays</span>
              <span className="mx-2 text-gold">·</span>
              <span>Corporate Events</span>
            </div>
          </div>

          {/* Right Image Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Decorative Border */}
              <div className="absolute -inset-3 rounded-2xl border border-gold/30 -rotate-1 pointer-events-none" />

              {/* Image Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-card bg-cream-100 aspect-[4/5] sm:aspect-[3/4]">
                <img
                  src={EVENT_IMAGES.hero.url}
                  alt={EVENT_IMAGES.hero.alt}
                  className="w-full h-full object-cover object-top transform hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                />

                {/* Subtle Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-charcoal-900/10 to-transparent pointer-events-none" />

                {/* Organizer Badge */}
                <div className="absolute top-4 left-4 bg-charcoal-900/80 backdrop-blur-md text-gold text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full shadow-sm">
                  {EVENT_IMAGES.hero.label}
                </div>

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-cream-50/95 backdrop-blur-md p-4 rounded-xl border border-cream-200/80 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-gold-dark font-semibold">
                        Lead Event Organizer
                      </p>
                      <p className="font-display font-semibold text-charcoal-900 text-base">
                        Ram · SR Events
                      </p>
                    </div>
                    <span className="text-xs bg-charcoal-900 text-cream-50 font-medium px-3 py-1 rounded-full shadow-sm">
                      Addanki
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
