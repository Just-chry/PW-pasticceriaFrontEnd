import Header from '@/components/header';
import Hero from '@/components/hero';
import Categoria from '@/components/categoria';
import Footer from '@/components/footer';

import styles from '@/app/productsCategory/page.module.css';

export default function ProductsCategory() {
    const categorie = [
        { titolo: 'Macarons', immagine: '/images/macarons.png', link: '/productsCategory/macarons', slug: 'macarons' },
        { titolo: 'Biscotti', immagine: '/images/cookies.png', link: '/productsCategory/cookies', slug: 'cookies' },
        { titolo: 'Confetture o Marmellate', immagine: '/images/jams.png', link: '/productsCategory/jams', slug: 'jams' },
        { titolo: 'Tavolette di Cioccolato', immagine: '/images/bars.png', link: '/productsCategory/bars', slug: 'bars' },
        { titolo: 'Torte', immagine: '/images/cakes.png', link: '/productsCategory/cakes', slug: 'cakes' }
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
                        <h2 className={styles.subheading}>Aperti dal martedì alla domenica</h2>
                        <h1 className={styles.mainHeading}>Pasticceria <span className={styles.highlight}>C'est la Vie</span></h1>
                        <p className={styles.description}>Scopri le nostre delizie artigianali, preparate con passione e ingredienti di alta qualità.</p>
                    </div>
                    <div className={styles.title}>
                        <h2>Le nostre categorie</h2>
                        <div className={styles.grid}>
                            {categorie.map((categoria, index) => (
                                <Categoria key={index} {...categoria} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}
