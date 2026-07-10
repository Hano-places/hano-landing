# Place media ingest

## Setup

1. Enable **Places API (New)** in Google Cloud Console.
2. Create an API key and set it in `.env.local`:

```
GOOGLE_PLACES_API_KEY=your_key_here
```

3. Run:

```
npm run places:media
```

This downloads Google Place Photos + official website images into `public/places/{id}/` and regenerates `src/content/place-media.generated.ts`.

Without `GOOGLE_PLACES_API_KEY`, the script still scrapes official websites (and companion helpers can pull Wayback / Google Sites assets).

## Rebuild from disk only

If you already have files under `public/places/`:

```
npm run places:media:rebuild
```

## Notes

- Photos are stored locally (Google `photoUri` is short-lived — never hotlink in production).
- Lightbox shows author attributions when provided by Google.
- Curated menu highlights live in `src/content/place-menus.ts`.
- Places without websites rely on Google Places Photos or carefully matched public marketing images.
- Cost: Text + Details + Photo Media are billed per request; run on demand, not per page view.
