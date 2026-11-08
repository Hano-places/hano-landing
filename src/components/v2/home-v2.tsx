import Image from "next/image";
import Link from "next/link";
import {
  PHONE,
  SCREEN,
  businessV2,
  featuresV2,
  finalV2,
  heroV2,
  stripV2,
  webVsApp,
} from "@/content/landing-v2";
import { Container } from "@/components/ui/container";
import { SerifEmphasis } from "@/components/ui/serif-emphasis";
import { StoreButtons } from "@/components/ui/store-buttons";
import styles from "./home-v2.module.css";

function Phone({
  src,
  alt,
  priority,
  className,
  sizes = "(max-width: 720px) 60vw, 320px",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={PHONE.width}
      height={PHONE.height}
      priority={priority}
      sizes={sizes}
      className={`${styles.phone} ${className ?? ""}`}
    />
  );
}

function Check() {
  return (
    <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" className={styles.check}>
      <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.18" />
      <path d="M7 12.5l3.2 3.2L17 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeroV2() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <Container className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>{heroV2.eyebrow}</span>
          <h1 id="hero-heading" className={styles.heroTitle}>
            {heroV2.title.before} <SerifEmphasis>{heroV2.title.emphasis}</SerifEmphasis> {heroV2.title.after}
          </h1>
          <p className={styles.heroSub}>{heroV2.sub}</p>
          <StoreButtons size="lg" />
          <p className={styles.desktopHint}>{heroV2.desktopHint}</p>
          <p className={styles.heroLinks}>
            <Link href="/places">Explore places</Link>
            <span aria-hidden> · </span>
            <Link href="/business">For businesses</Link>
          </p>
        </div>
        <div className={styles.heroPhones}>
          <Phone src={SCREEN.post} alt="A post on Hano: photos from Kurry Kingdom" className={styles.heroBack} sizes="(max-width: 720px) 45vw, 280px" />
          <Phone src={SCREEN.feed} alt="The Hano feed with friends’ check-ins" priority className={styles.heroFront} sizes="(max-width: 720px) 55vw, 320px" />
        </div>
      </Container>
    </section>
  );
}

export function StripV2() {
  return (
    <section className={styles.strip} aria-labelledby="strip-heading">
      <Container>
        <h2 id="strip-heading" className={styles.h2}>
          {stripV2.title}
        </h2>
        <p className={styles.lead}>{stripV2.sub}</p>
      </Container>
      <div className={styles.stripTrack} role="list">
        {SCREEN.slides.map((src, i) => (
          <div key={src} role="listitem" className={styles.stripItem}>
            <Phone src={src} alt={`Photo ${i + 1} of 7 from a review of Kurry Kingdom`} sizes="(max-width: 720px) 62vw, 260px" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function FeaturesV2() {
  return (
    <section className={styles.features} aria-label="What you can do with Hano">
      <Container>
        {featuresV2.map((f, i) => (
          <article key={f.id} id={f.id} className={`${styles.feature} ${i % 2 ? styles.featureFlip : ""}`}>
            <div className={styles.featureCopy}>
              <span className={styles.kicker}>{f.kicker}</span>
              <h2 className={styles.h2}>{f.title}</h2>
              <p className={styles.lead}>{f.body}</p>
              <ul className={styles.points}>
                {f.points.map((p) => (
                  <li key={p}>
                    <Check />
                    {p}
                  </li>
                ))}
              </ul>
              <span className={styles.appOnly}>In the app</span>
            </div>
            <div className={styles.featurePhones}>
              <Phone src={f.screens[0]} alt={`${f.title}: Hano app screen`} className={styles.featureFront} />
              <Phone src={f.screens[1]} alt="" className={styles.featureBack} sizes="(max-width: 720px) 45vw, 260px" />
            </div>
          </article>
        ))}
      </Container>
    </section>
  );
}

export function WebVsAppV2() {
  return (
    <section className={styles.compare} aria-labelledby="compare-heading">
      <Container>
        <h2 id="compare-heading" className={`${styles.h2} ${styles.center}`}>
          {webVsApp.title}
        </h2>
        <p className={`${styles.lead} ${styles.center}`}>{webVsApp.sub}</p>
        <div className={styles.compareGrid}>
          <div className={styles.compareCard}>
            <h3 className={styles.compareLabel}>{webVsApp.web.label}</h3>
            <ul className={styles.points}>
              {webVsApp.web.items.map((t) => (
                <li key={t}>
                  <Check />
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/places" className={styles.textLink}>
              Explore places <span aria-hidden>→</span>
            </Link>
          </div>
          <div className={`${styles.compareCard} ${styles.compareApp}`}>
            <h3 className={styles.compareLabel}>{webVsApp.app.label}</h3>
            <ul className={`${styles.points} ${styles.pointsTwo}`}>
              {webVsApp.app.items.map((t) => (
                <li key={t}>
                  <Check />
                  {t}
                </li>
              ))}
            </ul>
            <StoreButtons />
          </div>
        </div>
      </Container>
    </section>
  );
}

export function BusinessV2() {
  return (
    <section className={styles.business} aria-labelledby="business-heading">
      <Container className={styles.businessInner}>
        <div>
          <h2 id="business-heading" className={styles.h2}>
            {businessV2.title}
          </h2>
          <p className={styles.lead}>{businessV2.body}</p>
        </div>
        <Link href="/business" className={styles.darkBtn}>
          {businessV2.cta}
        </Link>
      </Container>
    </section>
  );
}

export function FinalV2() {
  return (
    <section className={styles.final} aria-labelledby="final-heading">
      <Container className={styles.finalGrid}>
        <div className={styles.finalCopy}>
          <h2 id="final-heading" className={styles.finalTitle}>
            {finalV2.title.before} <SerifEmphasis>{finalV2.title.emphasis}</SerifEmphasis>
            {finalV2.title.after}
          </h2>
          <p className={styles.heroSub}>{finalV2.sub}</p>
          <StoreButtons size="lg" />
          <p className={styles.desktopHint}>{heroV2.desktopHint}</p>
        </div>
        <div className={styles.finalPhone}>
          <Phone src={SCREEN.placeJp} alt="A place page in the Hano app" sizes="(max-width: 720px) 60vw, 300px" />
        </div>
      </Container>
    </section>
  );
}
