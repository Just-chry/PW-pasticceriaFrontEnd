'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import Link from 'next/link';
import Image from 'next/image';

import logo from '@/public/images/logoPasticceria.png';

import styles from "@/app/dashboardAdmin/components/header.module.css";

export default function Header() {

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/logout', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Response:', response);

      if (response.ok) {
        console.log('Logout successful');
        window.location.href = '/';
      } else {
        console.log(response);
        const errorMessage = await response.text();
        console.log('Logout failed', response.status, errorMessage);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

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
            <Link href="/productsCategory"
                  className={path === "/productsCategory" ? `${styles.link} ${styles.active}` : styles.link} onClick={closeMenu}>Prodotti</Link>
          </li>
          <li className={styles.desktopOnly}>
            <Link href="/contacts"
                  className={path === "/contacts" ? `${styles.link} ${styles.active}` : styles.link} onClick={closeMenu}>Contatti</Link>
          </li>
          <li className={styles.mobileOnly}>
            <Link href="/" className={path === "/" ? `${styles.link} ${styles.active}` : styles.link} onClick={closeMenu}>Home</Link>
          </li>
          <li className={styles.mobileOnly}>
            <Link href="/productsCategory"
                  className={path === "/productsCategory" ? `${styles.link} ${styles.active}` : styles.link} onClick={closeMenu}>Prodotti</Link>
          </li>
          <li className={styles.mobileOnly}>
            <Link href="/contacts"
                  className={path === "/contacts" ? `${styles.link} ${styles.active}` : styles.link} onClick={closeMenu}>Contatti</Link>
          </li>
          <li className={styles.mobileOnly}>
            <Link href="/dashboardAdmin"
                  className={path === "/dashboardAdmin" ? `${styles.link} ${styles.active}` : styles.link} onClick={closeMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width='40' height='40' fill="#000">
                <path d="m9 10 3-3 3 3-3 3zM4.59 18.5 12 16l7.5 2.5-7.45 2.97-7.46-2.97z" fill="#F3BC9F"></path>
                <path
                    d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18.22a8.18 8.18 0 0 1-5.03-1.72 8.18 8.18 0 0 1 10.06 0A8.18 8.18 0 0 1 12 20.22Zm6.32-2.97C16.6 15.84 14.4 15 12 15s-4.6.84-6.32 2.25a8.22 8.22 0 1 1 12.64 0ZM12 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z"></path>
              </svg>
            </Link>
          </li>
          <li className={styles.mobileOnly}>
            <Link href="" className={path === "" ? `${styles.link} ${styles.active}` : styles.link}
                  onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
      </nav>
      <div className={`${styles.authButtons} ${menuOpen ? styles.hidden : ''}`}>
        <button><Link href="/dashboardAdmin" className={path === "/dashboardAdmin" ? `${styles.link} ${styles.active}` : styles.link}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width='40' height='40' fill="#000"><path d="m9 10 3-3 3 3-3 3zM4.59 18.5 12 16l7.5 2.5-7.45 2.97-7.46-2.97z" fill="#F3BC9F"></path><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18.22a8.18 8.18 0 0 1-5.03-1.72 8.18 8.18 0 0 1 10.06 0A8.18 8.18 0 0 1 12 20.22Zm6.32-2.97C16.6 15.84 14.4 15 12 15s-4.6.84-6.32 2.25a8.22 8.22 0 1 1 12.64 0ZM12 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z"></path></svg></Link></button>
        <button><Link href="" className={path === "" ? `${styles.link} ${styles.active}` : styles.link} onClick={handleLogout}>Logout</Link></button>
      </div>
    </header>
  );
}