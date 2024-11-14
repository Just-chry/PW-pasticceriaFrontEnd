import Link from 'next/link';
import Image from 'next/image';

import styles from '@/components/categoria.module.css';

export default function Categoria({ titolo, immagine, link }) {
  return (
    <Link href={link} passHref className={styles.link}>
      <div className={styles.categoriaCard}>
        <Image
          src={immagine}
          alt={titolo}
          width={400}
          height={300}
          className={styles.categoriaImmagine}
        />
        <h3 className={styles.categoriaTitolo}>{titolo}</h3>
      </div>
    </Link>
  );
}
