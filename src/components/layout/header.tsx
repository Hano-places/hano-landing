"use client";

import { useState } from "react";
import Link from "next/link";
import { navLinks } from "@/content/landing";
import { useActiveSection } from "@/hooks/use-active-section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Logo } from "./logo";
import styles from "./header.module.css";

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link href="#hero" aria-label="Hano home">
          <Logo />
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${activeId === id ? styles.navLinkActive : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <Link
            href="#early-access"
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
          <Link href="#early-access" onClick={() => setMenuOpen(false)}>
            <Button variant="outline" fullWidth>
              Join Early Access
            </Button>
          </Link>
        </nav>
      )}
    </header>
  );
}
