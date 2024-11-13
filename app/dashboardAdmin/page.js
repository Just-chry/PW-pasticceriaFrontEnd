"use client";

import styles from './dashboardadmin.module.css';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Link from 'next/link';  // Importa il componente Link
import Image from 'next/image';  // Importa il componente Image di Next.js

export default function Dashboard() {
    return (
        <>
            <Header />
            <div className={styles.heroContainer}>
                <div className={styles.heroBackground}></div>
                <div className={styles.container}>
                    {/* Contenitore per il logo */}
                    <div className={styles.logoContainer}>
                        <Image 
                            src="/images/cestlavie.png"  // Percorso dell'immagine del logo
                            alt="Logo" 
                            layout="intrinsic"  // Usa "intrinsic" per mantenere le proporzioni naturali
                            width={300}  // Imposta la larghezza desiderata
                            height={200}  // Imposta l'altezza desiderata, mantenendo le proporzioni
                            quality={100}  // Aumenta la qualità dell'immagine (puoi regolare questo valore)
                        />
                    </div>
                    <div className={styles.buttonContainer}>
                        {/* Usa Link per navigare alla pagina magazzino */}
                        <Link href="/magazzino">
                            <button className={styles.button}>Magazzino</button>
                        </Link>
                        <Link href="/ordini">
                            <button className={styles.button}>Ordini</button>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
