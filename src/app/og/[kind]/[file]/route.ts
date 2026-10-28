const API = (process.env.HANO_API_URL ?? "https://api.hano.now").replace(/\/$/, "");
const KINDS = new Set(["place", "post", "user", "map", "list", "invite", "plan", "promo", "review"]);

/**
 * A shared link's thumbnail (hano.now/og/<kind>/<id>.jpg), drawn by the Hano API and kept on
 * Vercel's edge: chat apps fetch it from nearby instead of from the API server each time.
 * The `?v=` the app adds changes with each card redesign, so a long cache is safe.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ kind: string; file: string }> }) {
  const { kind, file } = await params;
  const id = file.replace(/\.jpg$/, "");
  if (!KINDS.has(kind) || !id || id === file) return new Response("Not found", { status: 404 });
  const res = await fetch(`${API}/v1/share/${kind}/${encodeURIComponent(id)}/image.jpg`, { cache: "no-store" }).catch(() => null);
  if (!res?.ok) return new Response("Not found", { status: 404, headers: { "Cache-Control": "public, s-maxage=60" } });
  return new Response(await res.arrayBuffer(), {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
    },
  });
}
