/**
 * iOS universal links: lets hano.now links open straight in the Hano app.
 * Paths mirror the app's shareLinks and Expo Router routes. On a claimed place's own address
 * (orbitos.hano.now, served via the API server with ?scope=place) only the place's home page
 * opens the app; everything else stays on the web.
 * APPLE_TEAM_ID overrides the team (Apple Developer → Membership → Team ID); it's public.
 */
const TEAM = "JRY2D7Y76N";
const PATHS = ["/p/*", "/post/*", "/u/*", "/l/*", "/o/*", "/r/*"];

export function GET(request: Request) {
  const team = process.env.APPLE_TEAM_ID?.trim() || TEAM;
  const placeSite = new URL(request.url).searchParams.get("scope") === "place";
  const app = `${team}.rw.hano.app`;
  const body = {
    applinks: {
      details: [{ appIDs: [app], components: (placeSite ? ["/"] : PATHS).map((p) => ({ "/": p })) }],
    },
    webcredentials: { apps: [app] },
  };
  return Response.json(body, { headers: { "Cache-Control": "public, max-age=3600" } });
}
