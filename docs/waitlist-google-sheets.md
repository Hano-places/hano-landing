# Waitlist → Google Sheets

Waitlist signups from `/api/waitlist` are appended to a Google Sheet through a deployed Apps Script web app.

## 1. Create the sheet

1. Create a Google Sheet (e.g. **Hano Waitlist**).
2. Rename the first tab to `Waitlist` (or leave blank — the script creates it).

## 2. Deploy the Apps Script

1. In the sheet: **Extensions → Apps Script**.
2. Paste the contents of [`scripts/waitlist-google-apps-script.js`](../scripts/waitlist-google-apps-script.js).
3. Save the project.
4. **Deploy → New deployment → Web app**:
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Authorize when prompted, then copy the **Web app URL**.

## 3. Set the environment variable

Locally (`.env.local`):

```bash
WAITLIST_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/XXXX/exec
```

On Vercel: **Project → Settings → Environment Variables** → add `WAITLIST_GOOGLE_SCRIPT_URL` for Production (and Preview if you want).

Redeploy after saving the variable.

## 4. Verify

Submit the waitlist form on the site. A new row should appear in the `Waitlist` tab within a few seconds.

If `WAITLIST_GOOGLE_SCRIPT_URL` is missing, the API still returns success and logs the payload server-side so local/dev builds keep working.
