import { LeadSubmission, CallbackSubmission } from '../types';
import { BUSINESS_CONFIG } from '../config/business';

/**
 * Formats a full event enquiry into an elegant, readable WhatsApp message for Ram.
 */
export function formatLeadToWhatsAppMessage(lead: Partial<LeadSubmission>): string {
  const lines: string[] = [];

  lines.push(`*New Event Enquiry — SriRam Events*`);
  lines.push(`────────────────────────`);
  
  if (lead.name) {
    lines.push(`👤 *Name:* ${lead.name}`);
  }
  if (lead.phone) {
    lines.push(`📱 *WhatsApp:* ${lead.phone}`);
  }
  if (lead.email) {
    lines.push(`📧 *Email:* ${lead.email}`);
  }
  lines.push(`💬 *Shared via:* WhatsApp`);

  lines.push(``);
  if (lead.eventType) {
    lines.push(`🎉 *Event Type:* ${lead.eventType}`);
  }

  // Date preference formatting
  if (lead.datePreferenceType === 'FIXED' && lead.eventDate) {
    lines.push(`📅 *Date:* ${lead.eventDate} (Fixed Date)`);
  } else if (lead.datePreferenceType === 'FLEXIBLE') {
    const month = lead.preferredMonth || 'Upcoming month';
    const pref = lead.datePreference ? ` (${lead.datePreference})` : '';
    lines.push(`📅 *Date Preference:* Flexible in ${month}${pref}`);
  } else {
    lines.push(`📅 *Date:* Not decided yet`);
  }

  if (lead.guestCount) {
    lines.push(`👥 *Guest Count:* ${lead.guestCount}`);
  }
  if (lead.location) {
    lines.push(`📍 *Location:* ${lead.location}`);
  }
  if (lead.venue) {
    lines.push(`🏛️ *Venue / Area:* ${lead.venue}`);
  }

  // Requirements list
  if (lead.requirements && lead.requirements.length > 0) {
    lines.push(``);
    lines.push(`✨ *Requirements:*`);
    lead.requirements.forEach((req) => {
      lines.push(`  • ${req}`);
    });
  }

  // Notes
  if (lead.message && lead.message.trim()) {
    lines.push(``);
    lines.push(`📝 *Notes / Special Requests:*`);
    lines.push(`"${lead.message.trim()}"`);
  }

  // Saved inspiration shortlist
  if (lead.savedIdeas && lead.savedIdeas.length > 0) {
    lines.push(``);
    lines.push(`💡 *Shortlisted Inspirations (${lead.savedIdeas.length} items):*`);
    lead.savedIdeas.forEach((item) => {
      lines.push(`  • ${item}`);
    });
  }

  lines.push(`────────────────────────`);
  lines.push(`_Sent directly from SriRam Events website_`);

  return lines.join('\n');
}

/**
 * Formats a quick callback request into a WhatsApp message for Ram.
 */
export function formatCallbackToWhatsAppMessage(callback: CallbackSubmission): string {
  const lines: string[] = [];

  lines.push(`*Callback Request — SriRam Events*`);
  lines.push(`────────────────────────`);
  lines.push(`👤 *Name:* ${callback.name}`);
  lines.push(`📞 *Phone:* ${callback.phone}`);
  lines.push(`💬 *Preferred Contact:* ${callback.contactPreference}`);

  if (callback.message && callback.message.trim()) {
    lines.push(``);
    lines.push(`📝 *Note:* "${callback.message.trim()}"`);
  }

  lines.push(`────────────────────────`);
  lines.push(`_Sent directly from SriRam Events website_`);

  return lines.join('\n');
}

/**
 * Builds the direct WhatsApp launch link.
 */
export function buildWhatsAppEnquiryUrl(message: string): string {
  return `${BUSINESS_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

export const leadService = {
  /**
   * Directly dispatches the full enquiry to Ram via WhatsApp.
   * Completely static: no Google Sheets or external backend dependencies.
   */
  async submitEnquiry(
    lead: Omit<LeadSubmission, 'timestamp' | 'status' | 'priority' | 'source' | 'medium' | 'campaign' | 'content'>
  ): Promise<{ success: boolean; whatsappUrl: string }> {
    const formattedMessage = formatLeadToWhatsAppMessage(lead);
    const whatsappUrl = buildWhatsAppEnquiryUrl(formattedMessage);

    // Open WhatsApp in a new tab/app immediately
    try {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.warn('Popup blocked; direct button available on success screen', e);
    }

    return {
      success: true,
      whatsappUrl,
    };
  },

  /**
   * Directly dispatches a Callback Request to Ram via WhatsApp.
   */
  async submitCallback(callback: CallbackSubmission): Promise<{ success: boolean; whatsappUrl: string }> {
    const formattedMessage = formatCallbackToWhatsAppMessage(callback);
    const whatsappUrl = buildWhatsAppEnquiryUrl(formattedMessage);

    try {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.warn('Popup blocked; direct button available on success screen', e);
    }

    return {
      success: true,
      whatsappUrl,
    };
  },
};
