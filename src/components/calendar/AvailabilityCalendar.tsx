import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Phone,
  MessageCircle,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { availabilityService, AvailabilityResult } from '../../services/availabilityService';
import { AvailabilityStatus } from '../../types';
import { BUSINESS_CONFIG, buildWhatsAppLink } from '../../config/business';

interface AvailabilityCalendarProps {
  onSelectAvailableDate: (dateStr: string) => void;
}

export const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  onSelectAvailableDate,
}) => {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [availabilityData, setAvailabilityData] = useState<Record<string, AvailabilityStatus>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  // Fetch availability when year or month changes
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setIsLoading(true);
      setApiError(null);
      try {
        const result: AvailabilityResult = await availabilityService.getAvailability(year, month + 1);
        if (!isMounted) return;
        if (result.isError) {
          setApiError(
            result.errorMessage ||
              'Availability is temporarily unavailable. Please contact Ram to confirm your preferred date.'
          );
        } else {
          setAvailabilityData(result.records);
        }
      } catch (e) {
        if (!isMounted) return;
        setApiError(
          'Availability is temporarily unavailable. Please contact Ram to confirm your preferred date.'
        );
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [year, month]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Days in month calculation
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDateStr(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDateStr(null);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
    setSelectedDateStr(null);
  };

  // Selected date status
  const selectedStatus: AvailabilityStatus | null = selectedDateStr
    ? availabilityService.getDateStatus(selectedDateStr, availabilityData)
    : null;

  return (
    <section id="availability" className="py-20 lg:py-28 bg-cream-100/60 border-t border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <p className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
            DATE AVAILABILITY
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal-900">
            Check Your Event Date
          </h2>
          <p className="text-base text-charcoal-500">
            Planning your event? Check whether your preferred date is currently available across our planning and decor schedules in Addanki.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Calendar Card (8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 bg-cream-50 rounded-2xl p-6 sm:p-8 border border-cream-200 shadow-subtle">
            {/* Calendar Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-cream-200 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-cream-100 border border-cream-200 flex items-center justify-center text-charcoal-900">
                  <CalendarIcon className="w-5 h-5 text-gold-dark" />
                </div>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-charcoal-900">
                    {monthNames[month]} {year}
                  </h3>
                  <button
                    onClick={handleToday}
                    className="text-xs text-charcoal-500 hover:text-charcoal-900 underline transition-colors"
                  >
                    Jump to current month
                  </button>
                </div>
              </div>

              {/* Month Navigation Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrevMonth}
                  className="p-2.5 rounded-full bg-cream-100 hover:bg-cream-200 text-charcoal-700 hover:text-charcoal-900 transition-colors"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-2.5 rounded-full bg-cream-100 hover:bg-cream-200 text-charcoal-700 hover:text-charcoal-900 transition-colors"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Error Banner: Defensive handling when API fails */}
            {apiError ? (
              <div className="p-6 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-4 my-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Availability Information Unavailable</h4>
                    <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                      {apiError}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={buildWhatsAppLink(`Hi Ram, I would like to check date availability for my upcoming event.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-charcoal-900 text-cream-50 text-xs font-semibold"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>WhatsApp Ram</span>
                  </a>
                  <a
                    href={BUSINESS_CONFIG.phoneTel}
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-cream-100 hover:bg-cream-200 text-charcoal-900 text-xs font-semibold border border-cream-300"
                  >
                    <Phone className="w-4 h-4 text-gold-dark" />
                    <span>Call Ram</span>
                  </a>
                </div>
              </div>
            ) : (
              <>
                {/* Days of Week Header */}
                <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center">
                  {daysOfWeek.map((d) => (
                    <div
                      key={d}
                      className="text-[11px] sm:text-xs font-semibold text-charcoal-400 py-1 uppercase tracking-wider"
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1 sm:gap-2">
                  {/* Empty cells before month start */}
                  {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square" />
                  ))}

                  {/* Day cells */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const dayNum = i + 1;
                    const dateFormatted = `${year}-${String(month + 1).padStart(2, '0')}-${String(
                      dayNum
                    ).padStart(2, '0')}`;
                    const status = availabilityService.getDateStatus(dateFormatted, availabilityData);
                    const isBooked = status === 'BOOKED';
                    const isSelected = selectedDateStr === dateFormatted;

                    const today = new Date();
                    const isPast =
                      new Date(year, month, dayNum) <
                      new Date(today.getFullYear(), today.getMonth(), today.getDate());

                    return (
                      <button
                        key={dateFormatted}
                        disabled={isPast}
                        onClick={() => setSelectedDateStr(dateFormatted)}
                        className={`aspect-square rounded-xl p-1 sm:p-2 flex flex-col items-center justify-between transition-all relative border ${
                          isSelected
                            ? 'border-charcoal-900 ring-2 ring-charcoal-900 shadow-md bg-cream-100'
                            : isPast
                            ? 'opacity-35 bg-cream-100/40 border-transparent cursor-not-allowed'
                            : isBooked
                            ? 'bg-rose-50/70 border-rose-200/80 hover:border-rose-400 text-charcoal-900'
                            : 'bg-cream-50 border-cream-200 hover:border-gold hover:shadow-sm text-charcoal-900'
                        }`}
                      >
                        <span className={`text-xs sm:text-sm font-medium ${isPast ? 'text-charcoal-400' : 'text-charcoal-800'}`}>
                          {dayNum}
                        </span>

                        {/* Professional Circular Indicator + Accessible Label */}
                        {!isPast && (
                          <div className="flex items-center space-x-1 mt-auto">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isBooked ? 'bg-[#C62828]' : 'bg-[#2E7D32]'
                              }`}
                            />
                            <span className="hidden xl:inline text-[9px] font-medium text-charcoal-500">
                              {isBooked ? 'Booked' : 'Avail'}
                            </span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Calendar Legend */}
                <div className="mt-8 pt-6 border-t border-cream-200 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32]" />
                      <span className="text-charcoal-700 font-medium">● Available</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#C62828]" />
                      <span className="text-charcoal-700 font-medium">● Booked</span>
                    </div>
                  </div>
                  <span className="text-charcoal-400 text-[11px]">
                    Updated directly by SR Events coordination team
                  </span>
                </div>
              </>
            )}

            {/* Subtle Required Availability Disclaimer */}
            <p className="mt-6 text-xs text-charcoal-500 italic bg-cream-100/50 p-3 rounded-lg border border-cream-200">
              * Availability is subject to change. A date is only confirmed after SR Events confirms your booking with you.
            </p>
          </div>

          {/* Selected Date Action Panel (4 cols) */}
          <div className="lg:col-span-5 xl:col-span-4 bg-cream-50 rounded-2xl p-6 sm:p-7 border border-cream-200 shadow-subtle space-y-6">
            <div>
              <span className="text-[10px] uppercase font-semibold text-gold-dark tracking-wider">
                Selected Date Status
              </span>
              <h3 className="font-display text-xl font-semibold text-charcoal-900 mt-1">
                {selectedDateStr ? (
                  new Date(selectedDateStr).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                ) : (
                  'Select a Date'
                )}
              </h3>
            </div>

            {selectedDateStr ? (
              selectedStatus === 'AVAILABLE' ? (
                /* Date is Currently Available */
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="flex items-start space-x-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-emerald-900">
                        ✓ Currently Available
                      </p>
                      <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                        This date is currently open for planning and execution in Addanki and nearby areas.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectAvailableDate(selectedDateStr)}
                    className="w-full py-3.5 px-6 rounded-full bg-charcoal-900 hover:bg-charcoal-800 text-cream-50 font-semibold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center space-x-2"
                  >
                    <CalendarIcon className="w-4 h-4 text-gold" />
                    <span>Plan Your Event on this Date</span>
                  </button>

                  <a
                    href={buildWhatsAppLink(
                      `Hi Ram, I checked ${selectedDateStr} on SR Events website and saw it is available. I'd like to discuss planning our event.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-full bg-cream-100 hover:bg-cream-200 text-charcoal-800 text-xs font-semibold border border-cream-300 transition-colors flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-4 h-4 text-[#128C7E]" />
                    <span>Ask Ram on WhatsApp</span>
                  </a>
                </div>
              ) : (
                /* Date is Booked */
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="flex items-start space-x-3 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900">
                    <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-rose-900">
                        This date is currently booked.
                      </p>
                      <p className="text-xs text-rose-700 mt-1 leading-relaxed">
                        An event is already scheduled for this day. Try another date or contact Ram for alternative arrangements.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <button
                      onClick={() => setSelectedDateStr(null)}
                      className="w-full py-3 px-4 rounded-full bg-cream-100 hover:bg-cream-200 text-charcoal-900 text-xs font-semibold border border-cream-300 transition-colors"
                    >
                      Check Another Date
                    </button>

                    <a
                      href={buildWhatsAppLink(
                        `Hi Ram, I noticed that ${selectedDateStr} is booked on the SR Events website. Are there nearby dates or alternative arrangements possible?`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-full bg-charcoal-900 hover:bg-charcoal-800 text-cream-50 text-xs font-semibold shadow-sm transition-all flex items-center justify-center space-x-2"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>WhatsApp Ram</span>
                    </a>
                  </div>
                </div>
              )
            ) : (
              /* No Date Selected State */
              <div className="py-8 text-center space-y-3 text-charcoal-400">
                <CalendarIcon className="w-10 h-10 mx-auto text-charcoal-300 stroke-[1.5]" />
                <p className="text-xs text-charcoal-500 leading-relaxed">
                  Click any date on the calendar to verify current availability status and proceed to planning.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
