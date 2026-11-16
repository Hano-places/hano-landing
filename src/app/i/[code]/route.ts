import { NextResponse, type NextRequest } from "next/server";

const API = (process.env.HANO_API_URL ?? "https://api.hano.now").replace(/\/$/, "");

/**
 * hano.now/i/<code>: a referral link for a creator or campaign (made in the staff portal). The API
 * counts the click and sends the person on (app store, or the page the team picked), so where a
 * link leads can change without the link changing.
 */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const clean = code.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 40);
  return NextResponse.redirect(`${API}/v1/i/${encodeURIComponent(clean || "x")}`, { status: 302, headers: { "Cache-Control": "no-store" } });
}
