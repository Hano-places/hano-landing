/**
 * Fetch real place photos via Google Places API (New) + official website OG images.
 *
 * Usage:
 *   GOOGLE_PLACES_API_KEY=... node scripts/fetch-place-media.mjs
 *   npm run places:media
 *
 * Writes:
 *   public/places/{id}/gallery-*.jpg|png|webp
 *   public/places/{id}/official-*.jpg|png|webp
 *   src/content/place-media.generated.ts
 */

import { createWriteStream } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";
import { Readable } from "node:stream";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC_PLACES = join(ROOT, "public", "places");
const OUT_FILE = join(ROOT, "src", "content", "place-media.generated.ts");

const MAX_PHOTOS = 8;
const MAX_WIDTH = 1600;

/** Catalog mirrored from src/content/places.ts */
const PLACES = [
  { id: "boho", name: "Boho", location: "Kiyovu", website: "https://www.boho.rw/" },
  { id: "pili-pili", name: "Pili Pili", location: "Kibagabaga", website: "https://www.pilipilirwanda.rw/" },
  { id: "heaven", name: "Heaven Restaurant", location: "Kiyovu", website: "https://heavenrwanda.com/" },
  { id: "casa-verde", name: "Casa Verde", location: "Kiyovu", website: "https://casaverde.rw/" },
  { id: "question-coffee", name: "Question Coffee", location: "Gishushu", website: "https://www.questioncoffee.com/" },
  { id: "choose-kigali", name: "Choose Kigali", location: "Kiyovu", website: "https://www.choosekigali.com/" },
  { id: "peacock-cafe", name: "Peacock Cafe & Gardens", location: "Kiyovu", website: "https://peacockgarden.net/" },
  { id: "inzora", name: "Inzora Rooftop Café", location: "Nyarutarama" },
  { id: "nyurah", name: "Nyurah", location: "City Centre", website: "https://www.nyurah.com/" },
  { id: "lilly", name: "Lilly Fine Dining", location: "Kimihurura", website: "https://lilly-rwanda.com/" },
  { id: "le-youkounkoun", name: "Le Youkounkoun", location: "City Centre", website: "https://www.leyoukounkoun.rw/" },
  { id: "yt-burger", name: "Y&T Burger & Wine Bistro", location: "Gishushu", website: "https://www.ytburger.com/" },
  { id: "fayrouz", name: "Fayrouz", location: "Kigali", website: "https://fayrouz-africa.com/" },
  { id: "repub-lounge", name: "Repub Lounge", location: "Kimihurura", website: "https://republounge.com/" },
  { id: "poivre-noir", name: "Poivre Noir", location: "Kimihurura", website: "https://poivrenoirbistro.com/" },
  { id: "meze-fresh", name: "Meze Fresh", location: "Kacyiru", website: "https://mezefresh.com/" },
  { id: "brioche", name: "Brioche", location: "Kacyiru", website: "https://www.briocherwanda.com/" },
  { id: "pan-afrikan", name: "Kigali Pan-Afrikan Kitchen", location: "City Centre" },
  { id: "habesha", name: "Habesha Ethiopian Restaurant", location: "Kiyovu" },
  { id: "chomad", name: "Choma'd Bar & Grill", location: "Gishushu" },
  { id: "sole-luna", name: "Sole Luna", location: "Kiyovu", website: "https://www.soleluna.company/" },
  { id: "chess-cafe", name: "Chess Café", location: "City Centre" },
];

// Extra gallery pages to scrape beyond homepage
const EXTRA_PAGES = {
  "sole-luna": ["https://www.soleluna.company/pictures"],
};

function loadEnvFile() {
  try {
    // sync-ish via readFile in main
  } catch {
    /* ignore */
  }
}

