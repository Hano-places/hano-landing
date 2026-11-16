"use client";

/* eslint-disable @next/next/no-img-element -- photos are remote (Hano's CDN), already sized */
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { OpenInApp } from "@/components/place/open-in-app";
import { StoreButtons } from "@/components/ui/store-buttons";
import type { Moment } from "@/lib/hano-places";
import { track } from "@/lib/track";
import { GetAppSheet } from "./get-app-sheet";
import styles from "./moments.module.css";

/** After this many moments the viewer shows a card about the app (people can scroll straight past it). */
const APP_CARD_EVERY = 6;
const TILES = 12;

const ago = (iso?: string) => {
  if (!iso) return "";
  const s = (Date.now() - Date.parse(iso)) / 1000;
  if (s < 3600) return `${Math.max(1, Math.round(s / 60))}m`;
  if (s < 86_400) return `${Math.round(s / 3600)}h`;
  if (s < 7 * 86_400) return `${Math.round(s / 86_400)}d`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
};
const count = (n = 0) => (n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(n));

type Slide = { kind: "moment"; moment: Moment; index: number } | { kind: "app" } | { kind: "end" };

/**
 * Visitors' photos on a place page: a row of tiles that opens a full-screen, swipe-up viewer
 * (like TikTok or Reels). Everything can be seen on the web; liking and commenting point to the
 * app with a light sheet, never a wall.
 */
export function MomentsStrip({ moments, placeName, appPath, title = "Moments from visitors" }: { moments: Moment[]; placeName: string; appPath: string; title?: string }) {
  const [openAt, setOpenAt] = useState<number | null>(null);
  if (!moments.length) return null;
  const open = (i: number) => {
    setOpenAt(i);
    track("Moments Open", { place: appPath, at: i, total: moments.length });
  };
  return (
    <section className={styles.strip} aria-labelledby="moments-title">
      <div className={styles.stripHead}>
        <h2 id="moments-title" className={styles.stripTitle}>
          {title} <span className={styles.stripCount}>{moments.length}</span>
        </h2>
        {moments.length > 1 ? (
          <button type="button" className={styles.stripAll} onClick={() => open(0)}>
            Watch all
          </button>
        ) : null}
      </div>
      <div className={styles.tiles}>
        {moments.slice(0, TILES).map((m, i) => (
          <button key={m.id} type="button" className={styles.tile} onClick={() => open(i)} aria-label={`Open ${m.author?.name ?? "a visitor"}’s photo${m.caption ? `: ${m.caption}` : ""}`}>
            <img src={m.photos[0].src} alt="" loading={i < 4 ? "eager" : "lazy"} className={styles.tileImg} />
            {m.photos.length > 1 ? <span className={styles.tileMulti} aria-hidden>{m.photos.length}</span> : null}
            <span className={styles.tileFoot}>
              {m.author?.avatar ? <img src={m.author.avatar} alt="" className={styles.tileAvatar} /> : <span className={`${styles.tileAvatar} ${styles.avatarBlank}`}>{m.author?.name[0] ?? "H"}</span>}
              <span className={styles.tileName}>{m.author?.name.split(" ")[0] ?? "Visitor"}</span>
              <span className={styles.tileLikes}>♥ {count(m.likes)}</span>
            </span>
          </button>
        ))}
      </div>
      {openAt !== null ? <MomentsViewer moments={moments} start={openAt} placeName={placeName} appPath={appPath} onClose={() => setOpenAt(null)} /> : null}
    </section>
  );
}

