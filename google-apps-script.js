/**
 * ==============================================================================
 * GOOGLE APPS SCRIPT FOR SR EVENTS (Google Sheets CRM & Availability API)
 * ==============================================================================
 * 
 * INSTRUCTIONS TO DEPLOY:
 * 1. Open Google Sheets (create a new spreadsheet or open an existing one).
 * 2. Rename the active sheet tab to "Leads" or keep the first tab.
 * 3. Create a second sheet tab named "Availability" with columns:
 *    Date | Status | Notes
 *    (e.g., "2026-11-20" | "BOOKED" | "Wedding ceremony")
 * 4. In Google Sheets menu: Go to Extensions > Apps Script.
 * 5. Replace any existing code with this entire file.
 * 6. Click "Deploy" > "New deployment".
 * 7. Choose type: "Web app".
 * 8. Execute as: "Me".
 * 9. Who has access: "Anyone" (allows the website frontend to fetch availability & submit leads).
 * 10. Click "Deploy" and copy the Web App URL.
 * 11. Paste this URL into your website's .env file as:
 *     VITE_GOOGLE_SHEETS_ENDPOINT=https://script.google.com/macros/s/.../exec
 * ==============================================================================
 */

const HEADERS = [
  'Timestamp',
  'Name',
  'Phone',
  'Email',
  'Contact Preference',
  'Event Type',
  'Date Preference Type',
  'Event Date',
  'Preferred Month',
  'Date Preference',
  'Guest Count',
  'Location',
  'Venue',
  'Requirements',
  'Message',
  'Saved Ideas',
  'Source',
  'Medium',
  'Campaign',
  'Content',
  'Status',
  'Priority'
];

/**
 * Handle GET requests: Serves public availability status ONLY.
 * NEVER returns customer names, phone numbers, or private details.
 */
function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let availSheet = ss.getSheetByName('Availability');
    
    if (!availSheet) {
      // Create Availability sheet if it doesn't exist
      availSheet = ss.insertSheet('Availability');
      availSheet.appendRow(['Date', 'Status', 'Notes']);
      availSheet.getRange(1, 1, 1, 3).setFontWeight('bold');
    }

    const data = availSheet.getDataRange().getValues();
    const result = [];

    // Skip header row
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const rawDate = row[0];
      const status = row[1];

      if (rawDate && status) {
        let formattedDate = '';
        if (rawDate instanceof Date) {
          formattedDate = Utilities.formatDate(rawDate, Session.getScriptTimeZone(), 'yyyy-MM-dd');
        } else {
          formattedDate = String(rawDate).trim();
        }

        if (status.toString().toUpperCase() === 'BOOKED') {
          result.push({
            date: formattedDate,
            status: 'BOOKED'
          });
        }
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle POST requests: Appends new lead from Plan Your Event wizard or Callback form.
 */
function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let leadsSheet = ss.getSheetByName('Leads');

    if (!leadsSheet) {
      leadsSheet = ss.insertSheet('Leads');
      leadsSheet.appendRow(HEADERS);
      leadsSheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#F3EFE8');
    }

    // Ensure header row exists
    if (leadsSheet.getLastRow() === 0) {
      leadsSheet.appendRow(HEADERS);
      leadsSheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#F3EFE8');
    }

    const payload = JSON.parse(e.postData.contents);

    const timestamp = payload.timestamp || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
    const name = payload.name || '';
    const phone = payload.phone || '';
    const email = payload.email || '';
    const contactPreference = payload.contactPreference || 'WhatsApp';
    const eventType = payload.eventType || '';
    const datePreferenceType = payload.datePreferenceType || '';
    const eventDate = payload.eventDate || '';
    const preferredMonth = payload.preferredMonth || '';
    const datePreference = payload.datePreference || '';
    const guestCount = payload.guestCount || '';
    const location = payload.location || '';
    const venue = payload.venue || '';
    const requirements = Array.isArray(payload.requirements) ? payload.requirements.join(', ') : (payload.requirements || '');
    const message = payload.message || '';
    const savedIdeas = Array.isArray(payload.savedIdeas) ? payload.savedIdeas.join(', ') : (payload.savedIdeas || '');
    const source = payload.source || 'direct';
    const medium = payload.medium || '';
    const campaign = payload.campaign || '';
    const content = payload.content || '';
    const status = payload.status || 'New';
    const priority = payload.priority || 'Medium';

    const row = [
      timestamp,
      name,
      phone,
      email,
      contactPreference,
      eventType,
      datePreferenceType,
      eventDate,
      preferredMonth,
      datePreference,
      guestCount,
      location,
      venue,
      requirements,
      message,
      savedIdeas,
      source,
      medium,
      campaign,
      content,
      status,
      priority
    ];

    leadsSheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Lead recorded successfully' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
