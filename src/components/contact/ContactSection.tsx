import React from 'react';
import { Phone, MessageCircle, Calendar, MapPin, User, Clock, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG, buildWhatsAppLink } from '../../config/business';

interface ContactSectionProps {
  onOpenWizard: () => void;
  onOpenCallback: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenWizard,
  onOpenCallback,
}) => {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-cream-100/70 border-t border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Service Area Banner */}
        <div className="bg-cream-50 rounded-2xl p-8 sm:p-10 border border-cream-200 mb-16 shadow-subtle">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-gold-dark font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>WHERE WE BRING YOUR EVENTS TO LIFE</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-charcoal-900">
                Operating Across Addanki & Surrounding Regions
              </h3>
              <p className="text-sm sm:text-base text-charcoal-500 leading-relaxed max-w-2xl">
                SriRam Events operates throughout Addanki and nearby surrounding areas in Andhra Pradesh.
                Whether you are hosting a wedding at a local convention hall, celebrating at home, or
                organizing a corporate gathering, our team coordinates the transport, styling, and
                setup directly on-site.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={onOpenWizard}
                className="w-full py-3.5 px-6 rounded-full bg-charcoal-900 hover:bg-charcoal-800 text-cream-50 font-semibold text-xs tracking-wider uppercase transition-all shadow text-center"
              >
                Plan An Event In Your Area
              </button>
              <button
                onClick={onOpenCallback}
                className="w-full py-3.5 px-6 rounded-full bg-cream-100 hover:bg-cream-200 text-charcoal-900 font-semibold text-xs tracking-wider uppercase border border-cream-300 transition-colors text-center"
              >
                Request A Callback
              </button>
            </div>
          </div>
        </div>

        {/* Direct Contact Card */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <p className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
            GET IN TOUCH DIRECTLY
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal-900">
            Let's Create Something Special.
          </h2>
          <p className="text-base text-charcoal-500">
            Reach out to Ram directly to discuss your occasion, check open dates, or schedule an in-person consultation.
          </p>
        </div>

        {/* Contact Information & Action Cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Phone */}
          <div className="bg-cream-50 rounded-2xl p-7 border border-cream-200 shadow-subtle text-center flex flex-col items-center justify-between space-y-4">
            <div className="w-12 h-12 rounded-full bg-cream-100 border border-cream-200 flex items-center justify-center text-gold-dark">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-charcoal-400 font-semibold">
                Direct Call
              </span>
              <h4 className="font-display text-xl font-semibold text-charcoal-900 mt-1">
                {BUSINESS_CONFIG.phoneFormatted}
              </h4>
              <p className="text-xs text-charcoal-500 mt-1">Speak directly with Ram</p>
            </div>
            <a
              href={BUSINESS_CONFIG.phoneTel}
              className="w-full py-2.5 px-4 rounded-full bg-charcoal-900 hover:bg-charcoal-800 text-cream-50 text-xs font-semibold tracking-wide transition-all"
            >
              Call Ram Now
            </a>
          </div>

          {/* Card 2: WhatsApp */}
          <div className="bg-cream-50 rounded-2xl p-7 border border-cream-200 shadow-subtle text-center flex flex-col items-center justify-between space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#128C7E]">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-charcoal-400 font-semibold">
                WhatsApp Chat
              </span>
              <h4 className="font-display text-xl font-semibold text-charcoal-900 mt-1">
                Instant Chat
              </h4>
              <p className="text-xs text-charcoal-500 mt-1">Share photos, venue details & dates</p>
            </div>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-semibold tracking-wide transition-all shadow-sm"
            >
              WhatsApp Ram
            </a>
          </div>

          {/* Card 3: Planning Form */}
          <div className="bg-cream-50 rounded-2xl p-7 border border-cream-200 shadow-subtle text-center flex flex-col items-center justify-between space-y-4">
            <div className="w-12 h-12 rounded-full bg-cream-100 border border-cream-200 flex items-center justify-center text-charcoal-900">
              <Calendar className="w-5 h-5 text-gold-dark" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-charcoal-400 font-semibold">
                Online Enquiry
              </span>
              <h4 className="font-display text-xl font-semibold text-charcoal-900 mt-1">
                5-Step Planner
              </h4>
              <p className="text-xs text-charcoal-500 mt-1">Detailed scope & requirements</p>
            </div>
            <button
              onClick={onOpenWizard}
              className="w-full py-2.5 px-4 rounded-full bg-charcoal-900 hover:bg-charcoal-800 text-cream-50 text-xs font-semibold tracking-wide transition-all"
            >
              Plan Your Event
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
