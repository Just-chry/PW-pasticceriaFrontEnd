"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/footer';
import styles from '@/app/dashboardAdmin/page.module.css';

export default function Dashboard() {
    const router = useRouter();
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:8080/user', {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    const userData = await response.json();
                    if (userData.role !== 'admin') {
                        router.push('/not-found');
                    } else {
                        setUserRole('admin');
                    }
                } else {
                    throw new Error('Errore durante il recupero dei dati utente');
                }
            } catch (error) {
                console.error('Errore durante la richiesta:', error);
                router.push('/not-found');
            }
        };

        fetchUserData();
    }, [router]);

    if (userRole !== 'admin') {
        // Mostra un caricamento o nulla mentre la verifica è in corso
        return <p>Caricamento in corso...</p>;
    }

    return (
        <>
            <div className={styles.heroContainer}>
                <div className={styles.heroBackground}></div>
                <div className={styles.container}>
                    <div className={styles.logoContainer}>
                        <Image
                            src="/images/cestlavie.png"
                            alt="Logo"
                            layout="intrinsic"
                            width={300}
                            height={200}
                            quality={100}
                        />
                    </div>
                    <div className={styles.buttonContainer}>
                        <Link href="/magazzino">
                            <button className={styles.button}>Magazzino</button>
                        </Link>
                        <Link href="/ordiniAdmin">
                            <button className={styles.button}>Ordini</button>
                        </Link>
                        <Link href="/utenti">
                            <button className={styles.button}>Utenti</button>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
