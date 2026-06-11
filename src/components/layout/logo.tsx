import styles from "./logo.module.css";

type LogoProps = {
  showText?: boolean;
};

export function Logo({ showText = true }: LogoProps) {
  return (
    <div className={styles.logo}>
      <span className={styles.mark} aria-hidden>
        <span className={styles.circle} />
        <span className={styles.line} />
      </span>
      {showText && <span className={styles.text}>Hano</span>}
    </div>
  );
}
