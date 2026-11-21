import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MainWrapper } from "@/components/layout/main-wrapper";
import { AppDownloadFab } from "@/components/layout/app-download-fab";
import { Boxes } from "@/components/v2/home-v2";

/**
 * Every page's frame, the same as the homepage: the rounded bar, the page's boxes on the
 * light grey canvas, and the boxed footer. Pages put their sections in as boxes.
 */
export function SitePage({ children, showFab = false }: { children: ReactNode; showFab?: boolean }) {
  return (
    <>
      <MainWrapper>
        <Boxes>
          <Header boxed />
          <main style={{ display: "contents" }}>{children}</main>
          <Footer boxed />
        </Boxes>
      </MainWrapper>
      {showFab ? <AppDownloadFab /> : null}
    </>
  );
}
