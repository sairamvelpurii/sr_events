export type EventCategory =
  | 'Wedding'
  | 'Engagement'
  | 'Birthday'
  | 'Reception'
  | 'Corporate Event'
  | 'Private Event'
  | 'Other';

export type DatePreferenceType = 'FIXED' | 'FLEXIBLE' | 'NOT_DECIDED';

export type GuestCountRange =
  | 'Under 50'
  | '50–100'
  | '100–250'
  | '250–500'
  | '500–1,000'
  | '1,000–5,000'
  | '5,000–10,000+'
  | 'Not decided';

export type LocationOption = 'Addanki' | 'Nearby Area' | 'Other';

export type ContactPreference = 'WhatsApp' | 'Phone Call' | 'Either';

export type AvailabilityStatus = 'AVAILABLE' | 'BOOKED';

export interface AvailabilityRecord {
  date: string; // YYYY-MM-DD
  status: AvailabilityStatus;
}

export interface SavedInspirationItem {
  id: string;
  title: string;
  category: EventCategory;
  image: string;
  thumbnail: string;
}

export interface LeadSubmission {
  timestamp?: string;
  name: string;
  phone: string;
  email?: string;
  contactPreference: ContactPreference;
  eventType: EventCategory | 'Callback Request';
  datePreferenceType: DatePreferenceType;
  eventDate?: string;
  preferredMonth?: string;
  datePreference?: string;
  guestCount: GuestCountRange;
  location: string;
  venue?: string;
  requirements: string[];
  message?: string;
  savedIdeas?: string[];
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  status: 'New' | 'Contacted' | 'Follow-up' | 'Confirmed' | 'Completed' | 'Lost';
  priority: 'High' | 'Medium' | 'Low';
}

export interface CallbackSubmission {
  name: string;
  phone: string;
  contactPreference: ContactPreference;
  message?: string;
  source?: string;
}

export interface ReviewItem {
  id: string;
  quote: string;
  teluguQuote?: string;
  author: string;
  eventType: string;
  tag?: string;
  rating?: number;
  isPlaceholder?: boolean;
}
