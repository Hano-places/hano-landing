import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

/** Kinds of link the Hano app shares (mirrors the app's `shareLinks`). */
export type ShareKind = "place" | "post" | "user" | "map" | "list" | "invite" | "promo" | "review";

export type SharePreview = {
  title: string;
  description: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  url: string;
  path: string;
  /** A claimed place's own address (https://orbitos.hano.now): the canonical link. */
  site?: string;
};

const API = (process.env.HANO_API_URL ?? "https://api.hano.now").replace(/\/$/, "");

/**
 * Preview data for a shared link, from the Hano API. The API applies privacy
 * (private profiles, private or moderated posts and lists return 404), so a
 * missing preview just renders the generic Hano card.
 */
export async function getSharePreview(kind: ShareKind, id: string): Promise<SharePreview | null> {
  try {
    const res = await fetch(`${API}/v1/share/${kind}/${encodeURIComponent(id)}`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return (await res.json()) as SharePreview;
  } catch {
    return null;
  }
}

/** Open Graph / Twitter metadata so WhatsApp, X, Facebook, iMessage etc. show a rich preview with the photo. */
export function shareMetadata(preview: SharePreview | null, path: string): Metadata {
  if (!preview) {
    return buildPageMetadata({
      path,
      title: "Open in Hano",
      description: "Discover restaurants, cafés and places worth visiting in Rwanda on Hano.",
      noindex: true,
    });
  }
  const base = buildPageMetadata({ path: preview.path, title: preview.title, description: preview.description, ogImage: preview.image });
  // A claimed place's own address is its home on the web; shares of /p/<slug> point there too.
  if (preview.site) {
    base.alternates = { ...base.alternates, canonical: preview.site };
    base.openGraph = { ...base.openGraph, url: preview.site };
  }
  const image = { url: preview.image, width: preview.imageWidth, height: preview.imageHeight, alt: preview.title, type: "image/jpeg" };
  return {
    ...base,
    // Shared links are personal; don't let them crowd search results.
    robots: { index: false, follow: true },
    openGraph: { ...base.openGraph, images: [image] },
    twitter: { card: "summary_large_image", title: preview.title, description: preview.description, images: [preview.image] },
  };
}
