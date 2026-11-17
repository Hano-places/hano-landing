/* eslint-disable @next/next/no-img-element -- photos are remote (Hano's CDN), already sized */
import Link from "next/link";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { MomentsStrip, PhotosButton } from "@/components/moments/moments";
import { googleCover, money, openStatus, WEEK, type Moment, type Place, type Promo, type Review } from "@/lib/hano-places";

import { OpenInApp } from "./open-in-app";
import styles from "./place-page.module.css";
import { Arrow } from "@/components/ui/arrow";
import { AppIcon, Stars } from "@/components/ui/app-icon";

const DAY_LABEL: Record<string, string> = { monday: "Mon", tuesday: "Tue", wednesday: "Wed", thursday: "Thu", friday: "Fri", saturday: "Sat", sunday: "Sun" };

const until = (iso?: string) =>
  iso ? `Until ${new Date(iso).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "Africa/Kigali" })}` : "Running now";


/**
 * A place's page on the web: everything people need to decide to go (photos, visitors' moments,
 * offers, the whole menu, hours, how to get there, what others say), all readable without the
 * app. The app is offered for what only it does (checking in, saving, liking, planning an order).
 */
const MENU_PREVIEW = 6;
const distance = (m: number) => (m < 950 ? `${Math.max(50, Math.round(m / 50) * 50)} m` : `${(m / 1000).toFixed(1)} km`);

