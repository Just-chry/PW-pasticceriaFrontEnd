import Image from 'next/image';
import styles from '@/components/hero.module.css';
import logoImage from '@/public/images/logoPasticceria.png';

export default function Hero() {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroBackground}>
      </div>

      <div className={styles.logoContainer}>
        <Image
          src={logoImage}
          alt="Pasticceria C'est La Vie Logo"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}