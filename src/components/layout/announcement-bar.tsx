import Link from "next/link";
import styles from "./announcement-bar.module.css";

export default function AnnouncementBar() {
  return (
    <div className={styles.bar}>
      <Link href="/shop" className={styles.link}>
        Complimentary Worldwide Shipping on Orders Over $150
      </Link>
    </div>
  );
}
