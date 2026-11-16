import { NextResponse, type NextRequest } from "next/server";
import { track } from "@vercel/analytics/server";
import { site } from "@/content/landing";
import { cleanCode, playUrl, REF_COOKIE } from "@/lib/referral";

/** hano.now/get: one link for everyone. iPhone → App Store, Android → Google Play, anything else → /download. */
export async function GET(req: NextRequest) {
  const ua = req.headers.get("user-agent") ?? "";
  const store = /iPhone|iPad|iPod/i.test(ua) ? "app_store" : /Android/i.test(ua) ? "google_play" : "web";
  // Someone who came through a creator's referral link keeps it on the way to Google Play.
  const code = cleanCode(req.cookies.get(REF_COOKIE)?.value);
  const to = store === "app_store" ? site.appStoreUrl : store === "google_play" ? playUrl(code) : new URL("/download", req.url).toString();
  // Counts hano.now/get visits (QR codes, bios, shared links) by where they went.
  await track("Get Link", { store, ref: req.nextUrl.searchParams.get("ref") ?? code ?? "direct" }, { headers: req.headers }).catch(() => undefined);
  return NextResponse.redirect(to, 302);
}
