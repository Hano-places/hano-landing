import { SeoPageShell } from "@/components/seo/seo-page-shell";
import type { SharePreview } from "@/lib/hano-share";
import styles from "./shared-item.module.css";

/**
 * Landing page behind a shared Hano link. With the app installed, iOS/Android
 * open the link straight in the app (universal links / app links); otherwise
 * this page shows the preview and offers to open or get the app.
 */
export function SharedItemPage({ preview, path }: { preview: SharePreview | null; path: string }) {
  const appLink = `hano://${path.replace(/^\//, "")}`;
  return (
    <SeoPageShell backHref="/" backLabel="← Hano">
      <article className={styles.card}>
        {/* eslint-disable-next-line @next/next/no-img-element -- remote, already sized 1200×630 by the API */}
        <img className={styles.image} src={preview?.image ?? "/thumbnail/og.jpg"} alt="" width={1200} height={630} />
        <div className={styles.body}>
          <h1 className={styles.title}>{preview?.title ?? "Open this in Hano"}</h1>
          <p className={styles.description}>
            {preview?.description ?? "This link isn’t available any more, or it’s private. Discover places worth visiting in Rwanda on Hano."}
          </p>
          <div className={styles.actions}>
            <a className={styles.primary} href={appLink}>
              Open in Hano
            </a>
            <a className={styles.secondary} href="/download">
              Get the app
            </a>
          </div>
        </div>
      </article>
    </SeoPageShell>
  );
}
