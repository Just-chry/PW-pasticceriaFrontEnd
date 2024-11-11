'use client'; // Questo dice che il componente è un Client Component

import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Header from '@/components/header';  // Importazione corretta del Header
import Footer from '@/components/footer';  // Importazione corretta del Footer
import Hero from '@/components/hero';

export default function Home() {
  const router = useRouter();

  // Funzione per gestire il click del bottone "Ordina ora"
  const handleOrderClick = (productName) => {
    const slug = generateSlug(productName); // Genera lo slug
    router.push(`/prodotti/${slug}`); // Naviga alla pagina dinamica
  };

  // Funzione per generare lo slug
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-') // Sostituisce gli spazi con trattini
      .replace(/[^\w\-]+/g, '') // Rimuove caratteri speciali
      .replace(/\-\-+/g, '-') // Rimuove trattini consecutivi
      .trim(); // Rimuove spazi extra
  };

  return (
    <div>
      <header>
        <Header />
      </header>
      <Hero />
      <main className={styles.main}>

        {/* Feature Section */}
        <section className={styles.featureSection}>
          <div className={styles.feature}>
            <img src="/images/dolceicon.png" alt="Freshly Baked Icon" className={styles.featureIcon} />
            <h3>SCELTA PRODOTTO</h3>
            <p>Scegli tra una selezione di dolci di alta qualità e clicca su "Ordina ora" per procedere con il tuo ordine.</p>
          </div>
          <div className={styles.feature}>
            <img src="/images/orologio.png" alt="Free Home Delivery Icon" className={styles.featureIcon} />
            <h3>DATA E ORARIO</h3>
            <p>Dopo aver selezionato il prodotto, scegli la data e l'orario per il ritiro presso il nostro negozio.</p>
          </div>
          <div className={styles.feature}>
            <img src="/images/pagamento.png" alt="5-Star Reviews Icon" className={styles.featureIcon} />
            <h3>METODO PAGAMENTO</h3>
            <p>I clienti effettueranno il pagamento direttamente in negozio al momento del ritiro dell'ordine.</p>
          </div>
        </section>

        {/* Best Fresh Items Section */}
        <section className={styles.bestItemsSection}>
          <h2>I nostri prodotti</h2>
          <div className={styles.items}>
            <div className={styles.item}>
              <img src="/images/crostatadifrutta.png" alt="Crostata di frutta" />
              <p>Crostata di frutta</p>
              <span>28 euro</span>
              <button className={styles.itemButton} onClick={() => handleOrderClick('Crostata di frutta')}>Ordina ora</button>
            </div>
            <div className={styles.item}>
              <img src="/images/millefoglie.png" alt="Millefoglie" />
              <p>Millefoglie</p>
              <span>17.50 euro</span>
              <button className={styles.itemButton} onClick={() => handleOrderClick('Millefoglie')}>Ordina ora</button>
            </div>
            <div className={styles.item}>
              <img src="/images/redtorta.png" alt="Redtorta" />
              <p>Redtorta</p>
              <span>21 euro</span>
              <button className={styles.itemButton} onClick={() => handleOrderClick('Redtorta')}>Ordina ora</button>
            </div>
            <div className={styles.item}>
              <img src="/images/tiramisu.png" alt="Tiramisu" />
              <p>Tiramisu</p>
              <span>24 euro</span>
              <button className={styles.itemButton} onClick={() => handleOrderClick('Tiramisu')}>Ordina ora</button>
            </div>
            <div className={styles.item}>
              <img src="/images/tortasacker.png" alt="Torta Sacker" />
              <p>Torta Sacker</p>
              <span>30 euro</span>
              <button className={styles.itemButton} onClick={() => handleOrderClick('Torta Sacker')}>Ordina ora</button>
            </div>
            <div className={styles.item}>
              <img src="/images/tortamargherita.png" alt="Torta Margherita" />
              <p>Torta Margherita</p>
              <span>11 euro</span>
              <button className={styles.itemButton} onClick={() => handleOrderClick('Torta Margherita')}>Ordina ora</button>
            </div>
            <div className={styles.item}>
              <img src="/images/tortayogurt.png" alt="Torta Yogurt" />
              <p>Torta Yogurt</p>
              <span>15 euro</span>
              <button className={styles.itemButton} onClick={() => handleOrderClick('Torta Yogurt')}>Ordina ora</button>
            </div>
          </div>
        </section>

        <Footer />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
