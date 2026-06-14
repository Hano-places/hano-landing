import { hero } from "@/content/landing";
import { AppleLogo, GooglePlayLogo } from "@/components/ui/store-logos";
import styles from "./hero-app-badge.module.css";

export function HeroAppBadge() {
  return (
    <div className={styles.badge}>
      <div className={styles.icons} aria-hidden>
        <span className={styles.iconWrap}>
          <AppleLogo className={styles.icon} />
        </span>
        <span className={styles.iconWrap}>
          <GooglePlayLogo className={styles.playIcon} />
        </span>
      </div>
      <span className={styles.text}>{hero.badge}</span>
    </div>
  );
}
