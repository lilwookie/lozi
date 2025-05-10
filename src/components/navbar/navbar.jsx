'use client';

import styles from './navbar.module.css';
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>Tenanz</div>
      <div className={styles.links}>
        <Link href="/" className={styles.link}>Home</Link>
        <Link href="/tenant/login" className={styles.link}>Login</Link>
        <Link href="/about" className={styles.link}>About</Link>
      </div>
    </nav>
  );
}
