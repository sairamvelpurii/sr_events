import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Phone, Calendar } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../config/business';
import { storageService } from '../../services/storageService';

interface NavbarProps {
  onOpenWizard: () => void;
  onOpenInspiration: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWizard, onOpenInspiration }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Track saved ideas count
    setSavedCount(storageService.getSavedInspirations().length);
    const unsubscribe = storageService.subscribe((items) => {
      setSavedCount(items.length);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Events', href: '#events' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Availability', href: '#availability' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F4]/95 backdrop-blur-md shadow-sm border-b border-cream-200/80 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center space-x-2 sm:space-x-2.5 group min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-charcoal-900 flex items-center justify-center text-gold font-display font-semibold text-base sm:text-lg tracking-wider transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
              SR
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-display font-bold text-lg sm:text-2xl tracking-tight sm:tracking-wide text-charcoal-900 leading-tight truncate">
                SriRam Events
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-charcoal-500 font-medium truncate">
                Addanki · Events & Decor
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-charcoal-700 hover:text-gold-dark transition-colors tracking-wide py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-gold after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3.5">
            {/* Saved Inspiration Button */}
            <button
              onClick={onOpenInspiration}
              aria-label="View Saved Inspiration"
              className="relative p-2 text-charcoal-700 hover:text-gold-dark rounded-full hover:bg-cream-100 transition-colors"
              title="View Saved Inspiration"
            >
              <Heart className={`w-5 h-5 ${savedCount > 0 ? 'fill-gold text-gold' : ''}`} />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-charcoal-900 text-cream-50 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Direct Call Quick Link */}
            <a
              href={BUSINESS_CONFIG.phoneTel}
              className="hidden md:inline-flex items-center space-x-1.5 text-xs font-medium text-charcoal-700 hover:text-charcoal-900 px-3 py-2 rounded-full border border-cream-200 hover:border-gold/50 bg-cream-50/80 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-gold-dark" />
              <span>{BUSINESS_CONFIG.phone}</span>
            </a>

            {/* Primary CTA */}
            <button
              onClick={onOpenWizard}
              className="inline-flex items-center space-x-2 bg-charcoal-900 hover:bg-charcoal-800 text-cream-50 text-xs sm:text-sm font-medium px-4 sm:px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-200 active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span>Plan Your Event</span>
            </button>
          </div>

          {/* Mobile Right Bar: Saved + Menu Hamburger */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={onOpenInspiration}
              aria-label="View Saved Inspiration"
              className="relative p-2 text-charcoal-700 rounded-full hover:bg-cream-100"
            >
              <Heart className={`w-5 h-5 ${savedCount > 0 ? 'fill-gold text-gold' : ''}`} />
              {savedCount > 0 && (
                <span className="absolute top-0 right-0 bg-charcoal-900 text-cream-50 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-charcoal-900 rounded-lg hover:bg-cream-100"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream-50/98 backdrop-blur-xl border-b border-cream-200 px-5 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-charcoal-800 hover:text-gold-dark py-2 border-b border-cream-100"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 flex flex-col space-y-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWizard();
                }}
                className="w-full bg-charcoal-900 hover:bg-charcoal-800 text-cream-50 font-medium py-3 rounded-full text-center text-sm shadow flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4 text-gold" />
                <span>Plan Your Event</span>
              </button>

              <div className="flex items-center justify-between pt-2 text-xs text-charcoal-500">
                <span>Addanki & Nearby Areas</span>
                <a href={BUSINESS_CONFIG.phoneTel} className="font-semibold text-charcoal-900">
                  Ram: {BUSINESS_CONFIG.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
