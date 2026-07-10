"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/content/landing";
import { useActiveSection } from "@/hooks/use-active-section";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
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

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }
      if (headerRef.current?.contains(target)) {
        return;
      }
      setMenuOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header ref={headerRef} className={styles.header}>
      <Container className={styles.inner}>
        <Link href="/" aria-label="Hano home">
          <Logo />
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

      {menuOpen ? (
        <nav
          id="mobile-navigation"
          className={styles.mobileNav}
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/download"
            className={`${styles.ctaLink} ${styles.mobileCta}`}
            onClick={() => setMenuOpen(false)}
          >
            Download App
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
