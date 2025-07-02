'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import clsx from 'clsx';
import styles from './navbar.module.css';

export default function NavBar({ className = '' }) {
  const [collapsed, setCollapsed] = useState(true);
  const pathname = usePathname();

  const toggleCollapse = () => setCollapsed(prev => !prev);
  const closeMenu = () => setCollapsed(true);

  return (
    <nav className={clsx(styles.nav, className)}>
      <Link href="/" className={styles.logo}>Tenanz</Link>

      <div className={styles.menuToggle} onClick={toggleCollapse}>
        {collapsed ? (
          <FaBars className={styles.menuIcon} />
        ) : (
          <FaTimes className={`${styles.menuIcon} ${styles.menuIconClose}`} />
        )}
      </div>

      <div className={`${styles.links} ${collapsed ? '' : styles.showMenu}`}>
        <Link href="/" className={`${styles.link} ${pathname === '/' ? styles.active : ''}`} onClick={closeMenu}>Home</Link>
        <Link href="/tenant/login" className={`${styles.link} ${pathname === '/tenant/login' ? styles.active : ''}`} onClick={closeMenu}>Login</Link>
        <Link href="/about" className={`${styles.link} ${pathname === '/about' ? styles.active : ''}`} onClick={closeMenu}>About</Link>
      </div>
    </nav>
  );
}
