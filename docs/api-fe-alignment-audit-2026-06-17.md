# Hano FE vs API Alignment Audit (2026-06-17)

This document assesses how the current frontend (`hano-web`) aligns with the API contract described in `docs/api-documentation.md`.

**Last re-reviewed:** 2026-06-17 (post checkout-popover, auth-popover, and local search-suggestions work)

## Scope

- Frontend code reviewed: `hano-web/src`
- API contract reviewed: `docs/api-documentation.md`
- Requested focus: identify UI/logic that matches the API, what is missing, and what is likely to break due to API mismatch.

## Executive Summary

- **Auth + basic profile APIs are integrated** and mostly aligned.
- **Places/search/categories/reviews/photos/uploads clients exist**, but several response/path/type mismatches are present.
- **Core ordering/cart/menu/promotions flows in UI are still local/mock-driven** (`zustand` store + mock data), not connected to API endpoints documented for carts/orders/menu/promotions.
- **No `carts` or `orders` API client modules exist** in `hano-web/src/lib/api/` — only auth, users, places, search, categories, reviews, uploads, photos.
- **Business portal flows are mock-based** and not wired to documented business APIs.
- **Payment UI (MTN Momo, Airtel Momo, Card) has no corresponding API contract** — `POST /v1/orders/` does not accept payment method or phone/card fields.
- **Highest risk issues** remain incorrect API base URL default, upload endpoint/path/payload mismatches, and order/cart flows that cannot work against the backend without new integration.

## What Is Aligned

- **Auth endpoints implemented in FE client**
  - `signup`, `login`, `refresh`, `logout-devices` are wired in `hano-web/src/lib/api/auth.ts`.
  - Store integration exists in `hano-web/src/store/auth.ts`.
- **User profile API implemented**
  - `GET /v1/users/me`, `PATCH /v1/users/:id` in `hano-web/src/lib/api/users.ts`.
- **Public discovery clients exist (but unused by pages)**
  - `placesApi`, `searchApi`, `categoriesApi` under `hano-web/src/lib/api/`.
- **Review submission flow connected**
  - Review submit in `hano-web/src/components/places/place-review-popover.tsx` and `hano-web/src/app/places/[id]/review/page.tsx` calls `reviewsApi.createReview`.
- **Photo upload + registration flow partially connected**
  - `moments/capture` uses `uploadsApi.directUpload` then `photosApi.createPhoto`.

## Critical / High-Risk Mismatches

### 1) API base URL is not aligned with documentation

- **Doc says production base URL:** `https://hanoplaces.fly.dev`
- **FE default base URL:** `https://hano-api.onrender.com`
  - File: `hano-web/src/lib/api/types.ts`
- Risk: all API calls fail or hit wrong backend when env var is missing/misconfigured.

### 2) Upload endpoints and payload contract mismatch

- FE uses:
  - `POST /v1/uploads/uploads/presigned-url`
  - `POST /v1/uploads/uploads/direct`
  - File: `hano-web/src/lib/api/uploads.ts`
- Doc specifies:
  - `POST /v1/uploads/presigned-url`
  - `POST /v1/uploads/direct`
- FE `PresignedUrlRequest` omits documented required fields (`fileSize`) and response type expects `url` whereas doc returns `uploadUrl` + `publicUrl`.
  - File: `hano-web/src/lib/api/types.ts`

### 3) Unsupported upload type used by UI

- UI sends `uploadType = "moment"` in capture flow:
  - File: `hano-web/src/app/moments/capture/page.tsx`
- Doc allows only: `photo`, `banner`, `logo`, `document`.
- Risk: upload validation failures (`INVALID_INPUT` / `INVALID_FILE_TYPE`).

### 4) OAuth implementation mismatch

- FE calls `POST /v1/auth/oauth/:provider` with `{ idToken }` and supports `"google" | "apple"`.
  - File: `hano-web/src/lib/api/auth.ts`
- Doc defines browser redirect OAuth routes for Google/Instagram and does **not** define Apple idToken endpoint.
- UI social callback pages are placeholders:
  - `hano-web/src/components/auth/social-auth-buttons.tsx`
  - `hano-web/src/app/(auth)/auth/callback/[provider]/page.tsx`

### 5) Order/cart API not integrated — enum and field mismatches will break on wiring

When cart/order APIs are eventually connected, the current FE order model does not match the documented contract:

| Area | Frontend (current) | API (documented) | Risk |
|------|-------------------|------------------|------|
| Pre-order type | `"pre-order"` (hyphen) | `"pre_order"` (underscore) | `POST /v1/orders/` validation failure |
| Fulfillment | Not modeled | Required `fulfillmentType`: `pickup`, `dine_in`, `pre_order` | Missing required field |
| Order creation | `placeOrder()` in local Zustand | `POST /v1/orders/` with `cartId` | No server cart ID |
| Pre-order slots | Client-side `order-rules.ts` | `GET /v1/orders/time-slots/:placeId` | Slots may not match backend availability |
| Reorder | Local `reorder()` copies store items | `POST /v1/orders/:id/reorder` | No server cart returned |

