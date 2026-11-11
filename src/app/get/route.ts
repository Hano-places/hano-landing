import { NextResponse, type NextRequest } from "next/server";
import { track } from "@vercel/analytics/server";
import { site } from "@/content/landing";

/** hano.now/get: one link for everyone. iPhone → App Store, Android → Google Play, anything else → /download. */
export async function GET(req: NextRequest) {
  const ua = req.headers.get("user-agent") ?? "";
  const store = /iPhone|iPad|iPod/i.test(ua) ? "app_store" : /Android/i.test(ua) ? "google_play" : "web";
  const to = store === "app_store" ? site.appStoreUrl : store === "google_play" ? site.playStoreUrl : new URL("/download", req.url).toString();
  // Counts hano.now/get visits (QR codes, bios, shared links) by where they went.
  await track("Get Link", { store, ref: req.nextUrl.searchParams.get("ref") ?? "direct" }, { headers: req.headers }).catch(() => undefined);
  return NextResponse.redirect(to, 302);
}
