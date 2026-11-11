"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { navLinks } from "@/content/landing";
import { useActiveSection } from "@/hooks/use-active-section";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Arrow } from "@/components/ui/arrow";
import { StoreButtons } from "@/components/ui/store-buttons";
import { DownloadButton } from "@/components/download/download-modal";
import { Logo } from "./logo";
import styles from "./header.module.css";

const sectionIds = navLinks
  .filter((l) => l.href.includes("#"))
  .map((l) => l.href.replace(/^\/?#/, ""))
  .filter(Boolean);

function MenuCloseIcon() {
  return (
    <svg
      aria-hidden
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

/** `boxed`: the homepage's look, a rounded bar inset from the edges like the sections under it. */
export function Header({ boxed = false }: { boxed?: boolean } = {}) {
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  // The page the menu was opened on: navigating anywhere else closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const menuOpen = openOn === pathname;
  const setMenuOpen = (open: boolean | ((o: boolean) => boolean)) =>
    setOpenOn((typeof open === "function" ? open(menuOpen) : open) ? pathname : null);
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }
      if (headerRef.current?.contains(target) || panelRef.current?.contains(target)) {
        return;
      }
      setOpenOn(null);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenOn(null);
      }
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header ref={headerRef} className={`${styles.header} ${boxed ? styles.boxed : ""}`}>
      {/* Phones and tablets: tapping anywhere on the bar opens the menu (the menu button stays the accessible control). */}
      <button
        type="button"
        className={styles.barHit}
        aria-hidden
        tabIndex={-1}
        onClick={() => setMenuOpen((open) => !open)}
      />
      <Container className={styles.inner}>
        <Link href="/" aria-label="Hano home">
          <Logo size={boxed ? "md" : "sm"} />
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          {navLinks.map((link) => {
            const id = link.href.replace(/^\/?#/, "");
            const isRoute = link.href.startsWith("/") && !link.href.includes("#");
            const isActive = isRoute
              ? pathname === link.href
              : pathname === "/" && activeId === id;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <DownloadButton className={`${styles.desktopCta} ${styles.ctaLink}`}>Download App</DownloadButton>
          <button
            type="button"
            className={styles.menuBtn}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <MenuCloseIcon /> : <Icon name="grid" size={22} />}
          </button>
        </div>
      </Container>

      <MenuPanel open={menuOpen} pathname={pathname} panelRef={panelRef} onClose={() => setOpenOn(null)} />
    </header>
  );
}

const noop = () => () => {};

/**
 * The phone/tablet menu, rendered on <body> (the bar's blur would otherwise trap a fixed panel inside it).
 * It stays mounted and a GSAP timeline plays forward to open and backward to close: the page blurs,
 * the panel unfolds from the corner the button is in, then the links rise in one after another.
 */
function MenuPanel({
  open,
  pathname,
  panelRef,
  onClose,
}: {
  open: boolean;
  pathname: string;
  panelRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
}) {
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const layer = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      if (!layer.current) return;
      const q = gsap.utils.selector(layer);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "expo.out" } })
        .fromTo(
          q("[data-scrim]"),
          { opacity: 0, backdropFilter: "blur(0px)", webkitBackdropFilter: "blur(0px)" },
          { opacity: 1, backdropFilter: "blur(14px)", webkitBackdropFilter: "blur(14px)", duration: 0.5, ease: "power2.out" },
          0,
        )
        .fromTo(
          q("[data-panel]"),
          { clipPath: "inset(0% 0% 100% 45% round 24px)", y: -8 },
          { clipPath: "inset(0% 0% 0% 0% round 24px)", y: 0, duration: 0.8 },
          0,
        )
        .fromTo(q("[data-close]"), { scale: 0.4, rotate: -120, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 0.6 }, 0.15)
        .fromTo(q("[data-item]"), { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.055 }, 0.18)
        .fromTo(q("[data-foot]"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.45);
      if (reduce) tl.current.timeScale(20);
    },
    { scope: layer, dependencies: [mounted] },
  );

  useEffect(() => {
    const t = tl.current;
    const el = layer.current;
    if (!t || !el) return;
    if (open) {
      t.eventCallback("onReverseComplete", null);
      gsap.set(el, { visibility: "visible" });
      t.timeScale(t.timeScale() > 2 ? t.timeScale() : 1).play();
      // Focus the panel so keyboard users land inside it.
      panelRef.current?.focus({ preventScroll: true });
    } else if (t.progress() > 0) {
      t.eventCallback("onReverseComplete", () => gsap.set(el, { visibility: "hidden" }));
      t.timeScale(t.timeScale() > 2 ? t.timeScale() : 1.7).reverse();
    }
  }, [open, mounted, panelRef]);

  if (!mounted) return null;

  return createPortal(
    <div ref={layer} className={styles.menuLayer} aria-hidden={!open} inert={!open}>
      <div data-scrim className={styles.scrim} onClick={onClose} />
      <div
        ref={panelRef}
        data-panel
        id="mobile-navigation"
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        tabIndex={-1}
      >
        <div className={styles.panelTop}>
          <Link href="/" aria-label="Hano home" onClick={onClose} className={styles.panelLogo}>
            <Logo size="sm" tone="light" />
          </Link>
          <button type="button" data-close className={styles.closeBtn} aria-label="Close menu" onClick={onClose}>
            <MenuCloseIcon />
          </button>
        </div>
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-item
              className={`${styles.mobileLink} ${pathname === link.href ? styles.mobileLinkActive : ""}`}
              onClick={onClose}
            >
              <span className={styles.roll}>
                <span data-text={link.label}>{link.label}</span>
              </span>
              <span className={styles.linkArrow} aria-hidden>
                <Arrow dir="right" size={18} />
              </span>
            </Link>
          ))}
        </nav>
        <div data-foot className={styles.panelFoot}>
          <p>Get the app</p>
          <StoreButtons source="menu" />
        </div>
      </div>
    </div>,
    document.body,
  );
}
