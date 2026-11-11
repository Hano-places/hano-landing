"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  FloatingPanelContent,
  FloatingPanelRoot,
  useFloatingPanel,
} from "@/components/ui/floating-panel";
import { StoreButtons } from "@/components/ui/store-buttons";
import { track } from "@/lib/track";
import styles from "./download-modal.module.css";

const TITLE_ID = "download-modal-title";
const noop = () => () => {};

/**
 * A button that opens the "Get the app" panel (the same floating panel the waitlist used):
 * the download artwork, the App Store and Google Play buttons, and a link for computers.
 */
export function DownloadButton({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <FloatingPanelRoot className={styles.root}>
      <Trigger className={className}>{children}</Trigger>
      <Panel />
    </FloatingPanelRoot>
  );
}

function Trigger({ children, className }: { children: ReactNode; className?: string }) {
  const { openFloatingPanel, isOpen } = useFloatingPanel();
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <button
      ref={ref}
      type="button"
      className={className}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      onClick={() => {
        openFloatingPanel(ref.current?.getBoundingClientRect() ?? null, "Get the app", "centered");
        track("Download Modal Open", { page: window.location.pathname });
      }}
    >
      {children}
    </button>
  );
}

/** Rendered on <body>: inside the bar, its blur would trap a fixed panel. */
function Panel() {
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const { closeFloatingPanel } = useFloatingPanel();
  if (!mounted) return null;
  return createPortal(
    <FloatingPanelContent className={styles.modal} header={<></>} titleId={TITLE_ID}>
      <div className={styles.art}>
        <Image src="/download.webp" alt="" width={560} height={560} sizes="15rem" className={styles.artImage} priority />
        <button type="button" className={styles.close} onClick={closeFloatingPanel} aria-label="Close">
          <svg aria-hidden width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
      <div className={styles.copy}>
        <span className={styles.eyebrow}>Free on iPhone &amp; Android</span>
        <h2 id={TITLE_ID} className={styles.title}>
          Get Hano on your phone
        </h2>
        <p className={styles.sub}>Find places, check in, and plan nights out with friends.</p>
        <StoreButtons size="lg" className={styles.stores} source="download_modal" />
        <p className={styles.hint}>
          On a computer? Open <strong>hano.now/get</strong> on your phone.
        </p>
        <Link
          href="/download"
          className={styles.more}
          onClick={() => {
            track("Download Modal More", { page: window.location.pathname });
            closeFloatingPanel();
          }}
        >
          More about the app
        </Link>
      </div>
    </FloatingPanelContent>,
    document.body,
  );
}
