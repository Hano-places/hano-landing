import { HanoLogoMark } from "@/components/ui/hano-logo-mark";
import styles from "./hero-notification-cards.module.css";

export type HeroNotification = {
  size: "large" | "small";
  app: string;
  time: string;
  title: string;
  body: string;
};

type HeroNotificationCardsProps = {
  notifications: readonly HeroNotification[];
  className?: string;
};

export function HeroNotificationCards({
  notifications,
  className,
}: HeroNotificationCardsProps) {
  return (
    <div
      className={`${styles.stack}${className ? ` ${className}` : ""}`}
      aria-hidden
    >
      {notifications.map((notification, index) => (
        <div
          key={`${notification.title}-${index}`}
          className={`${styles.card} ${
            notification.size === "large" ? styles.cardLarge : styles.cardSmall
          }`}
        >
          <div className={styles.header}>
            <HanoLogoMark size={18} className={styles.icon} />
            <span className={styles.app}>{notification.app.toUpperCase()}</span>
            <span className={styles.time}>{notification.time}</span>
          </div>
          <p className={styles.title}>{notification.title}</p>
          <p className={styles.body}>{notification.body}</p>
        </div>
      ))}
    </div>
  );
}
