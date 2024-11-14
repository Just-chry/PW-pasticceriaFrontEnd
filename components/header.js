'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import Link from 'next/link';
import Image from 'next/image';

import logo from '@/public/images/logoPasticceria.png';

import styles from "@/components/header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const path = usePathname();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menuOpen');
    } else {
      document.body.classList.remove('menuOpen');
    }

    return () => {
      document.body.classList.remove('menuOpen');
    };
  }, [menuOpen]);

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
            <Link href="/" className={path === "/" ? `${styles.link} ${styles.active}` : styles.link} onClick={closeMenu}>Home</Link>
          </li>
          <li className={styles.desktopOnly}>
            <Link href="/productsCategory" className={path === "/productsCategory" ? `${styles.link} ${styles.active}` : styles.link} onClick={closeMenu}>Prodotti</Link>
          </li>
          <li className={styles.desktopOnly}>
            <Link href="/contacts" className={path === "/contacts" ? `${styles.link} ${styles.active}` : styles.link} onClick={closeMenu}>Contatti</Link>
          </li>
          <li className={styles.mobileOnly}>
            <Link href="/" className={path === "/" ? `${styles.link} ${styles.active}` : styles.link} onClick={closeMenu}>Home</Link>
          </li>
          <li className={styles.mobileOnly}>
            <Link href="/productsCategory" className={path === "/productsCategory" ? `${styles.link} ${styles.active}` : styles.link} onClick={closeMenu}>Prodotti</Link>
          </li>
          <li className={styles.mobileOnly}>
            <Link href="/contacts" className={path === "/contacts" ? `${styles.link} ${styles.active}` : styles.link} onClick={closeMenu}>Contatti</Link>
          </li>
          <li className={styles.mobileOnly}>
            <Link href="/login" className={path === "/login" ? `${styles.link} ${styles.active}` : styles.link} onClick={closeMenu}>Login</Link>
          </li>
          <li className={styles.mobileOnly}>
            <Link href="/register" className={path === "/register" ? `${styles.link} ${styles.active}` : styles.link} onClick={closeMenu}>Registrati</Link>
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
