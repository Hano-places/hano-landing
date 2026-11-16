"use client";

import { useEffect, useState } from "react";
import { GetAppSheet } from "@/components/moments/get-app-sheet";
import { appUrl, device } from "@/lib/app-link";

/**
 * "Open in Hano": tries the app; if nothing opened it after a moment (the app isn't installed),
 * offers the store buttons in a sheet over the page (people stay where they were). Phones with Hano usually never see these pages at all: universal
 * links / app links open the app straight from the shared link.
 */
export function OpenInApp({ slug, path, className, children }: { slug?: string; path?: string; className?: string; children: React.ReactNode }) {
  const target = path ?? `p/${slug}`;
  const [ask, setAsk] = useState(false);
  return (
    <>
    <a
      className={className}
      href={`hano://${target.replace(/^\//, "")}`}
      onClick={(e) => {
        e.preventDefault();
        const started = Date.now();
        const timer = setTimeout(() => {
          // Still here and visible: the app didn't take over.
          if (document.visibilityState === "visible" && Date.now() - started < 2500) setAsk(true);
        }, 1400);
        document.addEventListener("visibilitychange", () => clearTimeout(timer), { once: true });
        window.location.href = appUrl(target, navigator.userAgent, window.location.href);
      }}>
      {children}
    </a>
    <GetAppSheet open={ask} onClose={() => setAsk(false)} title="Get Hano" body="Hano isn’t on this phone yet. It’s free, and everything here is waiting in the app." source="open_in_app" />
    </>
  );
}

/**
 * Tries the app once as the page opens, where that can't go wrong: on Android (the intent link
 * comes back here if Hano isn't installed) and in Instagram, WhatsApp, TikTok… browsers on iPhone,
 * where links never open apps by themselves. Plain Safari is left alone: with Hano installed the
 * link would already have opened it, and trying anyway shows an "invalid address" alert.
 */
export function AutoOpenApp({ path }: { path: string }) {
  useEffect(() => {
    const ua = navigator.userAgent;
    const { android, ios, inApp } = device(ua);
    if (!android && !(ios && inApp)) return;
    const key = `hano-open:${path}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      return;
    }
    window.location.href = appUrl(path, ua, window.location.href);
  }, [path]);
  return null;
}
