import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: ReactNode;
};

export function Button({
  variant = "solid",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const sizeClass = size === "sm" ? styles.sm : size === "lg" ? styles.lg : "";
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[variant]} ${sizeClass} ${fullWidth ? styles.fullWidth : ""} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
