/**
 * Android App Links: verifies hano.now (and, through the app's *.hano.now filter, every
 * claimed place's address) so links open straight in the Hano app.
 * Fingerprints are public. Built in: the Play app signing key (signs every copy installed from
 * Google Play; Play Console → App signing) and the EAS upload key (builds installed directly).
 * ANDROID_CERT_SHA256 (comma-separated) can add more.
 */
const BUILT_IN = [
  "49:CF:58:E4:B8:7A:4A:D5:C8:A4:97:73:EC:F4:FF:9B:5D:22:D6:3E:93:51:86:34:17:D0:06:71:14:FE:23:05",
  "62:25:69:CA:35:80:B5:9B:44:67:38:08:D8:9A:02:14:E5:9F:B3:C7:2E:E6:E1:BB:D0:B6:77:4E:48:0F:53:F6",
];

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
