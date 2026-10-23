"use client";

/**
 * "Open in Hano": tries the app (hano://p/<slug>); if nothing opened it after a moment (the app
 * isn't installed), goes to the download page. Phones with Hano usually never see this page at
 * all: universal links / app links open the app straight from the shared link.
 */
export function OpenInApp({ slug, className, children }: { slug: string; className?: string; children: React.ReactNode }) {
  return (
    <a
      className={className}
      href={`hano://p/${slug}`}
      onClick={() => {
        const started = Date.now();
        const timer = setTimeout(() => {
          // Still here and visible: the app didn't take over.
          if (document.visibilityState === "visible" && Date.now() - started < 2500) window.location.href = "/download";
        }, 1400);
        document.addEventListener("visibilitychange", () => clearTimeout(timer), { once: true });
      }}>
      {children}
    </a>
  );
}