async function loadDotEnv() {
  for (const name of [".env.local", ".env"]) {
    try {
      const raw = await readFile(join(ROOT, name), "utf8");
      for (const line of raw.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eq = trimmed.indexOf("=");
        if (eq === -1) continue;
        const key = trimmed.slice(0, eq).trim();
        let value = trimmed.slice(eq + 1).trim();
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = value;
      }
    } catch {
      /* missing file */
    }
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function downloadToFile(url, destPath) {
  const res = await fetch(url, {
    headers: { "User-Agent": "HanoPlaceMediaBot/1.0 (+https://hano.now)" },
    redirect: "follow",
  });
  if (!res.ok) {
    throw new Error(`Download failed ${res.status} for ${url}`);
  }
  await mkdir(dirname(destPath), { recursive: true });
  const type = res.headers.get("content-type") || "";
  let finalPath = destPath;
  if (!extname(destPath)) {
    if (type.includes("png")) finalPath = `${destPath}.png`;
    else if (type.includes("webp")) finalPath = `${destPath}.webp`;
    else finalPath = `${destPath}.jpg`;
  }
  await pipeline(Readable.fromWeb(res.body), createWriteStream(finalPath));
  return finalPath;
}

function publicPathFromDisk(diskPath) {
  const rel = diskPath.replace(/\\/g, "/").split("/public/")[1];
  return `/${rel}`;
}

async function placesTextSearch(apiKey, query) {
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask":
        "places.id,places.name,places.displayName,places.formattedAddress,places.location,places.photos,places.websiteUri,places.nationalPhoneNumber,places.googleMapsUri",
    },
    body: JSON.stringify({
      textQuery: query,
      locationBias: {
        circle: {
          center: { latitude: -1.9441, longitude: 30.0619 },
          radius: 25000,
        },
      },
      maxResultCount: 3,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Text Search ${res.status}: ${body}`);
  }

  const data = await res.json();
  return data.places ?? [];
}

async function placesDetails(apiKey, placeId) {
  const name = placeId.startsWith("places/") ? placeId : `places/${placeId}`;
  const res = await fetch(`https://places.googleapis.com/v1/${name}`, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask":
        "id,name,displayName,formattedAddress,location,photos,websiteUri,nationalPhoneNumber,googleMapsUri,regularOpeningHours",
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Place Details ${res.status}: ${body}`);
  }
  return res.json();
}

async function downloadPlacePhoto(apiKey, photoName, destBase) {
  const mediaName = photoName.endsWith("/media") ? photoName : `${photoName}/media`;
  const url = new URL(`https://places.googleapis.com/v1/${mediaName}`);
  url.searchParams.set("maxWidthPx", String(MAX_WIDTH));
  url.searchParams.set("skipHttpRedirect", "true");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`getMedia ${res.status}: ${body}`);
  }
  const data = await res.json();
  if (!data.photoUri) {
    throw new Error("getMedia missing photoUri");
  }
  return downloadToFile(data.photoUri, destBase);
}

function extractMetaImages(html, baseUrl) {
  const urls = new Set();
  const patterns = [
    /property=["']og:image["'][^>]*content=["']([^"']+)["']/gi,
    /content=["']([^"']+)["'][^>]*property=["']og:image["']/gi,
    /property=["']twitter:image["'][^>]*content=["']([^"']+)["']/gi,
    /rel=["']image_src["'][^>]*href=["']([^"']+)["']/gi,
    /<(?:img|source)[^>]+(?:src|data-src|data-lazy-src)=["']([^"']+)["']/gi,
    /background-image:\s*url\(["']?([^"')]+)["']?\)/gi,
  ];
  for (const re of patterns) {
    let match;
    while ((match = re.exec(html)) !== null) {
      const raw = match[1]
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
      if (!raw || raw.startsWith("data:")) continue;
      if (/\.svg(\?|$)/i.test(raw)) continue;
      if (/logo|icon|sprite|avatar|favicon|pixel|1x1|tracking/i.test(raw)) continue;
      try {
        const abs = new URL(raw, baseUrl).href;
        if (!/^https?:/i.test(abs)) continue;
        urls.add(abs);
      } catch {
        /* skip */
      }
    }
  }

  // YouTube embeds
  const youtube = [];
  const ytRe =
    /(?:youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{6,})/gi;
  let ytMatch;
  while ((ytMatch = ytRe.exec(html)) !== null) {
    youtube.push(ytMatch[1]);
  }

  return { images: [...urls].slice(0, 10), youtube: [...new Set(youtube)].slice(0, 3) };
}

async function scrapePageImages(place, pageUrl, startIndex = 0) {
  const gallery = [];
  const videos = [];
  try {
    const res = await fetch(pageUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html",
      },
      redirect: "follow",
    });
    if (!res.ok) {
      console.warn(`  page ${pageUrl} → ${res.status}`);
      return { gallery, videos, menuUrl: undefined };
    }
    const html = await res.text();
    const { images, youtube } = extractMetaImages(html, pageUrl);

    let i = startIndex;
    for (const imgUrl of images) {
      i += 1;
      try {
        const destBase = join(PUBLIC_PLACES, place.id, `official-${i}`);
        const disk = await downloadToFile(imgUrl, destBase);
        gallery.push({
          src: publicPathFromDisk(disk),
          alt: `${place.name} — official photo`,
          source: "official",
        });
        await sleep(200);
      } catch (err) {
        console.warn(`  official image failed: ${err.message}`);
      }
    }

    for (const id of youtube) {
      videos.push({
        type: "youtube",
        src: id,
        title: `${place.name} video`,
        source: "youtube",
      });
    }

    const menuCandidates = [
      ...html.matchAll(/href=["']([^"']*menu[^"']*)["']/gi),
    ].map((m) => m[1]);
    let resolvedMenu;
    for (const menuUrl of menuCandidates) {
      try {
        const href = new URL(menuUrl, pageUrl).href;
        if (/\.(css|js|json|map)(\?|$)/i.test(href)) continue;
        if (/wixui|parastorage|cdn\.|static\./i.test(href) && !/menu/i.test(new URL(href).pathname)) {
          continue;
        }
        if (!/menu/i.test(href)) continue;
        resolvedMenu = href;
        break;
      } catch {
        /* */
      }
    }

    return { gallery, videos, menuUrl: resolvedMenu };
  } catch (err) {
    console.warn(`  scrape failed (${pageUrl}): ${err.message}`);
    return { gallery, videos, menuUrl: undefined };
  }
}

async function scrapeOfficialSite(place) {
  if (!place.website && !EXTRA_PAGES[place.id]) {
    return { gallery: [], videos: [], menuUrl: undefined };
  }

  const pages = [
    ...(place.website ? [place.website] : []),
    ...(EXTRA_PAGES[place.id] || []),
  ];

  const gallery = [];
  const videos = [];
  let menuUrl;

  for (const pageUrl of pages) {
    const result = await scrapePageImages(place, pageUrl, gallery.length);
    for (const img of result.gallery) {
      if (!gallery.some((g) => g.src === img.src)) gallery.push(img);
    }
    for (const video of result.videos) {
      if (!videos.some((v) => v.src === video.src)) videos.push(video);
    }
    if (!menuUrl && result.menuUrl) menuUrl = result.menuUrl;
  }

  return { gallery, videos, menuUrl };
}

function serializeMedia(mediaById) {
  const entries = Object.entries(mediaById)
    .map(([id, bundle]) => {
      return `  ${JSON.stringify(id)}: ${JSON.stringify(bundle, null, 4).replace(/\n/g, "\n  ")},`;
    })
    .join("\n");

  return `/**
 * Generated by \`npm run places:media\`.
 * Do not edit by hand — re-run the script to refresh.
 */
import type {
  PlaceGalleryImage,
  PlaceMenuSection,
  PlaceVideo,
} from "./place-types";

export type PlaceMediaBundle = {
  image?: string;
  gallery?: readonly PlaceGalleryImage[];
  menu?: readonly PlaceMenuSection[];
  menuUrl?: string;
  videos?: readonly PlaceVideo[];
  googlePlaceId?: string;
  phone?: string;
  geo?: { lat: number; lng: number };
};

export const placeMediaById: Record<string, PlaceMediaBundle> = {
${entries}
};
`;
}

async function processPlace(apiKey, place) {
  console.log(`\n→ ${place.name} (${place.id})`);
  await mkdir(join(PUBLIC_PLACES, place.id), { recursive: true });

  const bundle = {
    gallery: [],
    videos: [],
  };

  if (apiKey) {
    try {
      const query = `${place.name} ${place.location} Kigali Rwanda`;
      const results = await placesTextSearch(apiKey, query);
      const match = results[0];
      if (!match) {
        console.warn("  no Google Places match");
      } else {
        const placeId = match.id || match.name?.replace(/^places\//, "");
        console.log(`  Google match: ${match.displayName?.text ?? placeId}`);
        const details = await placesDetails(apiKey, placeId);
        bundle.googlePlaceId = details.id || placeId;
        if (details.nationalPhoneNumber) bundle.phone = details.nationalPhoneNumber;
        if (details.location) {
          bundle.geo = {
            lat: details.location.latitude,
            lng: details.location.longitude,
          };
        }

        const photos = (details.photos || []).slice(0, MAX_PHOTOS);
        let n = 0;
        for (const photo of photos) {
          n += 1;
          try {
            const destBase = join(PUBLIC_PLACES, place.id, `gallery-${n}`);
            const disk = await downloadPlacePhoto(apiKey, photo.name, destBase);
            const attributions = (photo.authorAttributions || []).map((a) => ({
              displayName: a.displayName,
              uri: a.uri,
              photoUri: a.photoUri,
            }));
            bundle.gallery.push({
              src: publicPathFromDisk(disk),
              alt: `${place.name} photo ${n}`,
              source: "google",
              authorAttributions: attributions.length ? attributions : undefined,
              googleMapsUri: photo.googleMapsUri || details.googleMapsUri,
            });
            await sleep(250);
          } catch (err) {
            console.warn(`  photo ${n} failed: ${err.message}`);
          }
        }
      }
      await sleep(300);
    } catch (err) {
      console.warn(`  Google Places failed: ${err.message}`);
    }
  }

  const official = await scrapeOfficialSite(place);
  for (const img of official.gallery) {
    if (!bundle.gallery.some((g) => g.src === img.src)) {
      bundle.gallery.push(img);
    }
  }
  bundle.videos = official.videos;
  if (official.menuUrl) bundle.menuUrl = official.menuUrl;

  if (bundle.gallery.length > 0) {
    bundle.image = bundle.gallery[0].src;
  }

  console.log(
    `  saved ${bundle.gallery.length} images, ${bundle.videos.length} videos` +
      (bundle.menuUrl ? `, menuUrl` : ""),
  );

  return bundle;
}

async function main() {
  await loadDotEnv();
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  if (!apiKey) {
    console.warn(
      "⚠ GOOGLE_PLACES_API_KEY not set — continuing with official-site scrape only.\n" +
        "  Add the key to .env.local and re-run for Google Place Photos.",
    );
  } else {
    console.log("Using Google Places API (New) + official sites");
  }

  await mkdir(PUBLIC_PLACES, { recursive: true });
  const mediaById = {};

  for (const place of PLACES) {
    mediaById[place.id] = await processPlace(apiKey, place);
  }

  await writeFile(OUT_FILE, serializeMedia(mediaById), "utf8");
  console.log(`\nWrote ${OUT_FILE}`);
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
