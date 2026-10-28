/* eslint-disable @next/next/no-img-element -- photos are remote (Hano's CDN), already sized */
import Link from "next/link";
import { SeoPageShell } from "@/components/seo/seo-page-shell";
import { money, openStatus, WEEK, type Place, type Promo, type Review } from "@/lib/hano-places";

import { AutoOpenApp, OpenInApp } from "./open-in-app";
import styles from "./place-page.module.css";

const DAY_LABEL: Record<string, string> = { monday: "Mon", tuesday: "Tue", wednesday: "Wed", thursday: "Thu", friday: "Fri", saturday: "Sat", sunday: "Sun" };
/** On the web a menu shows a taste; the whole menu (and planning an order) is in the app. */
const ITEMS_PER_SECTION = 4;

const until = (iso?: string) =>
  iso ? `Until ${new Date(iso).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "Africa/Kigali" })}` : "Running now";

const stars = (n: number) => "★★★★★".slice(0, Math.round(n)) + "☆☆☆☆☆".slice(0, 5 - Math.round(n));

/**
 * A place's page on the web: everything people need to decide to go (photos, offers, menu,
 * hours, how to get there, what others say), with a clear way into the app for the rest
 * (the full menu, checking in, saving, points).
 */
export function PlacePage({ place, promos, rating }: { place: Place; promos: Promo[]; rating: { average: number; count: number; reviews: Review[] } }) {
  const status = openStatus(place.hours);
  const sections = (place.menu?.sections ?? []).filter((s) => s.items.length);
  const menuCount = sections.reduce((n, s) => n + s.items.length, 0);
  const hiddenItems = sections.reduce((n, s) => n + Math.max(0, s.items.length - ITEMS_PER_SECTION), 0);
  const c = place.contacts ?? {};
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${place.location.latitude},${place.location.longitude}`;
  const [cover, ...more] = place.photos;
  // An offer without its own photo shows the dish it features.
  const itemPhoto = new Map(sections.flatMap((sec) => sec.items).filter((it) => it.photo).map((it) => [it.id, it.photo as string]));
  const offerPhoto = (p: Promo) => p.photo ?? p.itemIds?.map((id) => itemPhoto.get(id)).find(Boolean);
  const meta = [place.subcategory || place.category, place.neighborhood, place.priceLevel ? "$".repeat(place.priceLevel) : null].filter(Boolean).join(" · ");

  return (
    <SeoPageShell backHref="/places" backLabel="← Places on Hano" showFab={false}>
      <AutoOpenApp path={`p/${place.slug}`} />
      <article className={styles.page}>
        {/* Photos */}
        <div className={`${styles.gallery} ${more.length ? "" : styles.single} ${cover ? "" : styles.noPhotos}`}>
          {cover ? <img className={styles.cover} src={cover} alt={`${place.name}`} /> : <div className={`${styles.cover} ${styles.blank}`} />}
          {more.slice(0, 2).map((src, i) => (
            <img key={src} className={styles.thumb} src={src} alt={`${place.name} photo ${i + 2}`} />
          ))}
          {place.photos.length > 3 ? <span className={styles.morePhotos}>+{place.photos.length - 3} photos in the app</span> : null}
        </div>

        {/* Name and essentials */}
        <header className={styles.header}>
          <div className={styles.identity}>
            {place.logo ? <img className={styles.logo} src={place.logo} alt={`${place.name} logo`} /> : <div className={`${styles.logo} ${styles.logoBlank}`}>{place.name[0]}</div>}
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
                <span className={styles.star}>★</span> {rating.average.toFixed(1)} · {rating.count} {rating.count === 1 ? "rating" : "ratings"}
              </span>
            ) : null}
            {promos.length ? <span className={`${styles.chip} ${styles.offerChip}`}>{promos.length === 1 ? "1 offer running" : `${promos.length} offers running`}</span> : null}
          </div>
        </header>

        {/* The app, up front */}
        <section className={styles.appCard}>
          <div>
            <p className={styles.appTitle}>Get the full {place.name} experience in Hano</p>
            <p className={styles.appBody}>See the whole menu and plan your order within budget, check in to earn points, save it for later and get its offers first.</p>
          </div>
          <div className={styles.appActions}>
            <OpenInApp slug={place.slug} className={styles.primary}>
              Open in Hano
            </OpenInApp>
            <Link className={styles.secondary} href="/download">
              Get the app
            </Link>
          </div>
        </section>

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
            {sections.map((s) => (
              <div key={s.id} className={styles.menuSection}>
                <h3 className={styles.h3}>
                  {s.emoji ? <span aria-hidden>{s.emoji} </span> : null}
                  {s.name}
                </h3>
                <ul className={styles.items}>
                  {s.items.slice(0, ITEMS_PER_SECTION).map((it) => (
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
            ))}
            {hiddenItems ? (
              <OpenInApp slug={place.slug} className={styles.inlineCta}>
                See all {menuCount} items and plan your order in Hano →
              </OpenInApp>
            ) : null}
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
                  <p className={styles.reviewStars} aria-label={`${r.stars} out of 5`}>
                    {stars(r.stars)}
                  </p>
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

        {/* Closing nudge */}
        <section className={styles.finalCta}>
          <p className={styles.finalTitle}>Going to {place.name}?</p>
          <p className={styles.appBody}>Check in with Hano when you get there: earn points, keep a map of everywhere you’ve been, and find your next favourite spot.</p>
          <div className={styles.appActions}>
            <OpenInApp slug={place.slug} className={styles.primary}>
              Open in Hano
            </OpenInApp>
            <Link className={styles.secondary} href="/download">
              Get the app
            </Link>
          </div>
        </section>
      </article>

      {/* Always-there way into the app on phones */}
      <div className={styles.stickyBar}>
        {place.logo ? <img className={styles.stickyLogo} src={place.logo} alt="" /> : null}
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
