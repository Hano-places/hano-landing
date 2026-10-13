/**
 * iOS universal links: lets hano.now links open straight in the Hano app.
 * Set APPLE_TEAM_ID in Vercel (Apple Developer → Membership → Team ID).
 * Paths mirror the app's shareLinks and Expo Router routes.
 */
const PATHS = ["/p/*", "/post/*", "/u/*", "/l/*", "/o/*", "/r/*"];

export function GET() {
  const team = process.env.APPLE_TEAM_ID?.trim();
  if (!team) return new Response("Not configured", { status: 404 });
  const body = {
    applinks: {
      details: [{ appIDs: [`${team}.rw.hano.app`], components: PATHS.map((p) => ({ "/": p })) }],
    },
    webcredentials: { apps: [`${team}.rw.hano.app`] },
  };
  return Response.json(body, { headers: { "Cache-Control": "public, max-age=3600" } });
}
