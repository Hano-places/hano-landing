import Link from "next/link";
import { footer, site } from "@/content/landing";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";
import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <Container>
          <div className={styles.topBlock}>
            <div className={styles.brand}>
              <Logo />
              <p>{footer.tagline}</p>
            </div>
            <div className={styles.column}>
              <h3>Sitemap</h3>
              {footer.sitemap.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
            <div className={styles.column}>
              <h3>Email</h3>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </div>
        </Container>
      </div>
      <div className={styles.bottom}>
        <Container className={styles.bottomInner}>
          <p>{footer.copyright}</p>
          <div className={styles.socials}>
            <span>Follow us:</span>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              Instagram
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
