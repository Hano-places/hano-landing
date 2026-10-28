/** Opening the Hano app from hano.now pages (the app answers `hano://<path>`). */

const PACKAGE = "rw.hano.app";

/** Apps whose built-in browsers never hand links to other apps (universal links don't fire there). */
const IN_APP_BROWSER = /Instagram|FBAN|FBAV|FB_IAB|FBIOS|Messenger|Line\/|Twitter|TikTok|musical_ly|BytedanceWebview|Snapchat|WhatsApp|LinkedInApp|GSA\//i;

export function device(ua: string) {
  return {
    android: /Android/i.test(ua),
    ios: /iPhone|iPad|iPod/i.test(ua),
    inApp: IN_APP_BROWSER.test(ua),
  };
}

/**
 * The address that opens `path` in the app. Android gets an intent link: Chrome opens the app if
 * it's installed and otherwise comes back to `fallback` (this page) instead of showing an error.
 */
export function appUrl(path: string, ua: string, fallback: string) {
  const clean = path.replace(/^\//, "");
  if (device(ua).android) {
    return `intent://${clean}#Intent;scheme=hano;package=${PACKAGE};S.browser_fallback_url=${encodeURIComponent(fallback)};end`;
  }
  return `hano://${clean}`;
}
