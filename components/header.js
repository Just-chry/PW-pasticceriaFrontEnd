'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import styles from "@/components/header.module.css";
import logo from '@/public/images/logoPasticceria.png';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const path = usePathname();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <a href='/'>
          <Image src={logo} alt="Pasticceria C'est la Vie" width="150" height="60" />
        </a>
      </div>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <div className={menuOpen ? `${styles.bar} ${styles.open}` : styles.bar}></div>
        <div className={menuOpen ? `${styles.bar} ${styles.open}` : styles.bar}></div>
        <div className={menuOpen ? `${styles.bar} ${styles.open}` : styles.bar}></div>
      </div>
      <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
        <ul>
          <li className={styles.desktopOnly}>
            <Link href="/" className={path === "/" ? `${styles.link} ${styles.active}` : styles.link}>Home</Link>
          </li>
          <li className={styles.desktopOnly}>
            <Link href="/products" className={path === "/products" ? `${styles.link} ${styles.active}` : styles.link}>Prodotti</Link>
          </li>
          <li className={styles.desktopOnly}>
            <Link href="/contacts" className={path === "/contacts" ? `${styles.link} ${styles.active}` : styles.link}>Contatti</Link>
          </li>
          <li className={styles.mobileOnly}>
            <Link href="/" className={path === "/" ? `${styles.link} ${styles.active}` : styles.link}>Home</Link>
          </li>
          <li className={styles.mobileOnly}>
            <Link href="/products" className={path === "/products" ? `${styles.link} ${styles.active}` : styles.link}>Prodotti</Link>
          </li>
          <li className={styles.mobileOnly}>
            <Link href="/contacts" className={path === "/contacts" ? `${styles.link} ${styles.active}` : styles.link}>Contatti</Link>
          </li>
          <li className={styles.mobileOnly}>
            <Link href="/login" className={path === "/login" ? `${styles.link} ${styles.active}` : styles.link}>Login</Link>
          </li>
          <li className={styles.mobileOnly}>
            <Link href="/register" className={path === "/register" ? `${styles.link} ${styles.active}` : styles.link}>Registrati</Link>
          </li>
        </ul>
      </nav>
      <div className={`${styles.authButtons} ${menuOpen ? styles.hidden : ''}`}>
        <button><Link href="/login" className={path === "/login" ? `${styles.link} ${styles.active}` : styles.link}>Login</Link></button>
        <button><Link href="/register" className={path === "/register" ? `${styles.link} ${styles.active}` : styles.link}>Registrati</Link></button>
      </div>
    </header>
  );
}