'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaHandHoldingUsd } from "react-icons/fa";
import { FaCalendarDays, FaClock } from "react-icons/fa6";
import { GiCakeSlice } from "react-icons/gi";

import Header from '@/components/header';
import Hero from '@/components/hero';
import Footer from '@/components/footer';

import styles from './page.module.css';

export default function Products() {
  const router = useRouter();

  const handleOrderClick = (productName) => {
    const slug = generateSlug(productName);
    router.push(`/prodotti/${slug}`);
  };

  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    if (containerRef.current) {
      setSteps(containerRef.current.querySelectorAll(`.${styles.feature}`));
    }
  }, [containerRef]);

  const handleScroll = (direction) => {
    if (steps.length === 0) return;

    let newIndex = currentIndex;

    if (direction === 'right') {
      newIndex = Math.min(currentIndex + 1, steps.length - 1);
    } else {
      newIndex = Math.max(currentIndex - 1, 0);
    }

    setCurrentIndex(newIndex);
    steps[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .trim();
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
            <div className={styles.item} onClick={() => handleOrderClick('Crostata di frutta')}>
              <img src="/images/crostatadifrutta.png" alt="Crostata di frutta" width='400' height='300' />
              <div className={styles.itemDetails}>
                <div className={styles.textDetails}>
                  <p>Crostata di frutta</p>
                  <span>28 euro</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width='40' height='40' fill="#000"><path d="M5 8h16l-2 7H7L5 8z" fill="#F3BC9F"></path><path d="M9 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM17 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM21 7H5.75l-.79-2.77A1 1 0 0 0 4 3.5H3c-.55 0-1 .45-1 1s.45 1 1 1h.25l2.48 8.69A2.5 2.5 0 0 0 8.13 16h9.74a2.5 2.5 0 0 0 2.4-1.81l1.69-5.91A1 1 0 0 0 21 7Zm-2.65 6.64a.5.5 0 0 1-.48.36H8.13a.5.5 0 0 1-.48-.36L6.33 9h13.35l-1.33 4.64Z"></path></svg>
              </div>
            </div>
            <div className={styles.item} onClick={() => handleOrderClick('Millefoglie')}>
              <img src="/images/millefoglie.png" alt="Millefoglie" width='400' height='300' />
              <div className={styles.itemDetails}>
                <div className={styles.textDetails}>
                  <p>Millefoglie</p>
                  <span>17.50 euro</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width='40' height='40' fill="#000"><path d="M5 8h16l-2 7H7L5 8z" fill="#F3BC9F"></path><path d="M9 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM17 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM21 7H5.75l-.79-2.77A1 1 0 0 0 4 3.5H3c-.55 0-1 .45-1 1s.45 1 1 1h.25l2.48 8.69A2.5 2.5 0 0 0 8.13 16h9.74a2.5 2.5 0 0 0 2.4-1.81l1.69-5.91A1 1 0 0 0 21 7Zm-2.65 6.64a.5.5 0 0 1-.48.36H8.13a.5.5 0 0 1-.48-.36L6.33 9h13.35l-1.33 4.64Z"></path></svg>
              </div>
            </div>
            <div className={styles.item} onClick={() => handleOrderClick('Redtorta')}>
              <img src="/images/redtorta.png" alt="Redtorta" width='400' height='300' />
              <div className={styles.itemDetails}>
                <div className={styles.textDetails}>
                  <p>Redtorta</p>
                  <span>21 euro</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width='40' height='40' fill="#000"><path d="M5 8h16l-2 7H7L5 8z" fill="#F3BC9F"></path><path d="M9 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM17 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM21 7H5.75l-.79-2.77A1 1 0 0 0 4 3.5H3c-.55 0-1 .45-1 1s.45 1 1 1h.25l2.48 8.69A2.5 2.5 0 0 0 8.13 16h9.74a2.5 2.5 0 0 0 2.4-1.81l1.69-5.91A1 1 0 0 0 21 7Zm-2.65 6.64a.5.5 0 0 1-.48.36H8.13a.5.5 0 0 1-.48-.36L6.33 9h13.35l-1.33 4.64Z"></path></svg>
              </div>
            </div>
            <div className={styles.item} onClick={() => handleOrderClick('Tiramisu')}>
              <img src="/images/tiramisu.png" alt="Tiramisu" width='400' height='300' />
              <p>Tiramisu</p>
              <span>24 euro</span>
            </div>
            <div className={styles.item} onClick={() => handleOrderClick('Torta Sacker')}>
              <img src="/images/tortasacker.png" alt="Torta Sacker" width='400' height='300' />
              <p>Torta Sacker</p>
              <span>30 euro</span>
            </div>
            <div className={styles.item} onClick={() => handleOrderClick('Torta Margherita')}>
              <img src="/images/tortamargherita.png" alt="Torta Margherita" width='400' height='300' />
              <p>Torta Margherita</p>
              <span>11 euro</span>
            </div>
            <div className={styles.item} onClick={() => handleOrderClick('Torta Yogurt')}>
              <img src="/images/tortayogurt.png" alt="Torta Yogurt" width='400' height='300' />
              <p>Torta Yogurt</p>
              <span>15 euro</span>
            </div>
          </div>
        </section >
      </main >
      <footer>
        <Footer />
      </footer>
    </div >
  );
}