export function PlacePage({
  place,
  promos,
  rating,
  moments,
  nearby = [],
}: {
  place: Place;
  promos: Promo[];
  rating: { average: number; count: number; reviews: Review[] };
  moments: Moment[];
  nearby?: { place: Place; meters: number }[];
}) {
  const hoursStatus = openStatus(place.hours);
  const status = place.closed ? { ...hoursStatus, open: false, label: "Permanently closed" } : hoursStatus;
  const sections = (place.menu?.sections ?? []).filter((s) => s.items.length);
  const menuCount = sections.reduce((n, s) => n + s.items.length, 0);
  // A long menu shows its first sections (about six dishes); the rest opens in place, still in the page for search engines.
  let shown = 0;
  const firstSections = menuCount > MENU_PREVIEW + 3 ? sections.filter((s) => (shown < MENU_PREVIEW ? ((shown += s.items.length), true) : false)) : sections;
  const restSections = sections.slice(firstSections.length);
  const c = place.contacts ?? {};
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${place.location.latitude},${place.location.longitude}`;
  // Places without photos of their own show Google's (credited below).
  const fromGoogle = googleCover(place);
  const [cover, ...more] = fromGoogle ? [fromGoogle] : place.photos;
  // Profile picture: the business's logo, otherwise its first photo.
  const picture = place.logo ?? cover;
  // Openly licensed photos on show (the first three) are credited under the gallery.
  const credits = (place.photoCredits ?? []).slice(0, 3).filter((c) => c !== null);
  // An offer without its own photo shows the dish it features.
  const itemPhoto = new Map(sections.flatMap((sec) => sec.items).filter((it) => it.photo).map((it) => [it.id, it.photo as string]));
  const offerPhoto = (p: Promo) => p.photo ?? p.itemIds?.map((id) => itemPhoto.get(id)).find(Boolean);
  const meta = [place.subcategory || place.category, place.neighborhood, place.priceLevel ? "$".repeat(place.priceLevel) : null].filter(Boolean).join(" · ");

  const menuSection = (s: (typeof sections)[number]) => (
    <div key={s.id} className={styles.menuSection}>
      <h3 className={styles.h3}>
        {s.emoji ? <span aria-hidden>{s.emoji} </span> : null}
        {s.name}
      </h3>
      <ul className={styles.items}>
        {s.items.map((it) => (
          <li key={it.id} className={`${styles.item} ${it.available ? "" : styles.unavailable}`}>
            <div className={styles.itemText}>
              <p className={styles.itemName}>{it.name}</p>
              {it.description ? <p className={styles.muted}>{it.description}</p> : null}
              <p className={styles.price}>
                {it.price ? `${it.priceFrom ? "From " : ""}${money(it.price)}` : ""}
                {it.available ? "" : " · Not available today"}
              </p>
            </div>
            {it.photo ? <img className={styles.itemPhoto} src={it.photo} alt="" /> : null}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <SeoPageShell backHref="/places" backLabel="← Places on Hano" showFab={false}>
      <article className={styles.page}>
        {/* Photos */}
        <div className={`${styles.gallery} ${more.length ? "" : styles.single} ${cover ? "" : styles.noPhotos}`}>
          {cover ? <img className={styles.cover} src={cover} alt={`${place.name}`} /> : <div className={`${styles.cover} ${styles.blank}`} />}
          {more.slice(0, 2).map((src, i) => (
            <img key={src} className={styles.thumb} src={src} alt={`${place.name} photo ${i + 2}`} />
          ))}
          {place.photos.length > 3 ? (
            <PhotosButton photos={place.photos} placeName={place.name} appPath={`p/${place.slug}`} className={styles.morePhotos}>
              See all {place.photos.length} photos
            </PhotosButton>
          ) : null}
        </div>
        {fromGoogle ? <p className={styles.credits}>Photo: Google</p> : null}
        {credits.length ? (
          <p className={styles.credits}>
            Photos:{" "}
            {credits.map((c, i) => (
              <span key={c.source}>
                {i ? ", " : ""}
                <a href={c.source} target="_blank" rel="noopener noreferrer">
                  {c.author}
                </a>{" "}
                ({c.license})
              </span>
            ))}{" "}
            via Wikimedia Commons
          </p>
        ) : null}

        {/* Name and essentials */}
        <header className={styles.header}>
          <div className={styles.identity}>
            {picture ? <img className={styles.logo} src={picture} alt={place.logo ? `${place.name} logo` : place.name} /> : <div className={`${styles.logo} ${styles.logoBlank}`}>{place.name[0]}</div>}
            <div>
              <h1 className={styles.name}>
                {place.name}
                {place.verified || place.claimStatus === "claimed" ? (
                  <span className={styles.verified} title="Verified business on Hano">
                    ✓
                  </span>
                ) : null}
              </h1>
              <p className={styles.meta}>{meta}</p>
            </div>
          </div>
          <div className={styles.chips}>
            {status.label ? <span className={`${styles.chip} ${status.open ? styles.open : status.open === false ? styles.closed : ""}`}>{status.label}</span> : null}
            {rating.count ? (
              <span className={styles.chip}>
                <AppIcon name="star" size={15} filled className={styles.star} /> {rating.average.toFixed(1)} · {rating.count} {rating.count === 1 ? "rating" : "ratings"}
              </span>
            ) : null}
            {promos.length ? <span className={`${styles.chip} ${styles.offerChip}`}>{promos.length === 1 ? "1 offer running" : `${promos.length} offers running`}</span> : null}
          </div>
        </header>

        {/* Visitors' moments */}
        <MomentsStrip moments={moments} placeName={place.name} appPath={`p/${place.slug}`} />

        {/* Offers */}
        {promos.length ? (
          <section className={styles.section}>
            <h2 className={styles.h2}>Offers right now</h2>
            <div className={styles.offers}>
              {promos.map((p) => (
                <div key={p.id} className={styles.offer}>
                  {offerPhoto(p) ? <img className={styles.offerPhoto} src={offerPhoto(p)} alt="" /> : null}
                  <div className={styles.offerBody}>
                    {p.offer ? <span className={styles.offerBadge}>{p.offer}</span> : null}
                    <p className={styles.offerTitle}>{p.title}</p>
                    {p.description ? <p className={styles.muted}>{p.description}</p> : null}
                    <p className={styles.small}>{until(p.endsAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Menu */}
        {sections.length ? (
          <section className={styles.section}>
            <h2 className={styles.h2}>
              Menu <span className={styles.count}>{menuCount} items</span>
            </h2>
            {firstSections.map(menuSection)}
            {restSections.length ? (
              <details className={styles.moreMenu}>
                <summary className={styles.moreMenuButton}>See the full menu ({menuCount} items)</summary>
                {restSections.map(menuSection)}
              </details>
            ) : null}
            <OpenInApp slug={place.slug} className={styles.inlineCta}>
              Plan your order within budget in Hano <Arrow />
            </OpenInApp>
          </section>
        ) : null}

        {/* About */}
        {place.description ? (
          <section className={styles.section}>
            <h2 className={styles.h2}>About</h2>
            <p className={styles.about}>{place.description}</p>
            {place.tags.length ? (
              <div className={styles.tags}>
                {place.tags.map((t) => (
                  <span key={t} className={styles.tag}>
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

        {/* Reviews */}
        {rating.reviews.length ? (
          <section className={styles.section}>
            <h2 className={styles.h2}>What people say</h2>
            <div className={styles.reviews}>
              {rating.reviews.map((r) => (
                <blockquote key={r.id} className={styles.review}>
                  <Stars value={r.stars} size={16} className={styles.reviewStars} />
                  <p>{r.text}</p>
                  <footer className={styles.small}>{r.author}</footer>
                </blockquote>
              ))}
            </div>
          </section>
        ) : null}

        {/* Visit */}
        <section className={`${styles.section} ${styles.visit}`}>
          <div>
            <h2 className={styles.h2}>Opening hours</h2>
            {place.hours ? (
              <table className={styles.hours}>
                <tbody>
                  {WEEK.map((d) => (
                    <tr key={d} className={d === status.today ? styles.today : ""}>
                      <th scope="row">{DAY_LABEL[d]}</th>
                      <td>{place.hours?.[d] || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className={styles.muted}>Hours aren’t listed yet.</p>
            )}
          </div>
          <div>
            <h2 className={styles.h2}>Find &amp; contact</h2>
            <p className={styles.about}>{place.address || `${place.neighborhood}, ${place.city}`}</p>
            <div className={styles.contactRow}>
              <a className={styles.contact} href={directions} target="_blank" rel="noopener noreferrer">
                Directions
              </a>
              {c.phone ? (
                <a className={styles.contact} href={`tel:${c.phone.replace(/\s/g, "")}`}>
                  Call
                </a>
              ) : null}
              {c.whatsapp ? (
                <a className={styles.contact} href={`https://wa.me/${c.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              ) : null}
              {c.instagram ? (
                <a className={styles.contact} href={`https://instagram.com/${c.instagram.replace(/^@/, "")}`} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              ) : null}
              {c.website ? (
                <a className={styles.contact} href={/^https?:/.test(c.website) ? c.website : `https://${c.website}`} target="_blank" rel="noopener noreferrer">
                  Website
                </a>
              ) : null}
              {c.email ? (
                <a className={styles.contact} href={`mailto:${c.email}`}>
                  Email
                </a>
              ) : null}
            </div>
          </div>
        </section>

        {/* Where to go next, without leaving the web */}
        {nearby.length ? (
          <section className={styles.section}>
            <h2 className={styles.h2}>Nearby</h2>
            <ul className={styles.nearby}>
              {nearby.map(({ place: p, meters }) => {
                const photo = p.photos[0] ?? googleCover(p);
                return (
                  <li key={p.id}>
                    <Link href={`/p/${p.slug}`} className={styles.nearbyCard}>
                      {photo ? <img className={styles.nearbyPhoto} src={photo} alt="" loading="lazy" /> : <span className={`${styles.nearbyPhoto} ${styles.blank}`} />}
                      <span className={styles.nearbyName}>{p.name}</span>
                      <span className={styles.nearbyMeta}>{[p.subcategory || p.category, distance(meters)].filter(Boolean).join(" · ")}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        {/* Closing nudge */}
        <section className={styles.finalCta}>
          <p className={styles.finalTitle}>Going to {place.name}?</p>
          <p className={styles.appBody}>Check in with Hano when you get there: earn points, keep a map of everywhere you’ve been, and find your next favourite spot.</p>
          <div className={styles.appActions}>
            <OpenInApp slug={place.slug} className={styles.primary}>
              Open in Hano
            </OpenInApp>
            <Link className={styles.secondary} href="/places">
              Explore more places
            </Link>
          </div>
        </section>
      </article>

      {/* Always-there way into the app on phones */}
      <div className={styles.stickyBar}>
        {picture ? <img className={styles.stickyLogo} src={picture} alt="" /> : null}
        <p className={styles.stickyText}>
          <strong>{place.name}</strong> on Hano
        </p>
        <OpenInApp slug={place.slug} className={styles.stickyButton}>
          Open app
        </OpenInApp>
      </div>
    </SeoPageShell>
  );
}
