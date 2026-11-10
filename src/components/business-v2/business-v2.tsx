import Image from "next/image";
import Link from "next/link";
import {
  bizFaqs,
  bizFeatures,
  bizFinal,
  bizHero,
  bizInsights,
  bizOffers,
  bizPromise,
  bizSteps,
  bizValues,
} from "@/content/business-v2";
import { PHONE, SCREEN } from "@/content/landing-v2";
import { site } from "@/content/landing";
import { Accordion } from "@/components/ui/accordion";
import { SerifEmphasis } from "@/components/ui/serif-emphasis";
import { InsightsChart } from "./insights-chart";
import { StoreButtons } from "@/components/ui/store-buttons";
import styles from "./business-v2.module.css";

function Phone({ src, alt, className, priority }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={PHONE.width}
      height={PHONE.height}
      priority={priority}
      sizes="(max-width: 720px) 60vw, 300px"
      className={`${styles.phone} ${className ?? ""}`}
    />
  );
}

function Tick() {
  return (
    <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" className={styles.tick}>
      <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.18" />
      <path d="M7 12.5l3.2 3.2L17 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Hero: the promise on the left, a place page with its own address on the right. */
export function BizHero() {
  return (
    <section className={styles.heroSplit} aria-labelledby="biz-heading">
      <div className={styles.heroCopyBox}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>{bizHero.eyebrow}</span>
          <h1 id="biz-heading" className={styles.heroTitle}>
            {bizHero.title.before} <SerifEmphasis>{bizHero.title.emphasis}</SerifEmphasis>
            {bizHero.title.after}
          </h1>
          <p className={styles.heroSub}>{bizHero.sub}</p>
          <div className={styles.ctaRow}>
            <a href="#claim" className={styles.primaryBtn}>
              Claim your place <span aria-hidden>→</span>
            </a>
            <a href={`mailto:${site.email}?subject=Hano%20for%20my%20business`} className={styles.ghostBtn}>
              Talk to us
            </a>
          </div>
          <ul className={styles.trust}>
            {bizHero.trust.map((t) => (
              <li key={t}>
                <Tick />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.heroMediaBox}>
        <div className={styles.heroPhones}>
          <Phone src={SCREEN.placeJp} alt="A verified place page in the Hano app" className={styles.heroFront} priority />
          <Phone src={SCREEN.post} alt="" className={styles.heroBack} />
        </div>
        <div className={`${styles.chip} ${styles.chipTop}`}>
          <span className={styles.chipDot} />
          <span>
            <strong>Verified</strong> business page
          </span>
        </div>
        <div className={`${styles.chip} ${styles.chipBottom}`}>
          <span className={styles.chipIcon} aria-hidden>
            🔗
          </span>
          <span>{bizHero.address}</span>
        </div>
      </div>
    </section>
  );
}

/** Three reasons, in the order a guest decides: find, choose, come back. */
export function BizValues() {
  return (
    <section className={styles.box} aria-labelledby="biz-values">
      <h2 id="biz-values" className={`${styles.h2} ${styles.center}`}>
        Where Kigali decides where to go
      </h2>
      <p className={`${styles.lead} ${styles.center}`}>
        Hano is a guide made by the people who go out. When they look for somewhere to eat or drink, make sure your place is the one they pick.
      </p>
      <ol className={styles.values}>
        {bizValues.map((v, i) => (
          <li key={v.title} className={styles.valueCard}>
            <span className={styles.num}>{i + 1}</span>
            <h3>{v.title}</h3>
            <p>{v.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Each feature as its own split box, phone on alternating sides. */
export function BizFeatures() {
  return (
    <>
      {bizFeatures.map((f, i) => (
        <section key={f.title} className={`${styles.featureSplit} ${i % 2 ? styles.flip : ""}`} aria-label={f.kicker}>
          <div className={styles.featureCopyBox}>
            <span className={styles.kicker}>{f.kicker}</span>
            <h2 className={styles.h2}>{f.title}</h2>
            <p className={styles.lead}>{f.body}</p>
            <ul className={styles.points}>
              {f.points.map((p) => (
                <li key={p}>
                  <Tick />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.featureMediaBox}>
            <Phone src={f.screen} alt={`${f.title}: Hano app screen`} className={styles.featurePhone} />
          </div>
        </section>
      ))}
    </>
  );
}

/** Offers and insights side by side, as two boxes. */
export function BizGrowth() {
  return (
    <section className={styles.growth} aria-label="Offers and insights">
      <div className={`${styles.growthBox} ${styles.offersBox}`}>
        <span className={`${styles.kicker} ${styles.kickerDark}`}>{bizOffers.kicker}</span>
        <h2 className={styles.h2}>{bizOffers.title}</h2>
        <p className={styles.lead}>{bizOffers.body}</p>
        <div className={styles.offerChips}>
          {bizOffers.kinds.map((k) => (
            <span key={k}>{k}</span>
          ))}
        </div>
        <p className={styles.runsLabel}>Runs for</p>
        <div className={styles.lengths}>
          {bizOffers.lengths.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
        {/* An example of what people see on their lock screen when an offer goes live (not a real place). */}
        <div className={styles.lock} aria-label="Example notification">
          <p className={styles.lockTime}>9:41</p>
          <div className={styles.notice}>
            <span className={styles.noticeIcon}>%</span>
            <div>
              <p className={styles.noticeTitle}>Your place · Happy hour, 5–7pm</p>
              <p className={styles.noticeBody}>2-for-1 cocktails tonight only</p>
            </div>
            <span className={styles.noticeWhen}>now</span>
          </div>
          <div className={`${styles.notice} ${styles.noticeBack}`}>
            <span className={styles.noticeIcon}>★</span>
            <div>
              <p className={styles.noticeTitle}>A place you saved has a new dish</p>
              <p className={styles.noticeBody}>Tap to see it on the menu</p>
            </div>
            <span className={styles.noticeWhen}>2h</span>
          </div>
          <p className={styles.lockNote}>Sent to everyone who saved your place</p>
        </div>
      </div>
      <div className={`${styles.growthBox} ${styles.insightsBox}`}>
        <span className={styles.kicker}>{bizInsights.kicker}</span>
        <h2 className={styles.h2}>{bizInsights.title}</h2>
        <p className={styles.lead}>{bizInsights.body}</p>
        <InsightsChart />
        <p className={styles.small}>{bizInsights.share}</p>
      </div>
    </section>
  );
}

/** How to get started: three steps and the store buttons. */
export function BizSteps() {
  return (
    <section id="claim" className={styles.stepsBox} aria-labelledby="biz-steps">
      <div className={styles.stepsHead}>
        <h2 id="biz-steps" className={styles.h2}>
          Live on Hano in three steps
        </h2>
        <p className={styles.lead}>Everything happens in the app, from claiming your place to posting your first offer.</p>
        <StoreButtons size="lg" />
      </div>
      <ol className={styles.steps}>
        {bizSteps.map((s, i) => (
          <li key={s.title} className={styles.step}>
            <span className={styles.stepNum}>{i + 1}</span>
            <div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Why guests trust Hano, and so why a good place does well on it. */
export function BizPromise() {
  return (
    <section className={styles.promiseBox} aria-labelledby="biz-promise">
      <h2 id="biz-promise" className={`${styles.h2} ${styles.center} ${styles.onDark}`}>
        {bizPromise.title}
      </h2>
      <p className={`${styles.lead} ${styles.center} ${styles.onDarkSoft}`}>
        Guests trust Hano because it can’t be bought. That’s exactly why a good place wins here.
      </p>
      <div className={styles.promiseGrid}>
        {bizPromise.points.map((p) => (
          <div key={p.title} className={styles.promiseCard}>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function BizFaq() {
  return (
    <section className={styles.faqBox} aria-labelledby="biz-faq">
      <div>
        <h2 id="biz-faq" className={styles.h2}>
          Questions from owners
        </h2>
        <p className={styles.lead}>
          Anything else? Write to <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
      <Accordion items={[...bizFaqs]} />
    </section>
  );
}

export function BizFinal() {
  return (
    <section className={styles.finalBox} aria-labelledby="biz-final">
      <div className={styles.finalCopy}>
        <h2 id="biz-final" className={styles.finalTitle}>
          {bizFinal.title.before} <SerifEmphasis>{bizFinal.title.emphasis}</SerifEmphasis>
          {bizFinal.title.after}
        </h2>
        <p className={styles.finalSub}>{bizFinal.sub}</p>
        <StoreButtons size="lg" />
        <p className={styles.finalLinks}>
          <Link href="/places">See places already on Hano</Link>
          <span aria-hidden> · </span>
          <a href={`mailto:${site.email}?subject=Hano%20for%20my%20business`}>Talk to us</a>
        </p>
      </div>
      <div className={styles.finalPhone}>
        <Phone src={SCREEN.burgerPlanet} alt="A place page on Hano" />
      </div>
    </section>
  );
}
