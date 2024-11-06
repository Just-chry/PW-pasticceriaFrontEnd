'use client';

import { usePathname } from 'next/navigation';

import Link from 'next/link';
import Image from 'next/image';

import styles from "@/components/header.module.css";
import logo from '@/public/images/logoPasticceria.png';

export default function Header() {
  const path = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src={logo} alt="Pasticceria C'est la Vie"  width="200" height="80" />
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/" className={path === "/" ? `${styles.link} ${styles.active}` : styles.link}>Home</Link>
          </li>
          <li>
            <Link href="/products" className={path === "/products" ? `${styles.link} ${styles.active}` : styles.link}>Prodotti</Link>
          </li>
          <li>
            <Link href="/contacts" className={path === "/contacts" ? `${styles.link} ${styles.active}` : styles.link}>Contatti</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.authButtons}>
        <button><Link href="/login" className={path === "/login" ? `${styles.link} ${styles.active}` : styles.link}>Login</Link></button>
        <button><Link href="/register" className={path === "/register" ? `${styles.link} ${styles.active}` : styles.link}>Registrati</Link></button>
      </div>
    </header>
  );
}