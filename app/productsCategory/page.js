import Header from '@/components/header';
import Hero from '@/components/hero';
import Categoria from '@/components/categoria';
import Footer from '@/components/footer';
import styles from '@/app/productsCategory/page.module.css';

export default function ProductsCategory() {
    const categorie = [
        { titolo: 'Macarons', immagine: '/images/macarons.png', link: '/products/macarons', slug: 'macarons' },
        { titolo: 'Cookies', immagine: '/images/cookies.png', link: '/products/cookies', slug: 'cookies' },
        { titolo: 'Jams', immagine: '/images/jams.png', link: '/products/jams', slug: 'jams' },
        { titolo: 'Bars', immagine: '/images/bars.png', link: '/products/bars', slug: 'bars' },
        { titolo: 'Cakes', immagine: '/images/cakes.png', link: '/products/cakes', slug: 'cakes' }
    ];

    return (
        <div>
            <header>
                <Header />
            </header>
            <Hero />
            <section>
                <div className={styles.categorieContainer}>
                    <div className={styles.textContainer}>
                        <h1>I nostri prodotti</h1>
                        <h2>Visita e acquista i nostri prodotti</h2>
                        <p>Scegli tra la selezione di dolci e ordina per il ritiro in negozio</p>
                    </div>
                    <div className={styles.grid}>
                        {categorie.map((categoria, index) => (
                            <Categoria key={index} {...categoria} />
                        ))}
                    </div>
                </div>
            </section>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}
