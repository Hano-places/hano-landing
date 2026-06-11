import type { ReactNode } from "react";
import styles from "./main-wrapper.module.css";

type MainWrapperProps = {
  children: ReactNode;
};

export function MainWrapper({ children }: MainWrapperProps) {
  return <div className={styles.wrapper}>{children}</div>;
}
