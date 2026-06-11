import type { ReactNode } from "react";
import { Icon, type IconName } from "./icon";
import styles from "./card.module.css";

type FeatureCardProps = {
  icon?: IconName;
  title: string;
  description: string;
  className?: string;
};

export function FeatureCard({
  icon,
  title,
  description,
  className = "",
}: FeatureCardProps) {
  return (
    <article className={`${styles.card} ${className}`.trim()}>
      {icon && (
        <div className={styles.iconBox}>
          <Icon name={icon} size={18} />
        </div>
      )}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </article>
  );
}

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return <div className={`${styles.card} ${className}`.trim()}>{children}</div>;
}
