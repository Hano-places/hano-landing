import type { ReactNode } from "react";
import styles from "./badge.module.css";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${className}`.trim()}>{children}</span>
  );
}
