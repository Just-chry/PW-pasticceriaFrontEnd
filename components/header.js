import Image from 'next/image';

import logo from '@/public/images/logoPasticceria.png';

import styles from "@/components/header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src={logo} alt="Pasticceria C'est la Vie" className={styles.logo} />
      </div>
      <nav className={styles.nav}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/products">Prodotti</a></li>
          <li><a href="/contacts">Contatti</a></li>
        </ul>
      </nav>
      <div className={styles.authButtons}>
        <button><a href='/login'>Login</a></button>
        <button><a href='/register'>Registrati</a></button>
      </div>
    </header>
  );
}
