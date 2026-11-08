import { StoreButtons } from "@/components/ui/store-buttons";
import styles from "./footer.module.css";

export function FooterSubscribe() {
  return (
    <div className={styles.subscribeForm}>
      <StoreButtons />
    </div>
  );
}
