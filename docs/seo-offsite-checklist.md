# Hano Off-Site SEO Checklist

Use this checklist alongside the implemented on-site SEO (metadata, sitemaps, structured data, programmatic pages, sitelink pages).

## Google Business Profile

- [ ] Create or claim Hano's Google Business Profile
- [ ] Set primary website to `https://hano.now`
- [ ] Use consistent business name: **Hano**
- [ ] Add business description focused on Rwanda hospitality discovery (restaurants, cafés, places to visit)
- [ ] Upload logo and product screenshots
- [ ] Add `hello@hano.rw` as contact email
- [ ] Post launch updates and link to key pages (`/rwanda`, `/restaurants`, `/guides`)

## Google Search Console

- [ ] Verify domain property for `hano.now`
- [ ] Submit sitemap: `https://hano.now/sitemap.xml`
- [ ] Request indexing for sitelink candidates:
  - `/` (homepage)
  - `/rwanda`
  - `/restaurants`
  - `/places`
  - `/faq`
  - `/download`
  - `/business`
  - `/guides`
  - `/about`
  - `/rankings`
- [ ] Monitor Coverage, Core Web Vitals, and branded query **"Hano"** weekly for sitelinks
- [ ] Inspect sample entity URLs (e.g. `/restaurants/boho-kigali`)

## Bing Webmaster Tools

- [ ] Add `https://hano.now` in Bing Webmaster Tools
- [ ] Submit the same sitemap URL
- [ ] Import Search Console verification if available

## Citations and NAP consistency

Use the same details everywhere:

| Field | Value |
|-------|-------|
| Name | Hano |
| Website | https://hano.now |
| Email | hello@hano.rw |
| Location | Kigali, Rwanda |

Submit to:

- [ ] Rwanda tourism directories
- [ ] Startup and tech directories
- [ ] Hospitality and food blog resource pages
- [ ] Local business listings relevant to Kigali

## "Find us on Hano" badge (backlinks)

Share this snippet with restaurants to embed on their websites:

```html
<a href="https://hano.now/restaurants/YOUR-SLUG" rel="noopener noreferrer">
  Find us on Hano
</a>
```

Optional image badge (host on your CDN or use text link above):

```html
<a href="https://hano.now/restaurants/YOUR-SLUG" rel="noopener noreferrer">
  <img
    src="https://hano.now/brand-logo/small.png"
    alt="Find us on Hano"
    width="32"
    height="32"
  />
  Find us on Hano
</a>
```

Replace `YOUR-SLUG` with the business path (e.g. `boho-kigali`).

## Analytics

- [ ] Set `NEXT_PUBLIC_GA_ID` for GA4
- [ ] Set `NEXT_PUBLIC_GSC_VERIFICATION` for Search Console meta verification
- [ ] Set `NEXT_PUBLIC_CLARITY_ID` for Microsoft Clarity
- [ ] Track waitlist conversions and `/download` clicks as GA4 events

## Backend revalidation (future — API not live yet)

The site currently uses static place data from `src/content/places.ts`. No API env vars are required today.

When the backend is ready:

- [ ] Deploy the places API
- [ ] Set `HANO_API_ENABLED=true` and `HANO_API_URL` to your places API
- [ ] Wire `getPlaces()` in `src/lib/places-data.ts` to call the API
- [ ] Set `REVALIDATE_SECRET` for `/api/revalidate`
- [ ] POST to `/api/revalidate` on place create/update/delete with affected paths

## Content cadence

- [ ] Publish one new guide per month linking to entity pages
- [ ] Refresh titles/meta for pages with high impressions and low CTR
- [ ] Add real reviews, menus, and photos to backend as they become available
- [ ] Expand Musanze / Rubavu / Huye listings as data becomes available
