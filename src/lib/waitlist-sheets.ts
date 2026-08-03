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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    // Apps Script redirects; follow so we get the final response.
    redirect: "follow",
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `Google Sheets webhook failed (${response.status}): ${body.slice(0, 200)}`,
    );
  }

  return { ok: true };
}
