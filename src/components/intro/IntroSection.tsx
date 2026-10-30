import React, { useState } from 'react';
import {
  Sparkles,
  Quote,
  MessageCircle,
  Film,
  HeartHandshake,
  ShieldCheck,
  Crown,
  ChevronRight,
} from 'lucide-react';
import { INTRO_PILLARS } from '../../config/services';
import { buildWhatsAppLink } from '../../config/business';

interface TeluguQuote {
  id: string;
  movie: string;
  year?: string;
  context: string;
  quote: string;
  englishMeaning: string;
  tag: string;
}

const TELUGU_EVENT_QUOTES: TeluguQuote[] = [
  {
    id: 'shatamanam',
    movie: 'Shatamanam Bhavati',
    context: 'The Essence of Family Marriage',
    quote:
      'Pelli ante rendu manasula kalayika mathrame kadhu... rendu kutumbala sammelanam! Mana intlo subhakaryam ante oori motthaniki oka pandagala undali!',
    englishMeaning:
      'A wedding is not merely the union of two hearts; it brings two entire families together like a village-wide celebration of love and culture.',
    tag: 'Family & Tradition',
  },
  {
    id: 'svsc',
    movie: 'Seethamma Vakitlo Sirimalle Chettu',
    context: 'Celebration of Togetherness',
    quote:
      'Manushulu kalisi unte pandaga... mana intlo pelli sambaram ante aahvaanaalu, akshintalu, aapeeyathalu kalagalisina amrutha kshanam!',
    englishMeaning:
      'When all loved ones gather together, it is a true festival. A wedding in our home is a sacred moment filled with warm welcomes, blessings, and lifelong bonds.',
    tag: 'Celebration Mood',
  },
  {
    id: 'murari',
    movie: 'Murari',
    context: 'Pelli Sandadi & Traditions',
    quote:
      'Subhalekha rasukunna daggara nunchi, akshintalu padenthavaraku... prathi kshanam oka chakkani gnapakam ga kalla mundu nilichipovali!',
    englishMeaning:
      'From the moment the sacred wedding invitation is penned until the holy rice blessings fall, every fleeting second must turn into a treasured lifetime memory.',
    tag: 'Sacred Rituals',
  },
  {
    id: 'avpl',
    movie: 'Ala Vaikunthapurramuloo',
    context: 'Grand Celebration Atmosphere',
    quote:
      'Mana Telugu intla pelli ante... dhol baajalu mogali, banchan laanti vindhu undali, mandapam divvela velugulo kalakala laadali!',
    englishMeaning:
      'In our Telugu homes, celebrations must resonate with grand beats, lavish feasts, and a radiant mandapam glowing with joy and prosperity!',
    tag: 'Grand Scale',
  },
  {
    id: 'proverb',
    movie: 'Telugu Tradition & Tollywood Wisdom',
    context: 'The Wedding Responsibility',
    quote:
      'Pelli chesi chudu, illu katti chudu antaru... SR Events thodunte aa pelli cheyadam entho aanandham, antha kanna pedda santrupti!',
    englishMeaning:
      'They say hosting a wedding is life’s greatest milestone — with SR Events standing by your side in Addanki, it becomes pure joy and complete peace of mind.',
    tag: 'Peace of Mind',
  },
];

