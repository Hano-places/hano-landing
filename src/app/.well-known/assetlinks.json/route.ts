/**
 * Android App Links: verifies hano.now (and, through the app's *.hano.now filter, every
 * claimed place's address) so links open straight in the Hano app.
 * Fingerprints are public. Built in: the EAS upload key. ANDROID_CERT_SHA256 (comma-separated)
 * adds more, above all the Play app signing key (Play Console → Test and release → App integrity),
 * which signs every copy installed from Google Play.
 */
const BUILT_IN = ["62:25:69:CA:35:80:B5:9B:44:67:38:08:D8:9A:02:14:E5:9F:B3:C7:2E:E6:E1:BB:D0:B6:77:4E:48:0F:53:F6"];

export function GET() {
  const extra = (process.env.ANDROID_CERT_SHA256 ?? "").split(",").map((s) => s.trim().toUpperCase()).filter(Boolean);
  const fingerprints = [...new Set([...BUILT_IN, ...extra])];
  const body = [
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: { namespace: "android_app", package_name: "rw.hano.app", sha256_cert_fingerprints: fingerprints },
    },
  ];
  return Response.json(body, { headers: { "Cache-Control": "public, max-age=3600" } });
}
