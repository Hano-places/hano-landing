import { HanoLogoMark } from "@/components/ui/hano-logo-mark";
import styles from "./logo.module.css";

type LogoProps = {
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  tone?: "default" | "light";
};

export function Logo({ showText = true, size = "sm", tone = "default" }: LogoProps) {
  return (
    <div className={styles.logo}>
      <HanoLogoMark
        className={`${styles.mark} ${styles[size]}`.trim()}
        alt={showText ? undefined : "Hano"}
      />
      {showText && (
        <span
          className={`${styles.text}${tone === "light" ? ` ${styles.textLight}` : ""}`}
        >
          Hano
        </span>
      )}
    </div>
  );
}
