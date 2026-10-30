import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { BUSINESS_CONFIG, buildWhatsAppLink } from '../../config/business';

export const MobileBottomBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-cream-50/95 backdrop-blur-md border-t border-cream-200/90 px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-4px_25px_rgba(0,0,0,0.1)]">
      <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
        {/* Call Ram Button */}
        <a
          href={BUSINESS_CONFIG.phoneTel}
          className="flex items-center justify-center space-x-2 py-3 px-3 rounded-full bg-cream-100 hover:bg-cream-200 active:bg-cream-300 text-charcoal-900 border border-cream-300/80 font-semibold text-xs tracking-wide transition-all active:scale-95 shadow-xs"
        >
          <Phone className="w-4 h-4 text-gold-dark flex-shrink-0" />
          <span>Call Ram</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 py-3 px-3 rounded-full bg-charcoal-900 hover:bg-charcoal-800 active:bg-charcoal-700 text-cream-50 font-semibold text-xs tracking-wide transition-all active:scale-95 shadow-sm"
        >
          <MessageCircle className="w-4 h-4 text-[#25D366] flex-shrink-0" />
          <span>WhatsApp Ram</span>
        </a>
      </div>
    </div>
  );
};
