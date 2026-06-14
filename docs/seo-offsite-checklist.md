# Hano Off-Site SEO Checklist

Use this checklist alongside the implemented on-site SEO (metadata, sitemaps, structured data, programmatic pages).

## Google Business Profile

- [ ] Create or claim Hano's Google Business Profile
- [ ] Set primary website to `https://hano.now`
- [ ] Use consistent business name: **Hano**
- [ ] Add business description focused on Kigali hospitality discovery
- [ ] Upload logo and product screenshots
- [ ] Add `hello@hano.rw` as contact email
- [ ] Post launch updates and link to key guides (`/guides/ultimate-kigali-food-guide`)

## Google Search Console

- [ ] Verify domain property for `hano.now`
- [ ] Submit sitemap: `https://hano.now/sitemap.xml`
- [ ] Monitor Coverage, Core Web Vitals, and branded queries weekly
- [ ] Inspect sample entity URLs (e.g. `/restaurants/boho-kigali`)

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

## Analytics

- [ ] Set `NEXT_PUBLIC_GA_ID` for GA4
- [ ] Set `NEXT_PUBLIC_GSC_VERIFICATION` for Search Console meta verification
- [ ] Set `NEXT_PUBLIC_CLARITY_ID` for Microsoft Clarity
- [ ] Track waitlist conversions as GA4 events

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
