import Image from "next/image";
import Link from "next/link";
import {
  PHONE,
  SCREEN,
  businessV2,
  finalV2,
  heroV2,
  webVsApp,
} from "@/content/landing-v2";
import { Container } from "@/components/ui/container";
import { SerifEmphasis } from "@/components/ui/serif-emphasis";
import { StoreButtons } from "@/components/ui/store-buttons";
import styles from "./home-v2.module.css";
import { Arrow } from "@/components/ui/arrow";

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
    <section className={styles.heroSplit} aria-labelledby="hero-heading">
      <div className={styles.heroCopyBox}>
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
      </div>
      <div className={styles.heroMediaBox}>
        <div className={styles.heroPhones}>
          <Phone src={SCREEN.profile} alt="A Hano profile with points and badges" className={styles.heroBack} sizes="(max-width: 720px) 45vw, 280px" />
          <Phone src={SCREEN.feed} alt="The Hano feed with friends’ check-ins" priority className={styles.heroFront} sizes="(max-width: 720px) 55vw, 320px" />
        </div>
      </div>
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
              Explore places <Arrow />
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

/** The homepage's boxed layout: sections sit as rounded boxes on a soft background. */
export function Boxes({ children }: { children: React.ReactNode }) {
  return <div className={styles.boxes}>{children}</div>;
}

/** A plain white rounded box for sections that bring their own content. */
export function Box({ children }: { children: React.ReactNode }) {
  return <div className={styles.boxPlain}>{children}</div>;
}
