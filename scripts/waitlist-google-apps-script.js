/**
 * Google Apps Script for Hano waitlist → Sheets.
 *
 * Setup:
 * 1. Create a Google Sheet with a tab named "Waitlist".
 * 2. Row 1 headers (optional but recommended):
 *    Timestamp | Email | Audience | Answers | Skipped | Source | First name | Phone | Favorite restaurant | Favorite cuisine
 * 3. Extensions → Apps Script → paste this file → Save.
 * 4. Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the web app URL into Vercel env: WAITLIST_GOOGLE_SCRIPT_URL
 */

function doPost(e) {
  try {
    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Waitlist") ||
      SpreadsheetApp.getActiveSpreadsheet().insertSheet("Waitlist");

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Email",
        "Audience",
        "Answers",
        "Skipped",
        "Source",
        "First name",
        "Phone",
        "Favorite restaurant",
        "Favorite cuisine",
      ]);
    }

    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.email || "",
      data.audience || "",
      data.answers || "",
      data.skippedQuestions ? "yes" : "no",
      data.source || "",
      data.firstName || "",
      data.phone || "",
      data.favoriteRestaurant || "",
      data.favoriteCuisine || "",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : String(error),
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    "Hano waitlist webhook is live.",
  );
}
