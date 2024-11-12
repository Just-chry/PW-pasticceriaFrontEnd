'use client';

import { useParams, useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaHandHoldingUsd } from "react-icons/fa";
import { FaCalendarDays, FaClock } from "react-icons/fa6";
import { GiCakeSlice } from "react-icons/gi";

import Header from '@/components/header';
import Hero from '@/components/hero';
import Footer from '@/components/footer';

import styles from './page.module.css';

export default function Products() {

  const { slug } = useParams();

  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    if (containerRef.current) {
      setSteps(Array.from(containerRef.current.querySelectorAll(`.${styles.feature}`)));
    }
  }, [containerRef]);

  const handleScroll = (direction) => {
    if (!steps || steps.length === 0) return;

    let newIndex = currentIndex;

    if (direction === 'right') {
      newIndex = Math.min(currentIndex + 1, steps.length - 1);
    } else {
      newIndex = Math.max(currentIndex - 1, 0);
    }

    setCurrentIndex(newIndex);
    steps[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Funzione per ottenere i prodotti dal backend
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/products/${slug}`, {
        method: "GET",
            credentials: 'include',
      });

      if (!response.ok) {
        throw new Error("Errore durante il recupero dei prodotti. Riprova più tardi.");
      }

      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [slug]);

// Funzione per gestire il click del bottone "Ordina ora"
const handleOrderClick = (productName) => {
  const slug = generateSlug(productName); // Genera lo slug
  router.push(`/prodotti/${slug}`);
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
        <div className={styles.textContainer}>
          <h2 className={styles.subheading}>Aperti dal martedì alla domenica</h2>
          <h1 className={styles.mainHeading}>Pasticceria <span className={styles.highlight}>C'est La Vie</span></h1>
          <p className={styles.description}>Scopri le nostre delizie artigianali, preparate con passione e ingredienti di alta qualità.</p>
        </div>
        <section className={styles.featureSection} ref={containerRef}>
          <button
              className={styles.arrowButtonLeft}
              onClick={() => handleScroll('left')}
              disabled={currentIndex === 0}>
            <FaArrowLeft />
          </button>
          <div className={styles.featuresContainer}>
            <div className={styles.feature}>
              <GiCakeSlice className={styles.featureIcon} />
              <h3>SCELTA PRODOTTO</h3>
              <p>Scegli tra una selezione di dolci di alta qualità e clicca su "Ordina ora" per procedere con il tuo ordine.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.icons}>
                <FaCalendarDays className={styles.featureIcon} />
                <FaClock className={styles.featureIcon} />
              </div>
              <h3>DATA E ORARIO</h3>
              <p>Dopo aver selezionato il prodotto, scegli la data e l'orario per il ritiro presso il nostro negozio.</p>
            </div>
            <div className={styles.feature}>
              <FaHandHoldingUsd className={styles.featureIcon} />
              <h3>METODO PAGAMENTO</h3>
              <p>I clienti effettueranno il pagamento direttamente in negozio al momento del ritiro dell'ordine.</p>
            </div>
          </div>
          <button
              className={styles.arrowButtonRight}
              onClick={() => handleScroll('right')}
              disabled={currentIndex === steps.length - 1}>
            <FaArrowRight />
          </button>
        </section>

        <section className={styles.bestItemsSection}>
          <h2>I nostri prodotti</h2>
          <div className={styles.items}>
            {error ? (
                <div>
                  <p>Errore durante il caricamento dei prodotti. Riprova più tardi.</p>
                  <button onClick={fetchProducts}>Riprova</button>
                </div>
            ) : loading ? (
                <div>Caricamento in corso...</div>
            ) : (
                <div>
                  {products.length === 0 ? (
                      <p>Prodotti terminati. Torna presto per nuovi dolci!</p>
                  ) : (
                      products.map((product, index) => (
                          <div key={index} className={styles.item} onClick={() => handleOrderClick(product.name)}>
                            <img src={product.image} alt={product.name} width='400' height='300' />
                            <div className={styles.itemDetails}>
                              <div className={styles.textDetails}>
                                <p>{product.name}</p>
                                <span>{product.price}€</span>
                              </div>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width='40' height='40' fill="#000">
                                <path d="M5 8h16l-2 7H7L5 8z" fill="#F3BC9F"></path>
                                <path d="M9 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM17 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM21 7H5.75l-.79-2.77A1 1 0 0 0 4 3.5H3c-.55 0-1 .45-1 1s.45 1 1 1h.25l2.48 8.69A2.5 2.5 0 0 0 8.13 16h9.74a2.5 2.5 0 0 0 2.4-1.81l1.69-5.91A1 1 0 0 0 21 7Zm-2.65 6.64a.5.5 0 0 1-.48.36H8.13a.5.5 0 0 1-.48-.36L6.33 9h13.35l-1.33 4.64Z"></path>
                              </svg>
                            </div>
                          </div>
                      ))
                  )}
                </div>
            )}
          </div>
        </section>

      </main >
      <footer>
        <Footer />
      </footer>
    </div >
);
}