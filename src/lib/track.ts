import { track as vercelTrack } from "@vercel/analytics";

type Props = Record<string, string | number | boolean | null>;

/**
 * One call for a custom event: Vercel Analytics (Events tab) and, when it's set up, Google Analytics.
 * Events worth counting: store button clicks, the download modal, the /get redirect (server side).
 */
export function track(event: string, props: Props = {}) {
  try {
    vercelTrack(event, props);
    const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
    gtag?.("event", event.toLowerCase().replace(/\s+/g, "_"), props);
  } catch {
    // Analytics never gets in the way of a click.
  }
}
