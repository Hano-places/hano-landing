"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/content/landing";
import { useActiveSection } from "@/hooks/use-active-section";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Arrow } from "@/components/ui/arrow";
import { StoreButtons } from "@/components/ui/store-buttons";
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
          <Link
            href="/download"
            className={`${styles.desktopCta} ${styles.ctaLink}`}
          >
            Download App
          </Link>
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

      {/* Rendered on <body>: the bar's blur would otherwise trap a fixed panel inside it and let the page show through. */}
      {menuOpen
        ? createPortal(
            <div className={styles.menuLayer}>
              <div className={styles.scrim} aria-hidden onClick={() => setMenuOpen(false)} />
              <div ref={panelRef} id="mobile-navigation" className={styles.panel} role="dialog" aria-modal="true" aria-label="Menu">
                <div className={styles.panelTop}>
                  <Link href="/" aria-label="Hano home" onClick={() => setMenuOpen(false)} className={styles.panelLogo}>
                    <Logo size="sm" tone="light" />
                  </Link>
                  <button type="button" className={styles.closeBtn} aria-label="Close menu" onClick={() => setMenuOpen(false)}>
                    <MenuCloseIcon />
                  </button>
                </div>
                <nav className={styles.mobileNav} aria-label="Mobile navigation">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`${styles.mobileLink} ${pathname === link.href ? styles.mobileLinkActive : ""}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                      <Arrow dir="right" size={20} />
                    </Link>
                  ))}
                </nav>
                <div className={styles.panelFoot}>
                  <p>Get the app</p>
                  <StoreButtons />
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}
