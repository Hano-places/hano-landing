import Link from "next/link";
import { AutoOpenApp, OpenInApp } from "@/components/place/open-in-app";
import type { SharePreview } from "@/lib/hano-share";
import styles from "./shared-item.module.css";

/**
 * Landing page behind a shared Hano link (a post, list, invite, profile…). With the app
 * installed, iOS/Android usually open the link straight in the app; this page tries the app
 * itself where they don't (Instagram, WhatsApp and other in-app browsers, Android), and
 * otherwise shows the preview with a way to open or get the app.
 */
export function SharedItemPage({ preview, path }: { preview: SharePreview | null; path: string }) {
  const target = path.replace(/^\//, "");
  return (
    <main className={styles.page}>
      {preview ? <AutoOpenApp path={target} /> : null}
      <header className={styles.top}>
        <Link href="/" className={styles.brand}>
          {/* eslint-disable-next-line @next/next/no-img-element -- tiny static logo */}
          <img src="/brand-logo/svg/logo.svg" alt="" width={28} height={28} />
          Hano
        </Link>
        <OpenInApp path={target} className={styles.topOpen}>
          Open app
        </OpenInApp>
      </header>

      {preview ? (
        <article className={styles.card}>
          {/* eslint-disable-next-line @next/next/no-img-element -- remote, already sized 1200×630 by the API */}
          <img className={styles.image} src={preview.image} alt="" width={1200} height={630} />
          <div className={styles.body}>
            <h1 className={styles.title}>{preview.title}</h1>
            {preview.description ? <p className={styles.description}>{preview.description}</p> : null}
            <div className={styles.actions}>
              <OpenInApp path={target} className={styles.primary}>
                Open in Hano
              </OpenInApp>
              <Link className={styles.secondary} href="/download">
                Get the app
              </Link>
            </div>
          </div>
        </article>
      ) : (
        // Deleted, private or mistyped: say so plainly and point somewhere useful.
        <article className={styles.card}>
          <div className={styles.missing}>
            {/* eslint-disable-next-line @next/next/no-img-element -- tiny static logo */}
            <img src="/brand-logo/svg/logo.svg" alt="" width={56} height={56} />
          </div>
          <div className={styles.body}>
            <h1 className={styles.title}>This link isn’t available</h1>
            <p className={styles.description}>It may have been removed or made private. There’s plenty more to discover on Hano.</p>
            <div className={styles.actions}>
              <Link className={styles.primary} href="/places">
                Explore places
              </Link>
              <OpenInApp path={target} className={styles.secondary}>
                Open Hano
              </OpenInApp>
            </div>
          </div>
        </article>
      )}

      <p className={styles.note}>Hano · places worth visiting in Rwanda</p>
    </main>
  );
}
