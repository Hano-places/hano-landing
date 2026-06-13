import Image from "next/image";
import styles from "./logo.module.css";

const LOGO_MARK = "/brand-logo/small.png";
const LOGO_MARK_LARGE = "/brand-logo/large.png";

type LogoProps = {
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  tone?: "default" | "light";
};

const MARK_SIZES = {
  sm: 32,
  md: 40,
  lg: 64,
} as const;

export function Logo({ showText = true, size = "sm", tone = "default" }: LogoProps) {
  const markSize = MARK_SIZES[size];
  const useLargeAsset = size === "lg";

  return (
    <div className={styles.logo}>
      <Image
        src={useLargeAsset ? LOGO_MARK_LARGE : LOGO_MARK}
        alt={showText ? "" : "Hano"}
        width={markSize}
        height={markSize}
        className={`${styles.mark} ${styles[size]}`.trim()}
        priority={size !== "lg"}
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
