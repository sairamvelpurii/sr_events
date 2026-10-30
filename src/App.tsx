import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileBottomBar } from './components/layout/MobileBottomBar';
import { FloatingDesktopCTA } from './components/layout/FloatingDesktopCTA';

import { HeroSection } from './components/hero/HeroSection';
import { IntroSection } from './components/intro/IntroSection';
import { ServicesSection } from './components/services/ServicesSection';
import { EventScaleSection } from './components/services/EventScaleSection';
import { WhySRSection } from './components/services/WhySRSection';
import { FeaturedEvents } from './components/events/FeaturedEvents';
import { EventGallery } from './components/gallery/EventGallery';
import { BeforeAfterSection } from './components/comparison/BeforeAfterSection';
import { AvailabilityCalendar } from './components/calendar/AvailabilityCalendar';
import { ReviewsSection } from './components/reviews/ReviewsSection';
import { ContactSection } from './components/contact/ContactSection';

import { EventPlannerWizard } from './components/wizard/EventPlannerWizard';
import { CallbackModal } from './components/wizard/CallbackModal';
import { SavedInspirationModal } from './components/gallery/SavedInspirationModal';

import { storageService } from './services/storageService';
import { EventCategory } from './types';

export function App() {
  // Wizard Modal state
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardInitialCategory, setWizardInitialCategory] = useState<EventCategory | null>(null);
  const [wizardInitialDate, setWizardInitialDate] = useState<string | null>(null);
  const [wizardInspirations, setWizardInspirations] = useState<string[]>([]);

  // Callback Modal state
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  // Saved Inspiration Modal state
  const [isInspirationOpen, setIsInspirationOpen] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  // Initialize and subscribe to Saved Inspiration storage
  useEffect(() => {
    setSavedIds(storageService.getSavedInspirations());
    const unsubscribe = storageService.subscribe((updated) => {
      setSavedIds(updated);
    });
    return () => unsubscribe();
  }, []);

  const handleToggleSave = (id: string) => {
    storageService.toggleSavedInspiration(id);
  };

  const handleClearAllInspirations = () => {
    storageService.clearSavedInspirations();
  };

  // Open wizard with default settings
  const handleOpenWizard = () => {
    setWizardInitialCategory(null);
    setWizardInitialDate(null);
    setWizardInspirations([]);
    setIsWizardOpen(true);
  };

  // Open wizard with pre-selected service
  const handleSelectService = (category: EventCategory) => {
    setWizardInitialCategory(category);
    setWizardInitialDate(null);
    setIsWizardOpen(true);
  };

  // Open wizard from calendar with pre-selected available date
  const handleSelectAvailableDate = (dateStr: string) => {
    setWizardInitialDate(dateStr);
    setIsWizardOpen(true);
  };

  // Open wizard carrying saved inspirations
  const handlePlanWithInspirations = (titles: string[]) => {
    setWizardInspirations(titles);
    setIsWizardOpen(true);
  };

  return (
    <div className="min-h-screen bg-cream-50 text-charcoal-900 pb-mobile-cta antialiased">
      {/* Sticky Responsive Header */}
      <Navbar
        onOpenWizard={handleOpenWizard}
        onOpenInspiration={() => setIsInspirationOpen(true)}
      />

      {/* Main Content Layout */}
      <main>
        {/* 1. HERO SECTION */}
        <HeroSection onOpenWizard={handleOpenWizard} />

        {/* 2. INTRODUCTION SECTION ("Your Event. Our Responsibility") */}
        <IntroSection />

        {/* 3. SERVICES SECTION */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* 4. EVENT SCALE SECTION (Intimate, Signature, Grand) */}
        <EventScaleSection onOpenWizard={handleOpenWizard} />

        {/* 5. WHY SR EVENTS SECTION */}
        <WhySRSection />

        {/* 6. FEATURED EVENTS SECTION */}
        <FeaturedEvents
          onSelectEvent={handleSelectService}
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
        />

        {/* 7. INTERACTIVE GALLERY */}
        <EventGallery
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
          onOpenInspiration={() => setIsInspirationOpen(true)}
        />

        {/* 9. BEFORE / AFTER TRANSFORMATION SECTION */}
        <BeforeAfterSection />

        {/* 10. LIVE EVENT AVAILABILITY CALENDAR */}
        <AvailabilityCalendar onSelectAvailableDate={handleSelectAvailableDate} />

        {/* 11. CLIENT REVIEWS SECTION */}
        <ReviewsSection />

        {/* 12. CONTACT SECTION */}
        <ContactSection
          onOpenWizard={handleOpenWizard}
          onOpenCallback={() => setIsCallbackOpen(true)}
        />
      </main>

      {/* Luxury Comprehensive Footer */}
      <Footer
        onOpenWizard={handleOpenWizard}
        onOpenInspiration={() => setIsInspirationOpen(true)}
        onOpenCallback={() => setIsCallbackOpen(true)}
      />

      {/* Fixed Mobile Bottom Bar: Call Ram | WhatsApp */}
      <MobileBottomBar />

      {/* Subtle Floating Desktop CTA */}
      <FloatingDesktopCTA onOpenWizard={handleOpenWizard} />

      {/* 5-Step Plan Your Event Wizard */}
      <EventPlannerWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        initialCategory={wizardInitialCategory}
        initialDate={wizardInitialDate}
        savedInspirationTitles={wizardInspirations}
      />

      {/* Quick Request a Callback Modal */}
      <CallbackModal
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
      />

      {/* Saved Inspiration Drawer / Modal */}
      <SavedInspirationModal
        isOpen={isInspirationOpen}
        onClose={() => setIsInspirationOpen(false)}
        savedIds={savedIds}
        onToggleSave={handleToggleSave}
        onClearAll={handleClearAllInspirations}
        onPlanWithInspirations={handlePlanWithInspirations}
      />
    </div>
  );
}

export default App;
