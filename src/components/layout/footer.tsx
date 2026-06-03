import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          {/* Customer Help */}
          <div>
            <h4 className={styles.heading}>Support</h4>
            <ul className={styles.list}>
              <li><Link href="/faq" className={styles.link}>FAQs</Link></li>
              <li><Link href="/shipping" className={styles.link}>Shipping & Returns</Link></li>
              <li><Link href="/contact" className={styles.link}>Contact Us</Link></li>
              <li><Link href="/warranty" className={styles.link}>Lifetime Warranty</Link></li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className={styles.heading}>Shop</h4>
            <ul className={styles.list}>
              <li><Link href="/shop" className={styles.link}>Jewelry</Link></li>
              <li><Link href="/shop" className={styles.link}>Cosmetics</Link></li>
              <li><Link href="/shop" className={styles.link}>Hair Care</Link></li>
            </ul>
          </div>

          {/* Mission */}
          <div>
            <h4 className={styles.heading}>About Qelvoryn</h4>
            <p className={styles.text}>
              Curated elegance for the modern individual. Premium materials, flawless design, built to inspire.
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className={styles.heading}>Join The List</h4>
            <p className={styles.text}>Subscribe for early access to new drops.</p>
            <form className={styles.form}>
              <input 
                type="email" 
                placeholder="Email address" 
                className={styles.input}
                required
              />
              <button type="submit" className={styles.submit}>
                Join
              </button>
            </form>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} QELVORYN. ALL RIGHTS RESERVED.</p>
          
          {/* Payment Icons (Visual Mockup) */}
          <div className={styles.payment}>
            <div className={styles.paymentIcon}></div>
            <div className={styles.paymentIcon}></div>
            <div className={styles.paymentIcon}></div>
            <div className={styles.paymentIcon}></div>
          </div>

          <div className={styles.legal}>
            <Link href="/privacy" className={styles.link}>Privacy</Link>
            <Link href="/terms" className={styles.link}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
