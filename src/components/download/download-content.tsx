import Image from "next/image";
import Link from "next/link";
import { StoreButtons } from "@/components/ui/store-buttons";
import { PHONE, SCREEN } from "@/content/landing-v2";
import styles from "./download-content.module.css";

const features = [
  {
    title: "See where friends go",
    body: "Real photos and honest reviews from people you follow.",
    screen: SCREEN.feed,
  },
  {
    title: "Plan the night together",
    body: "Pick dishes from the menu, set a budget, invite friends.",
    screen: SCREEN.plan,
  },
  {
    title: "Get rewarded for exploring",
    body: "Earn points for every visit and climb the weekly board.",
    screen: SCREEN.leaderboard,
  },
] as const;

const steps = [
  { title: "Tap your store", body: "App Store on iPhone, Google Play on Android." },
  { title: "Install it free", body: "No subscription, no card needed." },
  { title: "Sign in", body: "With email, Apple or Google, then follow your friends." },
] as const;

export function DownloadContent() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="download-heading">
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Free on iPhone &amp; Android</span>
          <h1 id="download-heading" className={styles.title}>
            Get Hano on your <em>phone</em>
          </h1>
          <p className={styles.sub}>
            Find restaurants, cafés and places across Rwanda. Check in, share moments and see where your friends go.
          </p>
          <StoreButtons size="lg" className={styles.stores} source="download_page" />
          <p className={styles.hint}>
            On a computer? Open <strong>hano.now/get</strong> on your phone and it takes you to the right store.
          </p>
        </div>
        <div className={styles.heroArt} aria-hidden>
          <Image src={SCREEN.plan} alt="" width={PHONE.width} height={PHONE.height} sizes="(max-width: 899px) 40vw, 240px" className={`${styles.phone} ${styles.phoneBack}`} />
          <Image src={SCREEN.feed} alt="" width={PHONE.width} height={PHONE.height} sizes="(max-width: 899px) 46vw, 280px" className={`${styles.phone} ${styles.phoneFront}`} priority />
        </div>
      </section>

      <section className={styles.features} aria-label="What you get">
        {features.map((f) => (
          <article key={f.title} data-reveal className={styles.feature}>
            <div className={styles.featureShot}>
              <Image src={f.screen} alt={`${f.title}: Hano app screen`} width={PHONE.width} height={PHONE.height} sizes="(max-width: 899px) 70vw, 260px" className={styles.featurePhone} />
            </div>
            <h2>{f.title}</h2>
            <p>{f.body}</p>
          </article>
        ))}
      </section>

      <section className={styles.how} aria-labelledby="how-heading">
        <div className={styles.howHead}>
          <Image src="/download.webp" alt="" width={560} height={560} sizes="5rem" className={styles.howIcon} />
          <h2 id="how-heading">Up and running in a minute</h2>
        </div>
        <ol className={styles.steps}>
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className={styles.num}>{i + 1}</span>
              <div>
                <strong>{s.title}</strong>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <StoreButtons className={styles.howStores} source="download_page_steps" />
      </section>

      <p className={styles.web}>
        Just looking? <Link href="/places">Explore places</Link> or <Link href="/restaurants">browse restaurants</Link> on the web.
      </p>
    </div>
  );
}
