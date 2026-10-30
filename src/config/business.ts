export const BUSINESS_CONFIG = {
  name: 'SR Events',
  tagline: 'Moments Worth Remembering',
  contactPerson: 'Ram',
  phone: '9494954646',
  phoneFormatted: '+91 94949 54646',
  phoneTel: 'tel:9494954646',
  whatsappBaseUrl: 'https://wa.me/919494954646',
  location: 'Addanki, Andhra Pradesh & nearby areas',
  serviceAreasSummary: 'Addanki & Nearby Areas',
  state: 'Andhra Pradesh',
  country: 'India',
  
  eventCategories: [
    'Weddings',
    'Engagements',
    'Birthdays',
    'Receptions',
    'Corporate Events',
    'Private Events',
    'Other Celebrations',
  ] as const,

  serviceOfferings: [
    'Decoration & Styling',
    'Stage & Mandap Setup',
    'Catering Coordination',
    'Photography & Film',
    'Sound & Lighting / DJ',
    'End-to-End Event Coordination',
  ] as const,
};

/**
 * Builds a contextual WhatsApp link to Ram with a cleanly formatted, encoded message.
 */
export function buildWhatsAppLink(customMessage?: string): string {
  const defaultText = `Hi Ram, I found SR Events online and would like to enquire about my event.`;
  const text = customMessage && customMessage.trim() ? customMessage.trim() : defaultText;
  return `${BUSINESS_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(text)}`;
}

/**
 * Builds a dynamic WhatsApp message after wizard or calendar selection.
 */
export function buildContextualWhatsAppMessage(details: {
  eventType?: string;
  date?: string;
  location?: string;
  guestCount?: string;
  savedInspirations?: string[];
}): string {
  const parts: string[] = ['Hi Ram, I am interested in discussing an event with SR Events.'];

  if (details.eventType) {
    parts.push(`Event Type: ${details.eventType}`);
  }
  if (details.date) {
    parts.push(`Date: ${details.date}`);
  }
  if (details.location) {
    parts.push(`Location: ${details.location}`);
  }
  if (details.guestCount) {
    parts.push(`Guest Count: ${details.guestCount}`);
  }
  if (details.savedInspirations && details.savedInspirations.length > 0) {
    parts.push(`Saved Inspiration Items: ${details.savedInspirations.join(', ')}`);
  }

  parts.push('I would like to discuss the availability and requirements.');
  return parts.join('\n');
}