Files: `hano-web/src/store/cart.ts`, `hano-web/src/lib/order-rules.ts`, `hano-web/src/components/layout/order-popover.tsx`

### 6) Payment step has no API backing

- FE checkout collects **MTN Momo**, **Airtel Momo**, or **Card** with client-side validation (`hano-web/src/lib/payment-input.ts`).
- Payment methods are defined in local mock data (`PAYMENT_METHODS` in `hano-web/src/lib/data/mock-data.ts`) with static logo assets under `public/payment-logos/`.
- **API documentation has no payment, MoMo, or card processing endpoints.** `POST /v1/orders/` body is limited to `cartId`, `type`, `fulfillmentType`, `scheduledTime`, `notes`.
- Impact: payment UI is presentation-only; integrating orders will require either a new payments API or removal/re-scope of the payment step.

## Medium-Risk Contract Drift (Type/shape mismatches)

### Search typing does not match documented shape

- FE `SearchResult.places` is typed as `Place[]` (basic place shape).
- Doc includes richer search place payload (`category`, `reviewStats`, `activePromotions`).
- File: `hano-web/src/lib/api/types.ts`

### Suggestions typing and implementation mismatch

- **API client** (`SuggestionsResponse`) expects `suggestions: string[]`.
- **Doc** defines `suggestions` as objects: `{ type, id, name, description }` with types `place` | `category`.
- **UI** (`hano-web/src/lib/search-suggestions.ts`, `components/search/search-with-suggestions.tsx`) implements **fully local** suggestions over static places + mock dishes (`type: "place" | "dish"`), and does **not** call `GET /v1/search/search/suggestions`.
- Risk: triple mismatch — wrong TS types, wrong UI data model, endpoint unused.

### Photos response typing mismatch

- FE expects `PhotosResponse = { photos: Photo[] ... }`.
- Doc structure appears generic paginated style (`data`, `total`, `hasMore`) for many resources.
- Files: `hano-web/src/lib/api/types.ts`, `hano-web/src/lib/api/photos.ts`

### Reviews read path unused

- `reviewsApi.getReviews` / place review listing endpoints are defined but not used for display.
- Place pages show reviews from static `content/places.ts` seed data only.

## Major Feature Gaps: UI logic not wired to documented APIs

### 1) Cart and order flows are local-only

- UI uses local `zustand` store (`useCartStore`) for:
  - cart operations, totals, draft carts, order history, reorder
  - files: `hano-web/src/store/cart.ts`, checkout pages, `order-popover.tsx`
- Documented API endpoints for carts/orders (`/v1/carts/*`, `/v1/orders/*`) are not used.
- **No `carts.ts` or `orders.ts` API client files exist.**
- Impact:
  - No server persistence
  - No real order lifecycle/status sync (`pending → confirmed → preparing → ready → completed`)
  - Potential divergence from backend business rules

### 2) Place/menu/promotions discovery is mock-driven

- Place detail and menu pages rely on `places-data` and `mock-data`:
  - `hano-web/src/app/(public)/places/[id]/page.tsx`
  - `hano-web/src/app/(public)/places/[id]/menu/page.tsx`
- `placesApi.getPlaces()` / `placesApi.getPlaceById()` are never called from pages.
- Promotions UI is not using documented `/v1/promotions/*` consumer/business endpoints; promos come from `HOT_PROMOS` mock filtered by place name.

### 3) Business portal is mock-only

- `businessApi` hardcoded `USE_MOCK = true` and throws if disabled.
  - File: `hano-web/src/lib/business/api-adapter.ts`
- Documented business-relevant APIs (menu management, promotions, claims, place-admins, roles) are not integrated.

### 4) Checkout flow is UI-only for payment + order placement

- Primary UX is now the **popover checkout flow** in `order-popover.tsx`:
  - Order preview → order type (direct / pre-order) → pickup time → payment → success
- Legacy `/checkout/*` page routes still exist and call the same local `placeOrder()`.
- Payment explicitly states UI-only processing in `checkout/payment/page.tsx` and order popover payment panel.
- Uses local `placeOrder` in store rather than `POST /v1/orders/`.
- Pre-order slot API (`GET /v1/orders/time-slots/:placeId`) not integrated.

### 5) Auth gate is local; login prompt is not an API call

- `AuthGateProvider` / `useRequireAuth` in `hano-web/src/hooks/use-require-auth.tsx` blocks actions and opens `LoginModal`.
- Login modal (`hano-web/src/components/auth/login-modal.tsx`) links to `/login` and `/register` — no inline auth API in the modal.
- Some actions (`view_orders`, `view_profile`) redirect to login page instead of modal.
- This is product-consistent but means gated flows depend on client-side auth state, not server session validation at action time.

## FE Changes Since Initial Audit (product layer, not API)

These UI improvements do **not** change API alignment but affect where integration work must land:

