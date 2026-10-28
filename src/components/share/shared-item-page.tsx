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
      <AutoOpenApp path={target} />
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

      <article className={styles.card}>
        {/* eslint-disable-next-line @next/next/no-img-element -- remote, already sized 1200×630 by the API */}
        <img className={styles.image} src={preview?.image ?? "/thumbnail/og.jpg"} alt="" width={1200} height={630} />
        <div className={styles.body}>
          <h1 className={styles.title}>{preview?.title ?? "Open this in Hano"}</h1>
          {preview?.description || !preview ? (
            <p className={styles.description}>
              {preview?.description ?? "This link isn’t available any more, or it’s private. Discover places worth visiting in Rwanda on Hano."}
            </p>
          ) : null}
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

      <p className={styles.note}>Hano · places worth visiting in Rwanda</p>
    </main>
  );
}
