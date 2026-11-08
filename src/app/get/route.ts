import { NextResponse, type NextRequest } from "next/server";
import { site } from "@/content/landing";

/** hano.now/get: one link for everyone. iPhone → App Store, Android → Google Play, anything else → /download. */
export function GET(req: NextRequest) {
  const ua = req.headers.get("user-agent") ?? "";
  const to = /iPhone|iPad|iPod/i.test(ua)
    ? site.appStoreUrl
    : /Android/i.test(ua)
      ? site.playStoreUrl
      : new URL("/download", req.url).toString();
  return NextResponse.redirect(to, 302);
}
