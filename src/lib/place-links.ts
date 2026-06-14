const HANO_REFERRER = "hano.now";

export function withHanoReferral(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("ref", HANO_REFERRER);
    return parsed.toString();
  } catch {
    return url;
  }
}
