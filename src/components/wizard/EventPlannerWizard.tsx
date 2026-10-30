import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Calendar,
  Users,
  MapPin,
  Sparkles,
  Phone,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
  Edit2,
  Lock,
} from 'lucide-react';
import {
  EventCategory,
  DatePreferenceType,
  GuestCountRange,
  ContactPreference,
  LeadSubmission,
} from '../../types';
import { leadService } from '../../services/leadService';
import { availabilityService } from '../../services/availabilityService';
import { BUSINESS_CONFIG, buildWhatsAppLink } from '../../config/business';

interface EventPlannerWizardProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: EventCategory | null;
  initialDate?: string | null;
  savedInspirationTitles?: string[];
}

const EVENT_TYPES: EventCategory[] = [
  'Wedding',
  'Engagement',
  'Birthday',
  'Reception',
  'Corporate Event',
  'Private Event',
  'Other',
];

const GUEST_RANGES: GuestCountRange[] = [
  'Under 50',
  '50–100',
  '100–250',
  '250–500',
  '500–1,000',
  '1,000–5,000',
  '5,000–10,000+',
  'Not decided',
];

const REQUIREMENTS_LIST = [
  'Decoration',
  'Stage Setup',
  'Catering',
  'Photography',
  'Videography',
  'DJ / Music',
  'Event Coordination',
  'Other',
];

const MONTHS_LIST = [
  'October 2026',
  'November 2026',
  'December 2026',
  'January 2027',
  'February 2027',
  'March 2027',
  'April 2027',
  'May 2027',
  'Later in 2027',
];

