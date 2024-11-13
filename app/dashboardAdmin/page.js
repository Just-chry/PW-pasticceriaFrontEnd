"use client";

import Link from 'next/link'; 
import Image from 'next/image'; 

import Footer from '@/components/footer';

import styles from '@/app/dashboardAdmin/page.module.css';


export default function Dashboard() {
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
                        <button className={styles.button}>Ordini</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
