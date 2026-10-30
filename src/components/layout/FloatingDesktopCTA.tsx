import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

interface FloatingDesktopCTAProps {
  onOpenWizard: () => void;
}

export const FloatingDesktopCTA: React.FC<FloatingDesktopCTAProps> = ({ onOpenWizard }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear once user scrolls past hero section (approx 400px)
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-30 hidden md:block animate-in fade-in slide-in-from-bottom-4 duration-300">
      <button
        onClick={onOpenWizard}
        className="group flex items-center space-x-3 bg-charcoal-900/90 hover:bg-charcoal-900 backdrop-blur-md text-cream-50 pl-4 pr-5 py-3 rounded-full shadow-floating border border-cream-200/20 hover:border-gold/50 transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Plan Your Event with SriRam Events"
      >
        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-charcoal-900 transition-colors">
          <Calendar className="w-4 h-4" />
        </div>
        <div className="text-left">
          <span className="block text-xs font-semibold tracking-wide uppercase text-cream-100">
            Plan Your Event
          </span>
          <span className="block text-[10px] text-cream-300">Check Date & Requirements</span>
        </div>
        <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
};
