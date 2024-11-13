import Link from 'next/link';

import Hero from '@/components/hero';
import Footer from '@/components/footer';

import styles from '@/app/page.module.css'

export default function NotFound() {
    return (
        <div>
            <Hero />

        <main className={styles.errorContainer}>
            <h1>
                <span className={styles.lean}>4</span>04
            </h1>
            <h2>
                Impossibile trovare la pagina che stai cercando.
            </h2>
            <p>
                Torna alla{" "}
                    <Link className={styles.error} href="/">Home</Link>
            </p>
        </main>
        <footer>
            <Footer />
        </footer>
        </div>
    );
}