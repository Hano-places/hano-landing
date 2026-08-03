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

export type WaitlistSheetResult = {
  ok: boolean;
  skipped?: boolean;
  duplicate?: boolean;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseSheetResponse(text: string): {
  success?: boolean;
  duplicate?: boolean;
  error?: string;
} | null {
  const trimmed = text.trim();
  if (!trimmed) return null;
  try {
    return JSON.parse(trimmed) as {
      success?: boolean;
      duplicate?: boolean;
      error?: string;
    };
  } catch {
    // After Apps Script redirects, some clients receive the doGet plaintext.
    if (trimmed.toLowerCase().includes("waitlist webhook is live")) {
      return { success: true };
    }
    return null;
  }
}

async function postToSheetOnce(
  url: string,
  payload: Record<string, unknown>,
): Promise<WaitlistSheetResult> {
  const response = await fetch(url, {
    method: "POST",
    // text/plain avoids Apps Script rejecting application/json requests.
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
    redirect: "follow",
  });

  const text = await response.text().catch(() => "");

  // Google sometimes returns Drive HTML error pages (404/502) instead of JSON.
  if (/<!DOCTYPE html>|<html[\s>]/i.test(text)) {
    throw new Error(
      `Google Sheets webhook returned HTML error (${response.status})`,
    );
  }

  const parsed = parseSheetResponse(text);

  if (parsed?.success === false) {
    throw new Error(parsed.error || "Sheets webhook returned success:false");
  }

  // 2xx/3xx, or a recognizable Apps Script success body, count as ok.
  if (
    response.ok ||
    response.status === 302 ||
    response.status === 303 ||
    parsed?.success === true
  ) {
    return {
      ok: true,
      duplicate: Boolean(parsed?.duplicate),
    };
  }

  throw new Error(
    `Google Sheets webhook failed (${response.status}): ${text.slice(0, 200)}`,
  );
}

/**
 * Appends a waitlist signup to Google Sheets via a deployed Apps Script web app.
 * Set WAITLIST_GOOGLE_SCRIPT_URL in the environment (see docs/waitlist-google-sheets.md).
 */
export async function appendWaitlistToSheet(
  data: WaitlistSheetRow,
): Promise<WaitlistSheetResult> {
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

  // Google Apps Script can intermittently return 502/HTML error pages.
  const attempts = 4;
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await postToSheetOnce(url, payload);
    } catch (error) {
      lastError = error;
      console.warn(
        `[waitlist] sheets attempt ${attempt}/${attempts} failed`,
        error,
      );
      if (attempt < attempts) {
        await sleep(400 * 2 ** (attempt - 1));
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Google Sheets webhook failed");
}
