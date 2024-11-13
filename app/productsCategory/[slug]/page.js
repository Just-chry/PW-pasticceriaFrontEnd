'use client';

import { useParams, useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaHandHoldingUsd } from "react-icons/fa";
import { FaCalendarDays, FaClock } from "react-icons/fa6";
import { GiCakeSlice } from "react-icons/gi";

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
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:8080/products/category?category=${slug}`, {
          method: "GET",
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error("Errore durante il recupero dei prodotti. Riprova più tardi.");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  const handleOrderClick = (productId) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div>
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
              <p>Scegli tra una selezione di dolci di alta qualità e clicca sul prodotto per procedere con il tuo ordine.</p>
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
          {error ? (
            <div>
              <p className={styles.centerdText}>Errore durante il caricamento dei prodotti. Riprova più tardi.</p>
            </div>
          ) : loading ? (
            <div className={styles.centerdText}>Caricamento in corso...</div>
          ) : (
            <div className={styles.items}>
              {products.length === 0 ? (
                <p className={styles.centerdText}>Prodotti terminati. Torna presto per nuovi dolci!</p>
              ) : (
                products.map((product, index) => (
                  <div key={index} className={styles.item} onClick={() => handleOrderClick(product.id)}>
                    <img src={product.image} alt={product.name} width='400' height='300' />
                    <div className={styles.itemDetails}>
                      <div className={styles.textDetails}>
                        <p>{product.name}</p>
                        <span>{product.price}€</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </section>

      </main >
      <footer>
        <Footer />
      </footer>
    </div >
  );
}