export const IntroSection: React.FC = () => {
  const [selectedQuoteId, setSelectedQuoteId] = useState<string>('shatamanam');

  const activeQuote =
    TELUGU_EVENT_QUOTES.find((q) => q.id === selectedQuoteId) || TELUGU_EVENT_QUOTES[0];

  const getPillarIcon = (index: number) => {
    switch (index) {
      case 0:
        return <HeartHandshake className="w-5 h-5 text-gold-dark" />;
      case 1:
        return <ShieldCheck className="w-5 h-5 text-gold-dark" />;
      case 2:
      default:
        return <Crown className="w-5 h-5 text-gold-dark" />;
    }
  };

  return (
    <section id="about" className="py-20 lg:py-28 bg-cream-100/60 border-y border-cream-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-20">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cream-50 border border-gold/40 text-gold-dark text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
            <span>YOUR EVENT. OUR RESPONSIBILITY · ADDANKI</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-charcoal-900 leading-tight">
            From the first idea to the <br className="hidden sm:inline" />
            <span className="italic font-medium text-gold-dark">final celebration.</span>
          </h2>

          <p className="text-base sm:text-lg text-charcoal-600 leading-relaxed font-normal pt-1">
            SR Events helps families and organizations across Addanki and nearby areas plan and celebrate with authentic Telugu tradition, modern elegance, and dependable on-ground execution.
          </p>
        </div>

        {/* 3 Enhanced & Attractive Pillars with Telugu Sentiments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INTRO_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.number}
              className="bg-cream-50 rounded-2xl border border-cream-200/90 p-7 sm:p-8 shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header Row: Icon + Number */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-cream-100 border border-cream-200/80 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    {getPillarIcon(idx)}
                  </div>
                  <span className="font-display text-2xl sm:text-3xl font-bold text-gold/40 group-hover:text-gold transition-colors">
                    {pillar.number}
                  </span>
                </div>

                {/* Cultural Telugu Tag */}
                {pillar.tag && (
                  <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-gold-dark bg-gold/10 px-2.5 py-0.5 rounded-md mb-2">
                    {pillar.tag}
                  </span>
                )}

                <h3 className="font-display text-xl font-semibold text-charcoal-900 mb-3 group-hover:text-gold-dark transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-sm text-charcoal-600 leading-relaxed mb-5">
                  {pillar.description}
                </p>
              </div>

              {/* Cultural Quote Box on Card */}
              {pillar.quote && (
                <div className="pt-4 border-t border-cream-200/80 bg-cream-100/50 -mx-2 -mb-2 p-3.5 rounded-xl border border-cream-200/60 mt-auto">
                  <div className="flex items-start space-x-2">
                    <Quote className="w-3.5 h-3.5 text-gold-dark flex-shrink-0 mt-0.5 rotate-180" />
                    <div>
                      <p className="text-xs font-serif italic text-charcoal-800 leading-snug">
                        "{pillar.quote}"
                      </p>
                      <p className="text-[10px] text-charcoal-500 font-medium mt-1">
                        🎬 {pillar.quoteMovie}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Interactive Feature: "Mana Telugu Pelli Sambaralu" Interactive Quotes Hub */}
        <div className="bg-cream-50 rounded-3xl border border-cream-200 p-6 sm:p-10 shadow-card relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-cream-200">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs font-semibold text-gold-dark uppercase tracking-widest">
                  <Film className="w-4 h-4 text-gold-dark" />
                  <span>MANA TELUGU SAMBARALU · CELEBRATION QUOTES</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-medium text-charcoal-900">
                  Telugu Cinema & Cultural Wedding Dialogues
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-500 max-w-2xl">
                  Popular Telugu movie lines about weddings, family bonds, and celebrations written in English script. Tap a dialogue to view its meaning and share with Ram.
                </p>
              </div>

              <span className="text-xs text-charcoal-400 font-medium">
                Tap quotes to explore vibes
              </span>
            </div>

            {/* Interactive Dialogue Selector Pills */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {TELUGU_EVENT_QUOTES.map((q) => {
                const isSelected = selectedQuoteId === q.id;
                return (
                  <button
                    key={q.id}
                    onClick={() => setSelectedQuoteId(q.id)}
                    className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs font-medium tracking-wide transition-all flex items-center space-x-1.5 sm:space-x-2 ${
                      isSelected
                        ? 'bg-charcoal-900 text-cream-50 shadow-md scale-[1.02] ring-1 ring-gold/50'
                        : 'bg-cream-100 hover:bg-cream-200/80 text-charcoal-700 border border-cream-200'
                    }`}
                  >
                    <span className="text-gold text-xs">🎬</span>
                    <span className="font-semibold">{q.movie}</span>
                    <span className="text-[10px] opacity-75 hidden sm:inline">({q.tag})</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Active Quote Display Box */}
            <div className="bg-cream-100/70 rounded-2xl p-5 sm:p-8 border border-cream-200/90 relative">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 sm:gap-6">
                <div className="space-y-3.5 sm:space-y-4 max-w-3xl">
                  {/* Context Pill */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-charcoal-900 bg-cream-50 px-3 py-1 rounded-full border border-cream-200 shadow-xs">
                      🎬 {activeQuote.movie}
                    </span>
                    <span className="text-xs text-charcoal-500 font-medium">
                      · {activeQuote.context}
                    </span>
                  </div>

                  {/* Primary Telugu Quote in English Letters */}
                  <blockquote className="font-serif text-base sm:text-xl md:text-2xl font-medium text-charcoal-900 leading-relaxed italic text-balance">
                    "{activeQuote.quote}"
                  </blockquote>

                  {/* English Translation & Meaning */}
                  <div className="pt-2 border-t border-cream-200/80">
                    <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                      <strong className="text-charcoal-800 font-semibold">Meaning: </strong>
                      {activeQuote.englishMeaning}
                    </p>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="w-full lg:w-auto flex-shrink-0 pt-2 lg:pt-0">
                  {/* WhatsApp Pre-fill with Quote */}
                  <a
                    href={buildWhatsAppLink(
                      `Hi Ram, I visited SR Events website and loved this quote: "${activeQuote.quote}" from ${activeQuote.movie}. I'm planning a celebration in Addanki and would love to plan it with this festive spirit!`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 text-white flex-shrink-0" />
                    <span>Discuss on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Celebration Trust Note */}
            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-500 pt-2 gap-2">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-gold inline-block" />
                <span>SR Events brings your family traditions to life with authentic Telugu hospitality in Addanki.</span>
              </span>
              <a
                href="#events"
                className="font-semibold text-charcoal-900 hover:text-gold-dark transition-colors flex items-center space-x-1"
              >
                <span>Explore Featured Setups</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
