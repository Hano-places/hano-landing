import Link from "next/link";
import { footer } from "@/content/landing";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";
import { FooterSubscribe } from "./footer-subscribe";
import styles from "./footer.module.css";

function FooterLink({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }

  if (href.startsWith("#") || href.startsWith("/")) {
    return <Link href={href}>{label}</Link>;
  }

  return <a href={href}>{label}</a>;
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.shell}>
        <Container>
          <div className={styles.box}>
            <div className={styles.main}>
              <div className={styles.top}>
                <div className={styles.brand}>
                  <Logo size="md" tone="light" />
                  <p className={styles.tagline}>{footer.tagline}</p>
                </div>

                <div className={styles.subscribe}>
                  <h3 className={styles.columnTitle}>{footer.subscribe.title}</h3>
                  <FooterSubscribe />
                </div>
              </div>

              <div className={styles.divider} aria-hidden />

              <div className={styles.columns}>
                {footer.columns.map((column) => (
                  <div key={column.title} className={styles.column}>
                    <h3 className={styles.columnTitle}>{column.title}</h3>
                    <ul className={styles.linkList}>
                      {column.links.map((link) => (
                        <li key={`${column.title}-${link.label}`}>
                          <FooterLink
                            href={link.href}
                            label={link.label}
                            external={
                              "external" in link ? link.external : undefined
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.bottom}>
              <p className={styles.copyright}>{footer.copyright}</p>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
