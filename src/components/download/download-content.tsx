import Link from "next/link";
import { StoreButtons } from "@/components/ui/store-buttons";
import { site } from "@/content/landing";
import styles from "@/app/legal.module.css";

export function DownloadContent() {
  return (
    <article className={styles.article}>
      <h1>Download the Hano app</h1>
      <p>
        {site.name} is free on iPhone and Android. Find restaurants, cafés and places
        across Rwanda, check in, share moments and see where your friends go.
      </p>
      <div style={{ margin: "1.25rem 0 1.75rem" }}>
        <StoreButtons size="lg" />
      </div>
      <p>
        On a computer? <Link href="/places">Explore places</Link> or{" "}
        <Link href="/restaurants">browse restaurants</Link> on the web.
      </p>
    </article>
  );
}
