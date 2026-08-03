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
 *
 * After editing, create a new deployment (or update the existing one) so production picks up changes.
 */

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function normalizeEmail(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

function ensureWaitlistSheet() {
  var sheet =
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

  return sheet;
}

function emailAlreadyExists(sheet, email) {
  var needle = normalizeEmail(email);
  if (!needle) return false;

  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;

  var values = sheet.getRange(2, 2, lastRow, 2).getValues();
  for (var i = 0; i < values.length; i += 1) {
    if (normalizeEmail(values[i][0]) === needle) {
      return true;
    }
  }
  return false;
}

function doPost(e) {
  try {
    var sheet = ensureWaitlistSheet();
    var data = JSON.parse((e.postData && e.postData.contents) || "{}");
    var email = data.email || "";

    if (emailAlreadyExists(sheet, email)) {
      return jsonResponse({ success: true, duplicate: true });
    }

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      email,
      data.audience || "",
      data.answers || "",
      data.skippedQuestions ? "yes" : "no",
      data.source || "",
      data.firstName || "",
      data.phone || "",
      data.favoriteRestaurant || "",
      data.favoriteCuisine || "",
    ]);

    return jsonResponse({ success: true, duplicate: false });
  } catch (error) {
    return jsonResponse({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

function doGet() {
  return ContentService.createTextOutput("Hano waitlist webhook is live.");
}