export const EventPlannerWizard: React.FC<EventPlannerWizardProps> = ({
  isOpen,
  onClose,
  initialCategory,
  initialDate,
  savedInspirationTitles = [],
}) => {
  // Wizard Step (1 to 5)
  const [step, setStep] = useState<number>(1);

  // Form State
  const [eventType, setEventType] = useState<EventCategory>(initialCategory || 'Wedding');
  const [datePrefType, setDatePrefType] = useState<DatePreferenceType>(
    initialDate ? 'FIXED' : 'FIXED'
  );
  const [fixedDate, setFixedDate] = useState<string>(initialDate || '');
  const [preferredMonth, setPreferredMonth] = useState<string>('November 2026');
  const [flexiblePreference, setFlexiblePreference] = useState<string>('Weekend preferred');

  // Step 2: Guests & Location
  const [guestCount, setGuestCount] = useState<GuestCountRange>('100–250');
  const [locationChoice, setLocationChoice] = useState<'Addanki' | 'Nearby Area' | 'Other'>('Addanki');
  const [customLocation, setCustomLocation] = useState<string>('');
  const [venue, setVenue] = useState<string>('');

  // Step 3: Requirements
  const [requirements, setRequirements] = useState<string[]>(['Decoration', 'Stage Setup']);
  const [notes, setNotes] = useState<string>('');

  // Step 4: Contact
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [contactPreference, setContactPreference] = useState<ContactPreference>('WhatsApp');

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedWhatsappUrl, setSubmittedWhatsappUrl] = useState<string>('');

  // Date availability validation for fixed date
  const [dateStatus, setDateStatus] = useState<'AVAILABLE' | 'BOOKED' | 'CHECKING' | 'IDLE'>('IDLE');

  // Update initial props if they change
  useEffect(() => {
    if (initialCategory) setEventType(initialCategory);
    if (initialDate) {
      setFixedDate(initialDate);
      setDatePrefType('FIXED');
    }
  }, [initialCategory, initialDate]);

  // Check date availability when fixedDate changes
  useEffect(() => {
    if (datePrefType === 'FIXED' && fixedDate) {
      setDateStatus('CHECKING');
      const year = parseInt(fixedDate.slice(0, 4), 10);
      const month = parseInt(fixedDate.slice(5, 7), 10);

      availabilityService.getAvailability(year, month).then((res) => {
        if (res.isError) {
          setDateStatus('IDLE');
        } else {
          const status = availabilityService.getDateStatus(fixedDate, res.records);
          setDateStatus(status);
        }
      });
    } else {
      setDateStatus('IDLE');
    }
  }, [datePrefType, fixedDate]);

  if (!isOpen) return null;

  // Validation per step
  const canProceedStep1 = () => {
    if (!eventType) return false;
    if (datePrefType === 'FIXED') {
      if (!fixedDate) return false;
      if (dateStatus === 'BOOKED') return false; // Prevent continuation if date is booked!
    }
    return true;
  };

  const canProceedStep2 = () => {
    if (!guestCount) return false;
    if (locationChoice === 'Other' && !customLocation.trim()) return false;
    return true;
  };

  const canProceedStep3 = () => {
    return requirements.length > 0;
  };

  const canProceedStep4 = () => {
    const phoneClean = phone.replace(/\D/g, '');
    return fullName.trim().length >= 2 && phoneClean.length >= 10;
  };

  const handleNext = () => {
    if (step === 1 && !canProceedStep1()) return;
    if (step === 2 && !canProceedStep2()) return;
    if (step === 3 && !canProceedStep3()) return;
    if (step === 4 && !canProceedStep4()) return;
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const toggleRequirement = (req: string) => {
    if (requirements.includes(req)) {
      setRequirements(requirements.filter((r) => r !== req));
    } else {
      setRequirements([...requirements, req]);
    }
  };

  const resolvedLocation =
    locationChoice === 'Other'
      ? customLocation.trim()
      : locationChoice === 'Nearby Area'
      ? 'Nearby Area (Addanki region)'
      : 'Addanki';

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    const leadPayload = {
      name: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      contactPreference,
      eventType,
      datePreferenceType: datePrefType,
      eventDate: datePrefType === 'FIXED' ? fixedDate : undefined,
      preferredMonth: datePrefType === 'FLEXIBLE' ? preferredMonth : undefined,
      datePreference: datePrefType === 'FLEXIBLE' ? flexiblePreference : undefined,
      guestCount,
      location: resolvedLocation,
      venue: venue.trim() || undefined,
      requirements,
      message: notes.trim() || undefined,
      savedIdeas: savedInspirationTitles,
    };

    try {
      const res = await leadService.submitEnquiry(leadPayload);
      setSubmittedWhatsappUrl(res.whatsappUrl);
      setIsSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSubmitError(err.message);
      } else {
        setSubmitError(
          "We're unable to prepare the enquiry right now. Please contact Ram directly on WhatsApp or phone."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dynamic Contextual WhatsApp URL for Escape Route
  const getContextualWhatsAppText = () => {
    const parts = [`Hi Ram, I am planning a ${eventType} event`];
    if (resolvedLocation) parts.push(`in ${resolvedLocation}`);
    if (datePrefType === 'FIXED' && fixedDate) parts.push(`on ${fixedDate}`);
    parts.push('and would like to discuss requirements.');
    return parts.join(' ');
  };

  const stepsInfo = [
    { num: 1, name: 'Event' },
    { num: 2, name: 'Details' },
    { num: 3, name: 'Requirements' },
    { num: 4, name: 'Contact' },
    { num: 5, name: 'Review' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-charcoal-900/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-cream-50 rounded-2xl shadow-2xl border border-cream-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-cream-200 bg-cream-100/70 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold-dark">
                SRIRAM EVENTS · ADDANKI
              </span>
              <span className="text-charcoal-400">·</span>
              <span className="text-xs font-semibold text-charcoal-700">
                Step {step} of 5
              </span>
            </div>
            <h3 className="font-display text-lg font-semibold text-charcoal-900">
              Plan Your Event
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-charcoal-500 hover:text-charcoal-900 rounded-full hover:bg-cream-200 transition-colors"
            aria-label="Close Planning Wizard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (5 Steps) */}
        {!isSubmitted && (
          <div className="px-6 pt-3 pb-2 bg-cream-50 border-b border-cream-200/60">
            <div className="grid grid-cols-5 gap-2">
              {stepsInfo.map((s) => (
                <div key={s.num} className="space-y-1">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      step >= s.num ? 'bg-charcoal-900' : 'bg-cream-200'
                    }`}
                  />
                  <span
                    className={`hidden sm:block text-[10px] font-medium tracking-tight text-center ${
                      step === s.num ? 'text-charcoal-900 font-semibold' : 'text-charcoal-400'
                    }`}
                  >
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* SUCCESS SCREEN */}
          {isSubmitted ? (
            <div className="py-8 px-4 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
              {/* Subtle Luxury Success Icon */}
              <div className="w-16 h-16 rounded-full bg-emerald-100/80 border-2 border-emerald-600/30 flex items-center justify-center mx-auto text-emerald-800 shadow-sm">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div className="space-y-2">
                <h4 className="font-display text-2xl font-semibold text-charcoal-900">
                  Enquiry Formatted for WhatsApp ✓
                </h4>
                <p className="text-sm text-charcoal-600 max-w-md mx-auto leading-relaxed">
                  Your event requirements and options have been prepared for Ram. If WhatsApp didn't open automatically in a new window, tap the button below to send your enquiry directly.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={submittedWhatsappUrl || buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white text-xs sm:text-sm font-semibold shadow-md transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>Share on WhatsApp with Ram</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-cream-100 hover:bg-cream-200 text-charcoal-900 text-xs sm:text-sm font-semibold border border-cream-300 transition-colors"
                >
                  Back to Website
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: EVENT & DATE */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  {/* Event Type */}
                  <div className="space-y-3">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-700">
                      1. What are you planning? *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {EVENT_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setEventType(type)}
                          className={`p-3 rounded-xl text-left border text-xs sm:text-sm font-medium transition-all ${
                            eventType === type
                              ? 'bg-charcoal-900 text-cream-50 border-charcoal-900 shadow-sm'
                              : 'bg-cream-100/60 hover:bg-cream-200/70 border-cream-200 text-charcoal-800'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date Preference Selection */}
                  <div className="space-y-3 pt-2">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-700">
                      2. Do you have a fixed event date? *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setDatePrefType('FIXED')}
                        className={`p-3 rounded-xl text-center border text-xs font-medium transition-all ${
                          datePrefType === 'FIXED'
                            ? 'bg-charcoal-900 text-cream-50 border-charcoal-900 shadow-sm'
                            : 'bg-cream-100/60 border-cream-200 text-charcoal-800 hover:bg-cream-200/60'
                        }`}
                      >
                        Yes, I have a date
                      </button>

                      <button
                        type="button"
                        onClick={() => setDatePrefType('FLEXIBLE')}
                        className={`p-3 rounded-xl text-center border text-xs font-medium transition-all ${
                          datePrefType === 'FLEXIBLE'
                            ? 'bg-charcoal-900 text-cream-50 border-charcoal-900 shadow-sm'
                            : 'bg-cream-100/60 border-cream-200 text-charcoal-800 hover:bg-cream-200/60'
                        }`}
                      >
                        I'm flexible
                      </button>

                      <button
                        type="button"
                        onClick={() => setDatePrefType('NOT_DECIDED')}
                        className={`p-3 rounded-xl text-center border text-xs font-medium transition-all ${
                          datePrefType === 'NOT_DECIDED'
                            ? 'bg-charcoal-900 text-cream-50 border-charcoal-900 shadow-sm'
                            : 'bg-cream-100/60 border-cream-200 text-charcoal-800 hover:bg-cream-200/60'
                        }`}
                      >
                        I haven't decided yet
                      </button>
                    </div>

                    {/* Conditional Date Pickers based on preference */}
                    {datePrefType === 'FIXED' && (
                      <div className="mt-4 p-4 rounded-xl bg-cream-100/70 border border-cream-200 space-y-3 animate-in fade-in duration-200">
                        <label className="block text-xs font-medium text-charcoal-700">
                          Select your specific date:
                        </label>
                        <input
                          type="date"
                          value={fixedDate}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setFixedDate(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-cream-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                        />

                        {fixedDate && (
                          <div className="pt-2 text-xs">
                            {dateStatus === 'CHECKING' && (
                              <p className="text-charcoal-500">Checking availability schedule...</p>
                            )}
                            {dateStatus === 'AVAILABLE' && (
                              <div className="flex items-center space-x-2 text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                <span>✓ Currently Available for planning</span>
                              </div>
                            )}
                            {dateStatus === 'BOOKED' && (
                              <div className="space-y-2 text-rose-800 bg-rose-50 p-3 rounded-lg border border-rose-200">
                                <div className="flex items-center space-x-2">
                                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                                  <span className="font-semibold">This date is currently booked.</span>
                                </div>
                                <p className="text-[11px] text-rose-700">
                                  Please choose another date or choose "I'm flexible" to discuss alternative days with Ram.
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {datePrefType === 'FLEXIBLE' && (
                      <div className="mt-4 p-4 rounded-xl bg-cream-100/70 border border-cream-200 space-y-3 animate-in fade-in duration-200">
                        <div>
                          <label className="block text-xs font-medium text-charcoal-700 mb-1">
                            Preferred Month:
                          </label>
                          <select
                            value={preferredMonth}
                            onChange={(e) => setPreferredMonth(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg border border-cream-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                          >
                            {MONTHS_LIST.map((m) => (
                              <option key={m} value={m}>
                                {m}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-charcoal-700 mb-1">
                            Preference Details:
                          </label>
                          <input
                            type="text"
                            value={flexiblePreference}
                            onChange={(e) => setFlexiblePreference(e.target.value)}
                            placeholder="e.g. Weekend preferred, mid-month auspicious day"
                            className="w-full px-4 py-2.5 rounded-lg border border-cream-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                          />
                        </div>
                      </div>
                    )}

                    {datePrefType === 'NOT_DECIDED' && (
                      <p className="text-xs text-charcoal-500 italic p-3 bg-cream-100/50 rounded-lg">
                        No worries! You can continue planning your requirements and finalize the date with Ram later.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 2: GUESTS & LOCATION */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  {/* Guest Count */}
                  <div className="space-y-3">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-700">
                      Expected Guest Count *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                      {GUEST_RANGES.map((range) => (
                        <button
                          key={range}
                          type="button"
                          onClick={() => setGuestCount(range)}
                          className={`p-3 rounded-xl text-center border text-xs sm:text-sm font-medium transition-all ${
                            guestCount === range
                              ? 'bg-charcoal-900 text-cream-50 border-charcoal-900 shadow-sm'
                              : 'bg-cream-100/60 border-cream-200 text-charcoal-800 hover:bg-cream-200/60'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Event Location */}
                  <div className="space-y-3 pt-2">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-700">
                      Where will your event take place? *
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {(['Addanki', 'Nearby Area', 'Other'] as const).map((loc) => (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => setLocationChoice(loc)}
                          className={`p-3 rounded-xl text-center border text-xs font-medium transition-all ${
                            locationChoice === loc
                              ? 'bg-charcoal-900 text-cream-50 border-charcoal-900 shadow-sm'
                              : 'bg-cream-100/60 border-cream-200 text-charcoal-800 hover:bg-cream-200/60'
                          }`}
                        >
                          {loc}
                        </button>
                      ))}
                    </div>

                    {locationChoice === 'Other' && (
                      <div className="pt-2 animate-in fade-in duration-150">
                        <label className="block text-xs font-medium text-charcoal-700 mb-1">
                          Please enter your specific location / town: *
                        </label>
                        <input
                          type="text"
                          value={customLocation}
                          onChange={(e) => setCustomLocation(e.target.value)}
                          placeholder="e.g. Chilakaluripet, Martur, Medarametla, etc."
                          className="w-full px-4 py-2.5 rounded-lg border border-cream-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                        />
                      </div>
                    )}
                  </div>

                  {/* Venue / Area (Optional) */}
                  <div className="space-y-2 pt-2">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-700">
                      Venue / Area (Optional)
                    </label>
                    <input
                      type="text"
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                      placeholder="Convention hall, hotel, function hall, home, etc."
                      className="w-full px-4 py-2.5 rounded-lg border border-cream-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                    <p className="text-[11px] text-charcoal-400">
                      Leave blank if you haven't booked or decided on a venue yet.
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 3: REQUIREMENTS */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-700">
                        What do you need for your event? *
                      </label>
                      <span className="text-[11px] text-charcoal-400">Select all that apply</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {REQUIREMENTS_LIST.map((req) => {
                        const isSelected = requirements.includes(req);
                        return (
                          <button
                            key={req}
                            type="button"
                            onClick={() => toggleRequirement(req)}
                            className={`p-3.5 rounded-xl text-left border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-cream-100 border-charcoal-900 text-charcoal-900 shadow-sm'
                                : 'bg-white border-cream-200 text-charcoal-700 hover:bg-cream-100/50'
                            }`}
                          >
                            <span>{req}</span>
                            <div
                              className={`w-4 h-4 rounded border flex items-center justify-center ${
                                isSelected
                                  ? 'bg-charcoal-900 border-charcoal-900 text-white'
                                  : 'border-cream-300'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Notes / Special Requests */}
                  <div className="space-y-2 pt-2">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-700">
                      Anything else you'd like us to know?
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Special decor style, color preference, specific celebration themes, or questions..."
                      className="w-full px-4 py-2.5 rounded-lg border border-cream-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  {/* Shortlisted Inspiration Indicator if attached */}
                  {savedInspirationTitles.length > 0 && (
                    <div className="p-3 bg-cream-100/70 border border-gold/40 rounded-xl text-xs space-y-1">
                      <span className="font-semibold text-charcoal-900">
                        Attached Saved Inspiration ({savedInspirationTitles.length} items):
                      </span>
                      <p className="text-charcoal-500 truncate">
                        {savedInspirationTitles.join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 4: CONTACT & PREFERENCE */}
              {step === 4 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-4 py-2.5 rounded-lg border border-cream-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-700 mb-1">
                        WhatsApp Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="10-digit WhatsApp number"
                        className="w-full px-4 py-2.5 rounded-lg border border-cream-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-cream-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                      />
                    </div>

                    {/* WhatsApp Dedicated Sharing Note */}
                    <div className="p-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-start space-x-3 mt-1">
                      <div className="w-8 h-8 rounded-full bg-[#128C7E] flex items-center justify-center text-white flex-shrink-0 mt-0.5 shadow-xs">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-charcoal-900">
                          Direct WhatsApp Sharing
                        </p>
                        <p className="text-xs text-charcoal-600 leading-relaxed">
                          Your event details will be formatted and shared directly with Ram on WhatsApp for instant coordination and pricing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: REVIEW & SUBMIT */}
              {step === 5 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border border-cream-200 rounded-2xl overflow-hidden bg-cream-50 divide-y divide-cream-200">
                    {/* Header */}
                    <div className="p-4 bg-cream-100/60 flex items-center justify-between">
                      <h4 className="font-display font-semibold text-charcoal-900 text-base">
                        Your Event Summary
                      </h4>
                      <span className="text-xs text-charcoal-500">Please review before sending</span>
                    </div>

                    {/* Section 1: Event & Date */}
                    <div className="p-4 flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-400">
                          Event & Date
                        </span>
                        <p className="text-sm font-semibold text-charcoal-900">{eventType}</p>
                        <p className="text-xs text-charcoal-600">
                          {datePrefType === 'FIXED'
                            ? `Date: ${fixedDate || 'Not specified'}`
                            : datePrefType === 'FLEXIBLE'
                            ? `Flexible: ${preferredMonth} (${flexiblePreference})`
                            : 'Date not decided yet'}
                        </p>
                      </div>
                      <button
                        onClick={() => setStep(1)}
                        className="text-xs font-semibold text-gold-dark hover:text-charcoal-900 flex items-center space-x-1"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                    </div>

                    {/* Section 2: Scale & Location */}
                    <div className="p-4 flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-400">
                          Scale & Location
                        </span>
                        <p className="text-sm font-semibold text-charcoal-900">
                          Guests: {guestCount}
                        </p>
                        <p className="text-xs text-charcoal-600">Location: {resolvedLocation}</p>
                        {venue && <p className="text-xs text-charcoal-500">Venue: {venue}</p>}
                      </div>
                      <button
                        onClick={() => setStep(2)}
                        className="text-xs font-semibold text-gold-dark hover:text-charcoal-900 flex items-center space-x-1"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                    </div>

                    {/* Section 3: Requirements */}
                    <div className="p-4 flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-400">
                          Requirements
                        </span>
                        <p className="text-xs text-charcoal-700 leading-relaxed">
                          {requirements.join(', ')}
                        </p>
                        {notes && (
                          <p className="text-xs text-charcoal-500 italic mt-1">Note: "{notes}"</p>
                        )}
                        {savedInspirationTitles.length > 0 && (
                          <p className="text-[11px] text-gold-dark font-medium mt-1">
                            +{savedInspirationTitles.length} inspiration setups attached
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => setStep(3)}
                        className="text-xs font-semibold text-gold-dark hover:text-charcoal-900 flex items-center space-x-1"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                    </div>

                    {/* Section 4: Contact */}
                    <div className="p-4 flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-400">
                          Contact & WhatsApp
                        </span>
                        <p className="text-sm font-semibold text-charcoal-900">{fullName}</p>
                        <p className="text-xs text-charcoal-600 flex items-center space-x-1.5 mt-0.5">
                          <MessageCircle className="w-3.5 h-3.5 text-[#128C7E]" />
                          <span>{phone} · Share via WhatsApp</span>
                        </p>
                      </div>
                      <button
                        onClick={() => setStep(4)}
                        className="text-xs font-semibold text-gold-dark hover:text-charcoal-900 flex items-center space-x-1"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>

                  {/* Submission Error Message */}
                  {submitError && (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start space-x-2.5">
                      <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Required Privacy Message */}
                  <p className="text-center text-[11px] text-charcoal-500 italic">
                    Your information is used only to respond to your event enquiry.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Bottom Wizard Footer Controls */}
        {!isSubmitted && (
          <div className="p-4 sm:p-5 border-t border-cream-200 bg-cream-100/60 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* WhatsApp Escape Route */}
            <a
              href={buildWhatsAppLink(getContextualWhatsAppText())}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-charcoal-600 hover:text-charcoal-900 hover:underline flex items-center space-x-1.5 order-2 sm:order-1"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#128C7E]" />
              <span>Prefer WhatsApp? Chat with Ram →</span>
            </a>

            {/* Back / Next / Submit Controls */}
            <div className={`flex items-center gap-2.5 w-full sm:w-auto order-1 sm:order-2 ${step > 1 ? 'justify-between sm:justify-end' : 'justify-end'}`}>
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-4 py-2.5 rounded-full bg-cream-100 hover:bg-cream-200 text-charcoal-800 text-xs font-semibold border border-cream-300 transition-colors flex items-center space-x-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              )}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={
                    (step === 1 && !canProceedStep1()) ||
                    (step === 2 && !canProceedStep2()) ||
                    (step === 3 && !canProceedStep3()) ||
                    (step === 4 && !canProceedStep4())
                  }
                  className={`${step === 1 ? 'w-full sm:w-auto' : 'flex-1 sm:flex-initial'} px-6 py-2.5 rounded-full bg-charcoal-900 hover:bg-charcoal-800 disabled:opacity-50 disabled:cursor-not-allowed text-cream-50 text-xs sm:text-sm font-semibold shadow transition-all active:scale-95 flex items-center justify-center space-x-1.5`}
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  className="flex-1 sm:flex-initial px-6 sm:px-7 py-3 rounded-full bg-[#128C7E] hover:bg-[#075E54] disabled:opacity-50 text-white text-xs sm:text-sm font-semibold shadow-md transition-all active:scale-95 flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4 text-white flex-shrink-0" />
                  <span>{isSubmitting ? 'Opening WhatsApp...' : 'Share Details via WhatsApp'}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
