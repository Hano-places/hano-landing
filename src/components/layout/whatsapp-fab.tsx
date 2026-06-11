import { site } from "@/content/landing";
import { Icon } from "@/components/ui/icon";
import styles from "./whatsapp-fab.module.css";

export function WhatsAppFab() {
  return (
    <a
      href={site.whatsappUrl}
      className={styles.fab}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Join WhatsApp community"
    >
      <Icon name="message" size={22} />
    </a>
  );
}