/** The full-screen viewer. Swipe or scroll up/down, arrow keys, Esc or Back to close. */
export function MomentsViewer({ moments, start, placeName, appPath, onClose, asPage }: { moments: Moment[]; start: number; placeName: string; appPath: string; onClose?: () => void; asPage?: boolean }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [sheet, setSheet] = useState<{ title: string; body: string } | null>(null);
  const [toast, setToast] = useState("");
  const slides = useMemo<Slide[]>(() => {
    const out: Slide[] = [];
    moments.forEach((moment, index) => {
      out.push({ kind: "moment", moment, index });
      if ((index + 1) % APP_CARD_EVERY === 0 && index < moments.length - 1) out.push({ kind: "app" });
    });
    out.push({ kind: "end" });
    return out;
  }, [moments]);
  const startSlide = Math.max(0, slides.findIndex((s) => s.kind === "moment" && s.index === start));
  const [active, setActive] = useState(startSlide);

  // Back closes the viewer (it opened as a step in history).
  const close = useCallback(() => {
    if (asPage) return;
    if (window.history.state?.hanoMoments) window.history.back();
    else onClose?.();
  }, [asPage, onClose]);
  useEffect(() => {
    if (asPage) return;
    window.history.pushState({ ...window.history.state, hanoMoments: true }, "");
    const pop = () => onClose?.();
    window.addEventListener("popstate", pop);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("popstate", pop);
      document.body.style.overflow = overflow;
    };
  }, [asPage, onClose]);

  useLayoutEffect(() => {
    const el = scroller.current?.children[startSlide] as HTMLElement | undefined;
    if (el) scroller.current!.scrollTop = el.offsetTop;
  }, [startSlide]);

  // Which slide is on screen (for the counter and loading the next photos).
  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.slide));
      },
      { root, threshold: 0.6 },
    );
    for (const child of Array.from(root.children)) io.observe(child);
    return () => io.disconnect();
  }, [slides]);

  const go = useCallback((dir: 1 | -1) => {
    const root = scroller.current;
    const next = root?.children[Math.min(Math.max(active + dir, 0), slides.length - 1)] as HTMLElement | undefined;
    if (root && next) root.scrollTo({ top: next.offsetTop, behavior: "smooth" });
  }, [active, slides.length]);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (sheet) return;
      if (e.key === "Escape") return close();
      const dir = e.key === "ArrowDown" || e.key === "j" ? 1 : e.key === "ArrowUp" || e.key === "k" ? -1 : 0;
      if (!dir) return;
      e.preventDefault();
      go(dir);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [go, close, sheet]);

  useEffect(() => {
    if (slides[active]?.kind === "app") track("Moments App Card", { place: appPath });
  }, [active, slides, appPath]);

  const share = async (m: Moment) => {
    const url = `https://hano.now/post/${m.id}`;
    try {
      if (navigator.share) await navigator.share({ url, title: `${m.author?.name ?? "A moment"} at ${placeName}` });
      else {
        await navigator.clipboard.writeText(url);
        setToast("Link copied");
        setTimeout(() => setToast(""), 1600);
      }
      track("Moments Share", { post: m.id });
    } catch {
      // Cancelled.
    }
  };
  const inApp = (title: string, body: string, what: string) => {
    setSheet({ title, body });
    track("Moments App Ask", { what, place: appPath });
  };
  const total = moments.length;
  const current = slides[active];

  const view = (
    <div className={`${styles.viewer} ${asPage ? styles.viewerPage : ""}`} role={asPage ? undefined : "dialog"} aria-modal={asPage ? undefined : true} aria-label={`Moments at ${placeName}`}>
      <div className={styles.top}>
        {asPage ? (
          <Link href="/" className={styles.topBrand} aria-label="Hano home">
            <img src="/brand-logo/svg/logo.svg" alt="" width={26} height={26} />
          </Link>
        ) : (
          <button type="button" className={styles.round} onClick={close} aria-label="Close">
            ✕
          </button>
        )}
        <p className={styles.topTitle}>
          {placeName}
          {current?.kind === "moment" && total > 1 ? <span className={styles.topCount}> · {current.index + 1} of {total}</span> : null}
        </p>
        <OpenInApp path={appPath} className={styles.topOpen}>
          Open app
        </OpenInApp>
      </div>

      <div ref={scroller} className={styles.scroller}>
        {slides.map((s, i) => (
          <div key={s.kind === "moment" ? s.moment.id : `${s.kind}-${i}`} className={styles.slide} data-slide={i}>
            {s.kind === "moment" ? (
              <MomentSlide
                moment={s.moment}
                near={Math.abs(i - active) <= 2}
                onLike={() => inApp("Like it in Hano", "Save the moments you love and see more from people you follow.", "like")}
                onComment={() =>
                  inApp(`${count(s.moment.comments)} ${s.moment.comments === 1 ? "comment" : "comments"}`, "Read the conversation and join in on Hano. It’s free.", "comment")
                }
                onShare={() => void share(s.moment)}
              />
            ) : s.kind === "app" ? (
              <div className={styles.card}>
                <img src="/brand-logo/svg/logo.svg" alt="" width={56} height={56} />
                <p className={styles.cardTitle}>There’s more in Hano</p>
                <p className={styles.cardBody}>Follow the people behind these moments, save {placeName} for later and check in to earn points.</p>
                <StoreButtons className={styles.cardStores} source="moments_card" />
                <button type="button" className={styles.cardLater} onClick={() => go(1)}>
                  Keep watching ↓
                </button>
              </div>
            ) : (
              <div className={styles.card}>
                <p className={styles.cardTitle}>You’re all caught up</p>
                <p className={styles.cardBody}>New moments from {placeName} show up first in the Hano app.</p>
                <StoreButtons className={styles.cardStores} source="moments_end" />
                {asPage ? (
                  <Link href={appPath.startsWith("p/") ? `/${appPath}` : "/places"} className={styles.cardLater}>
                    See {placeName}
                  </Link>
                ) : (
                  <button type="button" className={styles.cardLater} onClick={close}>
                    Back to {placeName}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.nav} aria-hidden={false}>
        <button type="button" className={styles.round} onClick={() => go(-1)} disabled={active === 0} aria-label="Previous">
          ↑
        </button>
        <button type="button" className={styles.round} onClick={() => go(1)} disabled={active === slides.length - 1} aria-label="Next">
          ↓
        </button>
      </div>
      {toast ? <p className={styles.toast}>{toast}</p> : null}
      <GetAppSheet open={!!sheet} onClose={() => setSheet(null)} title={sheet?.title ?? ""} body={sheet?.body} source="moments_sheet" />
    </div>
  );
  return asPage ? view : createPortal(view, document.body);
}

function MomentSlide({ moment, near, onLike, onComment, onShare }: { moment: Moment; near: boolean; onLike: () => void; onComment: () => void; onShare: () => void }) {
  const [photo, setPhoto] = useState(0);
  const [more, setMore] = useState(false);
  const row = useRef<HTMLDivElement>(null);
  const a = moment.author;
  return (
    <>
      <div
        ref={row}
        className={styles.photos}
        onScroll={(e) => {
          const el = e.currentTarget;
          setPhoto(Math.round(el.scrollLeft / el.clientWidth));
        }}>
        {moment.photos.map((p, i) => (
          <div key={p.src} className={styles.photo}>
            {near || i === 0 ? (
              <>
                <img src={p.src} alt="" aria-hidden className={styles.photoBlur} loading="lazy" />
                <img src={p.src} alt={moment.caption ? moment.caption.slice(0, 120) : `Photo by ${a?.name ?? "a visitor"}`} className={styles.photoImg} loading={near ? "eager" : "lazy"} />
              </>
            ) : null}
          </div>
        ))}
      </div>
      {moment.photos.length > 1 ? (
        <div className={styles.dots} aria-label={`Photo ${photo + 1} of ${moment.photos.length}`}>
          {moment.photos.map((p, i) => (
            <span key={p.src} className={`${styles.dot} ${i === photo ? styles.dotOn : ""}`} />
          ))}
        </div>
      ) : null}

      <div className={styles.rail}>
        <button type="button" className={styles.railBtn} onClick={onLike} aria-label={`Like (${moment.likes ?? 0})`}>
          <span className={styles.railIcon}>♥</span>
          {count(moment.likes)}
        </button>
        <button type="button" className={styles.railBtn} onClick={onComment} aria-label={`Comments (${moment.comments ?? 0})`}>
          <span className={styles.railIcon}>💬</span>
          {count(moment.comments)}
        </button>
        <button type="button" className={styles.railBtn} onClick={onShare} aria-label="Share">
          <span className={styles.railIcon}>↗</span>
          Share
        </button>
      </div>

      <div className={styles.info}>
        <div className={styles.who}>
          {a?.avatar ? <img src={a.avatar} alt="" className={styles.avatar} /> : <span className={`${styles.avatar} ${styles.avatarBlank}`}>{a?.name[0] ?? "H"}</span>}
          {a?.username ? (
            <Link href={`/u/${a.username}`} className={styles.name}>
              {a.name}
            </Link>
          ) : (
            <span className={styles.name}>{a?.name ?? "A visitor"}</span>
          )}
          <span className={styles.when}>{ago(moment.at)}</span>
        </div>
        {moment.stars ? <p className={styles.stars} aria-label={`${moment.stars} out of 5`}>{"★".repeat(moment.stars)}{"☆".repeat(5 - moment.stars)}</p> : null}
        {moment.caption ? (
          <p className={`${styles.caption} ${more ? styles.captionOpen : ""}`} onClick={() => setMore((v) => !v)}>
            {moment.caption}
          </p>
        ) : null}
      </div>
    </>
  );
}

/** "See all photos" on a place's gallery: the place's own photos in the same viewer. */
export function PhotosButton({ photos, placeName, appPath, className, children }: { photos: string[]; placeName: string; appPath: string; className?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const moments = useMemo<Moment[]>(() => photos.map((src, i) => ({ id: `photo-${i}`, photos: [{ src }] })), [photos]);
  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>
      {open ? <MomentsViewer moments={moments} start={0} placeName={placeName} appPath={appPath} onClose={() => setOpen(false)} /> : null}
    </>
  );
}
