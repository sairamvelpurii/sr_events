import React from 'react';
import { Phone, MessageCircle, MapPin, Calendar, Heart } from 'lucide-react';
import { BUSINESS_CONFIG, buildWhatsAppLink } from '../../config/business';

interface FooterProps {
  onOpenWizard: () => void;
  onOpenInspiration: () => void;
  onOpenCallback: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenWizard,
  onOpenInspiration,
  onOpenCallback,
}) => {
  return (
    <footer className="bg-cream-100 border-t border-cream-200 text-charcoal-800 pt-16 pb-24 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-cream-200/80">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-charcoal-900 flex items-center justify-center text-gold font-display font-semibold text-base">
                SR
              </div>
              <span className="font-display font-bold text-xl tracking-wide text-charcoal-900">
                SR Events
              </span>
            </div>
            <p className="text-sm text-charcoal-500 leading-relaxed max-w-sm">
              Creating memorable experiences across Addanki and nearby areas with thoughtful planning, elegant decor, and reliable execution.
            </p>
            <div className="flex items-center space-x-2 text-xs text-charcoal-500 pt-1">
              <MapPin className="w-3.5 h-3.5 text-gold-dark flex-shrink-0" />
              <span>{BUSINESS_CONFIG.location}</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-charcoal-900 font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-charcoal-500">
              <li>
                <a href="#hero" className="hover:text-charcoal-900 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-charcoal-900 transition-colors">
                  About SR Events
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-charcoal-900 transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-charcoal-900 transition-colors">
                  Featured Events
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-charcoal-900 transition-colors">
                  Interactive Gallery
                </a>
              </li>
              <li>
                <a href="#availability" className="hover:text-charcoal-900 transition-colors">
                  Check Date Availability
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-charcoal-900 transition-colors">
                  Contact Ram
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Services */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-charcoal-900 font-semibold mb-4">
              Celebrations
            </h4>
            <ul className="space-y-2.5 text-sm text-charcoal-500">
              <li>Weddings & Mandaps</li>
              <li>Engagement Ceremonies</li>
              <li>Evening Receptions</li>
              <li>Birthday Celebrations</li>
              <li>Corporate Conclaves</li>
              <li>Private Celebrations</li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-charcoal-900 font-semibold mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3">
              <div className="flex flex-col">
                <span className="text-xs text-charcoal-500">Contact Person</span>
                <span className="text-sm font-semibold text-charcoal-900">
                  {BUSINESS_CONFIG.contactPerson}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-xs text-charcoal-500">Direct Call</span>
                <a
                  href={BUSINESS_CONFIG.phoneTel}
                  className="text-sm font-semibold text-charcoal-900 hover:text-gold-dark transition-colors flex items-center space-x-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-dark" />
                  <span>{BUSINESS_CONFIG.phoneFormatted}</span>
                </a>
              </div>

              <div className="flex flex-col">
                <span className="text-xs text-charcoal-500">Instant Message</span>
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-[#128C7E] hover:underline flex items-center space-x-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#128C7E]" />
                  <span>WhatsApp with Ram</span>
                </a>
              </div>

              <div className="pt-2 flex flex-col space-y-2">
                <button
                  onClick={onOpenCallback}
                  className="text-left text-xs font-medium text-charcoal-700 hover:text-charcoal-900 underline underline-offset-4 decoration-cream-300 hover:decoration-charcoal-900 transition-colors"
                >
                  Prefer to talk? Request a Callback
                </button>
                <button
                  onClick={onOpenInspiration}
                  className="text-left text-xs font-medium text-charcoal-700 hover:text-charcoal-900 flex items-center space-x-1.5"
                >
                  <Heart className="w-3.5 h-3.5 text-gold-dark" />
                  <span>View Saved Inspiration</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-500 space-y-4 sm:space-y-0">
          <p>© 2026 SR Events. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span>Addanki & Nearby Areas · Andhra Pradesh</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">Professional Event Planning & Coordination</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
