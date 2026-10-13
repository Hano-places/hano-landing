/**
 * Android App Links: verifies hano.now so links open straight in the Hano app.
 * Set ANDROID_CERT_SHA256 in Vercel to a comma-separated list of SHA-256
 * fingerprints: the Play app signing key (Play Console → App integrity) and the
 * EAS upload key (`eas credentials`).
 */
export function GET() {
  const fingerprints = (process.env.ANDROID_CERT_SHA256 ?? "")
    .split(",")
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean);
  if (!fingerprints.length) return new Response("Not configured", { status: 404 });
  const body = [
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: { namespace: "android_app", package_name: "rw.hano.app", sha256_cert_fingerprints: fingerprints },
    },
  ];
  return Response.json(body, { headers: { "Cache-Control": "public, max-age=3600" } });
}
