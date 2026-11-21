import Link from "next/link";
import type { ReactNode } from "react";
import { SitePage } from "@/components/layout/site-page";
import { Container } from "@/components/ui/container";
import styles from "./seo-page-shell.module.css";
import { Arrow } from "@/components/ui/arrow";

type SeoPageShellProps = {
  children: ReactNode;
  backHref?: string;
  backLabel?: string;
  /** The floating download button; pages with their own app bar (place pages) turn it off. */
  showFab?: boolean;
};

/** A content page in the homepage's frame: the boxed bar, then the page in one light rounded box. */
export function SeoPageShell({
  children,
  backHref = "/places",
  backLabel = "← Back to places",
  showFab = true,
}: SeoPageShellProps) {
  return (
    <SitePage showFab={showFab}>
      <div className={styles.box}>
        <Container className={styles.container}>
          <Link href={backHref} className={styles.backLink}>
            <Arrow dir="left" /> {backLabel.replace(/^←\s*/, "")}
          </Link>
          {children}
        </Container>
      </div>
    </SitePage>
  );
}
