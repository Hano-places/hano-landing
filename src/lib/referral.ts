/**
 * Referral links (hano.now/i/<code>): the API counts the click and sends people on with `?ref=<code>`.
 * The code is remembered for 30 days so a later "Get it on Google Play" still carries it
 * (Google Play hands it to the app on first launch; on iPhone the API matches by network).
 */
import { site } from "@/content/landing";

export const REF_COOKIE = "hano_ref";
const CODE = /^[a-z0-9][a-z0-9-]{1,39}$/;
const DAYS = 30;

export const cleanCode = (v?: string | null) => {
  const c = v?.trim().toLowerCase();
  return c && CODE.test(c) ? c : undefined;
};

/** Google Play with the code as the install referrer. */
export const playUrl = (code?: string) => (code ? `${site.playStoreUrl}&referrer=${encodeURIComponent(`hano_ref=${code}`)}` : site.playStoreUrl);

/** In the browser: the code from this visit's `?ref=` (saved) or a recent one. */
export function currentRef(): string | undefined {
  try {
    const fromUrl = cleanCode(new URLSearchParams(window.location.search).get("ref"));
    if (fromUrl) {
      document.cookie = `${REF_COOKIE}=${fromUrl}; Max-Age=${DAYS * 86_400}; Path=/; SameSite=Lax; Secure`;
      return fromUrl;
    }
    return cleanCode(document.cookie.match(/(?:^|;\s*)hano_ref=([^;]+)/)?.[1]);
  } catch {
    return undefined;
  }
}
