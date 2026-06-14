"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/content/landing";
import { useActiveSection } from "@/hooks/use-active-section";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Logo } from "./logo";
import styles from "./header.module.css";

const sectionIds = navLinks
  .map((l) => l.href.replace(/^\/?#/, ""))
  .filter(Boolean);

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const activeId = useActiveSection(sectionIds);

  return (
    <header className={styles.header}>
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
            href="/#early-access"
            className={`${styles.desktopCta} ${styles.ctaLink}`}
          >
            Join Early Access
          </Link>
          <button
            type="button"
            className={styles.menuBtn}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name="grid" size={22} />
          </button>
        </div>
      </Container>

      {menuOpen && (
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
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
            href="/#early-access"
            className={`${styles.ctaLink} ${styles.mobileCta}`}
            onClick={() => setMenuOpen(false)}
          >
            Join Early Access
          </Link>
        </nav>
      )}
    </header>
  );
}
