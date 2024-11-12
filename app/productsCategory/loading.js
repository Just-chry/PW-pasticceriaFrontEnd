import Header from "@/components/header";
import Hero from "@/components/hero";
import Footer from "@/components/footer";

import styles from "@/app/productsCategory/loading.module.css";

export default function ProductsLoading() {
    return (
        <div>
            <header className={styles.components}>
                <Header />
            </header>
            <div className={styles.components}>
                <Hero />
            </div>
            <div className={styles.loaderContainer}>
                <div className={styles.loading}>Caricamento in corso...</div>
            </div>
            <footer className={styles.components}>
                <Footer />
            </footer>
        </div>
    );
}