| Change | Files | API impact |
|--------|-------|------------|
| Full checkout in floating popover | `order-popover.tsx` | Still local `placeOrder()` — integration point is popover payment/success steps |
| Auth required modal uses floating panel | `login-modal.tsx` | None — still redirects to auth pages |
| Header search suggestions (local) | `search-with-suggestions.tsx`, `search-suggestions.ts` | Should replace with `searchApi.getSuggestions()` |
| Payment method UI (MTN/Airtel/Card) | `order-popover.tsx`, `payment-input.ts`, `mock-data.ts` | No API contract yet |
| Order sticky bar scoped to place page | `order-popover.tsx`, `places/[id]/page.tsx` | N/A until cart API is per-place |
| Collapsible draft card in orders popover | `order-popover.tsx` | N/A — local cart UI only |

## Infrastructure Observations

- `@tanstack/react-query` is configured in `app-providers.tsx` but **no `useQuery`/`useMutation` hooks** consume API clients.
- **No Next.js `app/api/` proxy routes** — browser calls API directly via `apiRequest`.
- `NEXT_PUBLIC_AUTH_BYPASS` dev mode bypasses real login (`lib/auth/bypass.ts`).
- React Query + API clients are ready structurally but pages bypass them for static/mock data.

## API Endpoints: Wired vs Defined-Only

### Actually called at runtime

| Endpoint | Method | Caller |
|----------|--------|--------|
| `/v1/auth/signup` | POST | `store/auth.ts` |
| `/v1/auth/login` | POST | `store/auth.ts` |
| `/v1/auth/refresh` | POST | `lib/api/client.ts` |
| `/v1/auth/logout-devices` | POST | `store/auth.ts` |
| `/v1/users/me` | GET | `store/auth.ts` |
| `/v1/users/:id` | PATCH | `store/auth.ts` |
| `/v1/reviews/reviews` | POST | `place-review-popover.tsx`, `places/[id]/review/page.tsx` |
| `/v1/uploads/uploads/direct` | POST | `moments/capture/page.tsx` |
| `/v1/photos/photos` | POST | `moments/capture/page.tsx` |

### Defined in `lib/api/` but never called from UI

| Client | Endpoints |
|--------|-----------|
| `placesApi` | `GET /v1/places/places`, `GET /v1/places/places/:id` |
| `searchApi` | `GET /v1/search/search`, `GET /v1/search/search/suggestions` |
| `categoriesApi` | `GET /v1/categories/categories`, `GET /v1/categories/categories/:id` |
| `reviewsApi` (read/update/delete) | `GET /v1/reviews/places/:placeId/reviews`, etc. |
| `photosApi` (read/delete) | `GET /v1/photos/photos`, etc. |
| `authApi.socialLogin` | `POST /v1/auth/oauth/:provider` |

### Documented in API but missing from FE clients entirely

| Endpoint family | Notes |
|-----------------|-------|
| `/v1/carts/*` | No client module |
| `/v1/orders/*` | No client module |
| `/v1/menu/*` | No client module (business menu management) |
| `/v1/promotions/*` | No client module |
| `/v1/claims/*` | No client module |
| `/v1/place-admins/*` | No client module |
| `/v1/roles/*` | No client module |
| Payment / MoMo / Card | Not documented in API |

## Prioritized Findings

### P0 (fix immediately)

1. Align `BASE_URL` default with documented production API (`https://hanoplaces.fly.dev`).
2. Fix upload route paths and request/response types to match docs.
3. Fix invalid `uploadType="moment"` to a supported type (likely `photo`) or update backend/docs.

### P1 (high value)

1. Add `carts.ts` and `orders.ts` API clients; replace local cart/order state with `/v1/carts` and `/v1/orders`.
2. Map FE order model to API: `pre_order`, `fulfillmentType`, `scheduledTime`, server `cartId`.
3. Wire `placesApi`, `searchApi`, `categoriesApi` into discovery pages; replace local search suggestions.
4. Align OAuth implementation with documented redirect flow endpoints.
5. Correct search/suggestions/photo TypeScript contracts to backend schema.
6. Decide payment strategy: add payments API or defer payment UI until backend exists.

### P2 (completeness)

1. Integrate promotions and menu/business endpoints.
2. Use `GET /v1/reviews/places/:placeId/reviews` for review display.
3. Use `GET /v1/orders/time-slots/:placeId` for pre-order picker.
4. Adopt React Query for server state (carts, orders, places, search).

## Conclusion

Frontend remains in a **hybrid state**: auth/profile, review writes, and moments upload are wired; discovery and commerce are still static/mock/local. Recent popover-based checkout and payment UI improve UX but **do not connect to the backend** — and the documented order API does not yet cover payment collection.

The largest integration gap is the **cart → order pipeline**: no API clients, no server cart IDs, enum/field mismatches on order creation, and a payment step with no API contract. Until that is addressed, UI behavior (drafts, reorder, order status, prep times, MoMo/Card checkout) will not reflect production API semantics.
