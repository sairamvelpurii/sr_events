import React from 'react';
import { Quote, Star, MessageCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { CLIENT_REVIEWS } from '../../config/reviews';
import { buildWhatsAppLink } from '../../config/business';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-cream-100/50 border-t border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-gold-dark font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TESTIMONIALS & TRUST · ADDANKI</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal-900">
              Host Experiences & Stories
            </h2>
            <p className="text-sm sm:text-base text-charcoal-500 leading-relaxed">
              Genuine feedback from families across Addanki and nearby regions who trusted Ram and SriRam Events with their milestone celebrations.
            </p>
          </div>

          <a
            href={buildWhatsAppLink("Hi Ram, I would like to share feedback about an event organized by SriRam Events.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-cream-50 hover:bg-cream-200 border border-cream-300 text-charcoal-800 text-xs font-semibold transition-all self-start md:self-end shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#128C7E]" />
            <span>Share Your Review</span>
          </a>
        </div>

        {/* Reviews 2x2 Grid (Responsive on Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {CLIENT_REVIEWS.map((review) => {
            const initials = review.author
              .split(' ')
              .filter((n) => !['&', 'Family', 'Brothers'].includes(n))
              .map((n) => n[0])
              .slice(0, 2)
              .join('');

            return (
              <div
                key={review.id}
                className="bg-cream-50 rounded-2xl p-6 sm:p-8 border border-cream-200 shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Subtle top gold accent on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-4">
                  {/* Top Row: Tag + Stars */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
                    {review.tag && (
                      <span className="text-[11px] font-semibold text-gold-dark bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                        {review.tag}
                      </span>
                    )}

                    {/* 5-Star Rating */}
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-gold text-gold" />
                      ))}
                      <span className="text-xs font-semibold text-charcoal-800 ml-1.5">5.0</span>
                    </div>
                  </div>

                  {/* Highlighted Telugu Quote in English Script */}
                  {review.teluguQuote && (
                    <div className="p-3.5 rounded-xl bg-cream-100/70 border border-cream-200/90 space-y-1">
                      <div className="flex items-center space-x-1.5 text-[10px] uppercase font-bold text-charcoal-500 tracking-wider">
                        <Quote className="w-3 h-3 text-gold-dark rotate-180" />
                        <span>Telugu Host Feedback</span>
                      </div>
                      <p className="font-serif italic text-sm sm:text-base text-charcoal-900 leading-snug">
                        "{review.teluguQuote}"
                      </p>
                    </div>
                  )}

                  {/* English Experience Narrative */}
                  <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-normal">
                    {review.quote}
                  </p>
                </div>

                {/* Author Card Footer */}
                <div className="pt-4 mt-5 border-t border-cream-200/80 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-charcoal-900 text-gold font-display font-semibold text-xs flex items-center justify-center shadow-xs flex-shrink-0">
                      {initials || 'SR'}
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-semibold text-charcoal-900 leading-tight">
                        {review.author}
                      </h4>
                      <p className="text-[11px] text-charcoal-500 mt-0.5">{review.eventType}</p>
                    </div>
                  </div>

                  <span className="hidden sm:inline-flex items-center space-x-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified Host</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Note */}
        <div className="mt-10 p-4 rounded-xl bg-cream-50 border border-cream-200 text-center flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-charcoal-500">
          <span className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
            <span>Every celebration in Addanki is personally overseen by Ram from design to wrap-up.</span>
          </span>
          <a
            href={buildWhatsAppLink("Hi Ram, I saw your client reviews and would like to discuss our upcoming celebration in Addanki.")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-charcoal-900 hover:text-gold-dark flex items-center space-x-1.5 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#128C7E]" />
            <span>Plan with Ram on WhatsApp →</span>
          </a>
        </div>
      </div>
    </section>
  );
};
