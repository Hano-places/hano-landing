import Link from "next/link";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MainWrapper } from "@/components/layout/main-wrapper";
import { AppDownloadFab } from "@/components/layout/app-download-fab";
import { Container } from "@/components/ui/container";
import styles from "./seo-page-shell.module.css";

type SeoPageShellProps = {
  children: ReactNode;
  backHref?: string;
  backLabel?: string;
};

export function SeoPageShell({
  children,
  backHref = "/places",
  backLabel = "← Back to places",
}: SeoPageShellProps) {
  return (
    <>
      <Header />
      <MainWrapper>
        <Container className={styles.container}>
          <Link href={backHref} className={styles.backLink}>
            {backLabel}
          </Link>
          {children}
        </Container>
        <Footer />
      </MainWrapper>
      <AppDownloadFab />
    </>
  );
}
