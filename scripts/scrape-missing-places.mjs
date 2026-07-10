/**
 * One-off scrape for venues that lack Google Places coverage.
 * node scripts/scrape-missing-places.mjs
 */
import { createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";
import { join, extname, dirname } from "node:path";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";
import https from "node:https";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_PLACES = join(ROOT, "public", "places");

async function download(url, dest) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "image/*,*/*",
    },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
  return dest;
}

function fetchHtmlInsecure(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          rejectUnauthorized: false,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            Accept: "text/html",
          },
        },
        (res) => {
          let data = "";
          res.on("data", (c) => {
            data += c;
          });
          res.on("end", () =>
            resolve({ status: res.statusCode, html: data, finalUrl: url }),
          );
        },
      )
      .on("error", reject);
  });
}

async function fetchHtml(url, insecure = false) {
  if (insecure) return fetchHtmlInsecure(url);
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "text/html",
    },
    redirect: "follow",
  });
  return { status: res.status, html: await res.text(), finalUrl: res.url };
}

function extractImgs(html, base) {
  const urls = new Set();
  const re =
    /(?:src|content|data-src|href)=["']([^"']+\.(?:jpe?g|png|webp)[^"']*)["']/gi;
  let m;
  while ((m = re.exec(html))) {
    try {
      const raw = m[1].replaceAll("&amp;", "&");
      const u = new URL(raw, base).href;
      if (
        /logo|icon|sprite|avatar|emoji|1x1|pixel|favicon|badge|button/i.test(u)
      ) {
        continue;
      }
      urls.add(u);
    } catch {
      /* */
    }
  }
  const og =
    /property=["']og:image["'][^>]*content=["']([^"']+)["']/i.exec(html) ||
    /content=["']([^"']+)["'][^>]*property=["']og:image["']/i.exec(html);
  if (og) {
    try {
      urls.add(new URL(og[1].replaceAll("&amp;", "&"), base).href);
    } catch {
      /* */
    }
  }
  // wsimg bare paths without extension in query form
  const wsimg = /https?:\/\/img1\.wsimg\.com\/isteam\/ip\/[^"'\\\s]+/gi;
  while ((m = wsimg.exec(html))) {
    urls.add(m[0].replaceAll("&amp;", "&").split("/:/")[0]);
  }
  return [...urls].slice(0, 16);
}

const targets = [
  {
    id: "pan-afrikan",
    pages: [
      "https://panafrikancuisine.com/",
      "https://panafrikancuisine.com/about",
      "https://panafrikancuisine.com/four-seasons-menu",
    ],
  },
  {
    id: "habesha",
    pages: [
      "https://tourismregulation.rw/en/entity/profile/941/",
      "http://www.habeshaethiopian.com/",
    ],
  },
  {
    id: "meze-fresh",
    pages: [
      "https://livinginkigali.com/meze-fresh/",
      "https://www.happycow.net/reviews/meze-fresh-kigali-263391",
    ],
  },
  {
    id: "inzora",
    pages: [
      "https://livinginkigali.com/inzora-rooftop-cafe/",
      "https://www.happycow.net/reviews/inzora-rooftop-cafe-kigali-263390",
    ],
  },
  {
    id: "chess-cafe",
    pages: [
      "https://laptopfriendlycafe.com/cafes/kigali/chess-cafe-kigali",
      "https://www.happycow.net/reviews/chess-cafe-kigali-135756",
      "https://wanderlog.com/place/details/2902476/chess-cafe-kigali",
    ],
  },
  {
    id: "chomad",
    pages: [
      "https://www.kupi.com/en/explore/rwanda/kigali/chomad-bar-and-grill",
      "https://allrestaurants.eu/en/restaurants/fusion/en-rwanda/en-kigali-rwa/choma-d-bar-grill",
    ],
  },
  {
    id: "fayrouz",
    pages: ["https://fayrouz-africa.com/", "https://www.fayrouz-africa.com/"],
  },
  {
    id: "le-youkounkoun",
    pages: ["https://www.leyoukounkoun.rw/", "https://leyoukounkoun.rw/"],
  },
  {
    id: "poivre-noir",
    pages: [
      "https://poivrenoirbistro.com/",
      "https://www.poivrenoirbistro.com/",
    ],
    insecure: true,
  },
  {
    id: "lilly",
    pages: ["https://lilly-rwanda.com/", "https://lilly-rwanda.com/menu"],
  },
];

async function main() {
  for (const t of targets) {
    await mkdir(join(PUBLIC_PLACES, t.id), { recursive: true });
    const all = new Set();
    for (const page of t.pages) {
      try {
        const { status, html, finalUrl } = await fetchHtml(page, t.insecure);
        console.log(`${t.id} ${page} → ${status} (${html.length}b)`);
        if (status >= 400) continue;
        for (const u of extractImgs(html, finalUrl || page)) all.add(u);
      } catch (e) {
        console.warn(`${t.id} ${page}: ${e.message}`);
      }
    }
    console.log(`${t.id}: ${all.size} candidates`);
    let i = 0;
    for (const url of all) {
      if (i >= 8) break;
      i += 1;
      let ext = ".jpg";
      try {
        const pathExt = extname(new URL(url).pathname);
        if (/\.(jpe?g|png|webp)$/i.test(pathExt)) ext = pathExt.toLowerCase();
      } catch {
        /* */
      }
      const dest = join(PUBLIC_PLACES, t.id, `official-${i}${ext}`);
      try {
        await download(url, dest);
        console.log(`  ok ${dest}`);
      } catch (e) {
        console.warn(`  fail ${e.message.slice(0, 120)}`);
        i -= 1;
      }
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
