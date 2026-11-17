import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  BubbleChatIcon,
  Cancel01Icon,
  FavouriteIcon,
  Image01Icon,
  SentIcon,
  StarIcon,
} from "@hugeicons/core-free-icons";
import styles from "./app-icon.module.css";

/** The app's icons (Hugeicons, same names and stroke as mobile-app/src/theme/icons.ts), for the web. */
const ICONS = {
  like: FavouriteIcon,
  comment: BubbleChatIcon,
  share: SentIcon,
  close: Cancel01Icon,
  chevronUp: ArrowUp01Icon,
  chevronDown: ArrowDown01Icon,
  photo: Image01Icon,
  star: StarIcon,
};
export type AppIconName = keyof typeof ICONS;

export function AppIcon({ name, size = 24, filled, className }: { name: AppIconName; size?: number; filled?: boolean; className?: string }) {
  return (
    <HugeiconsIcon
      icon={ICONS[name]}
      size={size}
      color="currentColor"
      strokeWidth={1.8}
      className={`${filled ? styles.filled : ""} ${className ?? ""}`}
      aria-hidden
    />
  );
}

/** Rating as five app stars, filled up to `value`. */
export function Stars({ value, size = 14, className }: { value: number; size?: number; className?: string }) {
  const n = Math.round(value);
  return (
    <span className={`${styles.stars} ${className ?? ""}`} role="img" aria-label={`${n} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <AppIcon key={i} name="star" size={size} filled={i < n} className={i < n ? "" : styles.off} />
      ))}
    </span>
  );
}
