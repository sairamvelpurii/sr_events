import React from 'react';
import { Sparkles, HeartHandshake, ShieldCheck, Sliders } from 'lucide-react';
import { WHY_SR_EVENTS } from '../../config/services';

export const WhySRSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-gold-dark" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-gold-dark" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-gold-dark" />;
      case 'Sliders':
        return <Sliders className="w-5 h-5 text-gold-dark" />;
      default:
        return <Sparkles className="w-5 h-5 text-gold-dark" />;
    }
  };

  return (
    <section className="py-20 lg:py-28 border-t border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 space-y-3">
          <p className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
            THE SRIRAM EVENTS PROMISE
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal-900">
            Why Families & Hosts Choose SriRam Events
          </h2>
          <p className="text-base text-charcoal-500">
            We focus on transparent communication, punctuality, and calm execution from start to finish.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY_SR_EVENTS.map((item) => (
            <div
              key={item.number}
              className="bg-cream-50 p-6 rounded-xl border border-cream-200 shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-cream-100 border border-cream-200 flex items-center justify-center mb-6">
                  {getIcon(item.iconName)}
                </div>
                <h3 className="font-display text-lg font-semibold text-charcoal-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-charcoal-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-cream-200/80 text-[11px] font-semibold text-charcoal-400">
                Pillar {item.number}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
