import Link from "next/link";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MainWrapper } from "@/components/layout/main-wrapper";
import { AppDownloadFab } from "@/components/layout/app-download-fab";
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

export function SeoPageShell({
  children,
  backHref = "/places",
  backLabel = "← Back to places",
  showFab = true,
}: SeoPageShellProps) {
  return (
    <>
      <Header />
      <MainWrapper>
        <Container className={styles.container}>
          <Link href={backHref} className={styles.backLink}>
            <Arrow dir="left" /> {backLabel.replace(/^←\s*/, "")}
          </Link>
          {children}
        </Container>
        <Footer />
      </MainWrapper>
      {showFab ? <AppDownloadFab /> : null}
    </>
  );
}
