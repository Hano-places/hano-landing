import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { PLACES_TAG } from "@/lib/places-data";

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Revalidation not configured" }, { status: 503 });
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { paths?: string[]; tags?: string[] } = {};
  try {
    body = (await request.json()) as { paths?: string[]; tags?: string[] };
  } catch {
    body = {};
  }

  revalidateTag(PLACES_TAG, "max");

  for (const tag of body.tags ?? []) {
    revalidateTag(tag, "max");
  }

  for (const path of body.paths ?? ["/places", "/sitemap.xml"]) {
    revalidatePath(path);
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
