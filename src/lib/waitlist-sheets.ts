export type WaitlistSheetRow = {
  email: string;
  audience?: string;
  answers?: Record<string, string[]>;
  skippedQuestions?: boolean;
  source?: string;
  firstName?: string;
  phone?: string;
  favoriteRestaurant?: string;
  favoriteCuisine?: string;
};

/**
 * Appends a waitlist signup to Google Sheets via a deployed Apps Script web app.
 * Set WAITLIST_GOOGLE_SCRIPT_URL in the environment (see docs/waitlist-google-sheets.md).
 *
 * Apps Script quirks:
 * - Prefer text/plain (not application/json) so the request isn't rejected.
 * - The /exec URL 302-redirects; fetch must follow redirects.
 */
export async function appendWaitlistToSheet(
  data: WaitlistSheetRow,
): Promise<{ ok: boolean; skipped?: boolean }> {
  const url = process.env.WAITLIST_GOOGLE_SCRIPT_URL?.trim();

  if (!url) {
    console.warn(
      "[waitlist] WAITLIST_GOOGLE_SCRIPT_URL is not set; signup logged only.",
    );
    console.log("[waitlist]", data);
    return { ok: true, skipped: true };
  }

  const payload = {
    timestamp: new Date().toISOString(),
    email: data.email,
    audience: data.audience ?? "",
    answers: JSON.stringify(data.answers ?? {}),
    skippedQuestions: Boolean(data.skippedQuestions),
    source: data.source ?? "",
    firstName: data.firstName ?? "",
    phone: data.phone ?? "",
    favoriteRestaurant: data.favoriteRestaurant ?? "",
    favoriteCuisine: data.favoriteCuisine ?? "",
  };

  const response = await fetch(url, {
    method: "POST",
    // text/plain avoids Apps Script rejecting application/json requests.
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
    redirect: "follow",
  });

  // After the Apps Script 302, a successful write usually returns 200.
  // Some runtimes surface the intermediate redirect; treat those as success too.
  if (response.ok || response.status === 302 || response.status === 303) {
    return { ok: true };
  }

  const body = await response.text().catch(() => "");
  throw new Error(
    `Google Sheets webhook failed (${response.status}): ${body.slice(0, 200)}`,
  );
}
