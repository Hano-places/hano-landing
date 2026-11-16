"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { StoreButtons } from "@/components/ui/store-buttons";
import styles from "./moments.module.css";

const noop = () => () => {};

/**
 * A gentle "this part is in the app" sheet: the store buttons and a way to keep browsing.
 * Never a wall; the page underneath stays where it was.
 */
export function GetAppSheet({ open, onClose, title, body, source }: { open: boolean; onClose: () => void; title: string; body?: string; source: string }) {
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open, onClose]);
  if (!mounted || !open) return null;
  return createPortal(
    <div className={styles.sheetBackdrop} onClick={onClose} role="presentation">
      <div className={styles.sheet} role="dialog" aria-modal="true" aria-labelledby="get-app-title" onClick={(e) => e.stopPropagation()}>
        <span className={styles.sheetGrip} aria-hidden />
        {/* eslint-disable-next-line @next/next/no-img-element -- tiny static logo */}
        <img src="/brand-logo/svg/logo.svg" alt="" width={44} height={44} className={styles.sheetLogo} />
        <p id="get-app-title" className={styles.sheetTitle}>
          {title}
        </p>
        {body ? <p className={styles.sheetBody}>{body}</p> : null}
        <StoreButtons className={styles.sheetStores} source={source} />
        <button type="button" className={styles.sheetLater} onClick={onClose}>
          Keep browsing
        </button>
      </div>
    </div>,
    document.body,
  );
}
