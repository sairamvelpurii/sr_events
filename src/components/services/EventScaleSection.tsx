import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { EVENT_SCALES } from '../../config/services';

interface EventScaleSectionProps {
  onOpenWizard: () => void;
}

export const EventScaleSection: React.FC<EventScaleSectionProps> = ({ onOpenWizard }) => {
  return (
    <section className="py-20 lg:py-28 bg-cream-100/70 border-t border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
            ADAPTABLE PLANNING
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal-900">
            Big or Small. Every Event Matters.
          </h2>
          <p className="text-base text-charcoal-500 max-w-xl mx-auto">
            We structure our team, decor inventory, and logistics to match your exact celebration size without compromise.
          </p>
        </div>

        {/* Scale Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EVENT_SCALES.map((scale, index) => {
            const isFeatured = scale.tier === 'Signature';

            return (
              <div
                key={scale.id}
                className={`relative rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isFeatured
                    ? 'bg-cream-50 border-2 border-gold/60 shadow-card md:-translate-y-2'
                    : 'bg-cream-50/90 border border-cream-200 shadow-subtle hover:shadow-card'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-charcoal-900 text-gold text-[11px] font-semibold tracking-wider uppercase px-3.5 py-1 rounded-full shadow-sm">
                    Most Popular Scope
                  </div>
                )}

                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-display text-2xl font-semibold text-charcoal-900">
                      {scale.tier}
                    </h3>
                    <span className="text-xs font-semibold text-gold-dark bg-gold/10 px-2.5 py-1 rounded-full">
                      {scale.idealFor}
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-500 font-medium mb-4">
                    {scale.subtitle}
                  </p>
                  <p className="text-sm text-charcoal-600 leading-relaxed mb-6 pb-6 border-b border-cream-200">
                    {scale.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    <p className="text-xs uppercase tracking-wider text-charcoal-400 font-semibold">
                      Included Coordination:
                    </p>
                    {scale.scope.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-xs text-charcoal-700">
                        <Check className="w-4 h-4 text-gold-dark flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onOpenWizard}
                  className={`w-full py-3 px-4 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center justify-center space-x-2 ${
                    isFeatured
                      ? 'bg-charcoal-900 text-cream-50 hover:bg-charcoal-800 shadow-sm'
                      : 'bg-cream-100 hover:bg-cream-200 text-charcoal-900 border border-cream-200'
                  }`}
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
