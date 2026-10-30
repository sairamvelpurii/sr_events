import { AvailabilityStatus } from '../types';

/**
 * Static Event Availability Service for SR Events.
 * 
 * Fully static & reliable: requires no external Google Sheets connection.
 * Dates can be marked as 'BOOKED' or 'AVAILABLE' right here in configuration.
 */

// Sample booked dates for upcoming seasons (YYYY-MM-DD)
// Can be customized or updated directly without needing external databases
const STATIC_BOOKED_DATES: Record<string, AvailabilityStatus> = {
  '2026-10-15': 'BOOKED',
  '2026-10-18': 'BOOKED',
  '2026-10-24': 'BOOKED',
  '2026-10-25': 'BOOKED',
  '2026-11-08': 'BOOKED',
  '2026-11-14': 'BOOKED',
  '2026-11-20': 'BOOKED',
  '2026-11-22': 'BOOKED',
  '2026-12-05': 'BOOKED',
  '2026-12-12': 'BOOKED',
  '2026-12-25': 'BOOKED',
  '2027-01-14': 'BOOKED',
  '2027-01-15': 'BOOKED',
  '2027-02-14': 'BOOKED',
  '2027-03-08': 'BOOKED',
  '2027-04-18': 'BOOKED',
  '2027-05-10': 'BOOKED',
};

export interface AvailabilityResult {
  records: Record<string, AvailabilityStatus>;
  isError: boolean;
  errorMessage?: string;
}

export const availabilityService = {
  /**
   * Returns current calendar availability records synchronously/reliably.
   */
  async getAvailability(_year: number, _month: number): Promise<AvailabilityResult> {
    return {
      records: { ...STATIC_BOOKED_DATES },
      isError: false,
    };
  },

  /**
   * Checks whether a specific date formatted as YYYY-MM-DD is booked in records.
   */
  getDateStatus(dateStr: string, records: Record<string, AvailabilityStatus>): AvailabilityStatus {
    return records[dateStr] === 'BOOKED' ? 'BOOKED' : 'AVAILABLE';
  },
};
