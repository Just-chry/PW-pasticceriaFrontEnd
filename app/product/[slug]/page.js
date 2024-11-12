"use client";

import { useEffect, useState } from 'react';
import addMinutes from 'date-fns/addMinutes';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import isSameMinute from 'date-fns/isSameMinute';
import getDay from 'date-fns/getDay';

import Header from '@/components/header';
import Hero from '@/components/hero';
import Footer from '@/components/footer';

import styles from './page.module.css';

// Usa React.use() per gestire i parametri asincroni
export default function Prodotto({ params }) {
  const [slug, setSlug] = useState(null); // Stato per memorizzare il valore dello slug

  useEffect(() => {
    // React.use() per sbloccare params che è una Promise
    if (params) {
      params.then((resolvedParams) => {
        setSlug(resolvedParams.slug);
      });
    }
  }, [params]); // Effettua l'aggiornamento ogni volta che params cambia

  const [prodotto, setProdotto] = useState(null);
  const [dataRitiro, setDataRitiro] = useState("");
  const [orarioRitiro, setOrarioRitiro] = useState("");
  const [orariDisponibili, setOrariDisponibili] = useState([]);
  const [negozioChiuso, setNegozioChiuso] = useState(false);

  const ordiniEsistenti = [
    { data: new Date(2023, 11, 18, 10, 0) },
    { data: new Date(2023, 11, 18, 10, 10) }
  ];

  useEffect(() => {
    if (slug) {
      const prodotti = [
        {
          slug: 'crostata-di-frutta',
          nome: 'Crostata di Frutta',
          prezzo: '28',
          ingredienti: 'farina, burro, zucchero, uova, frutta fresca di stagione, crema pasticcera (latte, uova, zucchero, amido di mais, vaniglia).',
          allergeni: '',
          descrizione: 'La Crostata di Frutta è un dessert raffinato e fresco, ideale per ogni stagione. La base è una croccante pasta frolla, preparata artigianalmente con burro di alta qualità, farina selezionata e zucchero. La farcitura consiste in una crema pasticcera vellutata, preparata con uova fresche e vaniglia, che bilancia perfettamente la dolcezza della frutta fresca di stagione. Il topping di fragole, kiwi, mirtilli e pesche, scelto per la sua naturalezza e freschezza, arricchisce il piatto con colori vivaci e sapori equilibrati. Perfetta per chi cerca un dolce leggero ma ricco di gusto.'
        },
        {
          slug: 'millefoglie',
          nome: 'Millefoglie',
          prezzo: '17.50',
          ingredienti: 'farina, burro, zucchero, panna fresca, vaniglia, amido di mais.',
          allergeni: '',
          descrizione: 'La Millefoglie è un dolce classico e intramontabile, composto da sottili strati di pasta sfoglia dorata e croccante, alternati a una crema chantilly morbida e vellutata, fatta con panna fresca e vaniglia. La leggera croccantezza della sfoglia si fonde armoniosamente con la delicatezza della crema, creando un\'esperienza gustativa perfetta. Ogni boccone regala una combinazione ideale di consistenze e sapori, reso ancora più irresistibile da un tocco di zucchero a velo.'
        },
        {
          slug: 'redtorta',
          nome: 'Redtorta',
          prezzo: '21',
          ingredienti: 'farina, burro, zucchero, panna fresca, vaniglia, amido di mais.',
          allergeni: '',
          descrizione: 'La Redtorta è un dessert sofisticato che unisce la leggerezza della crema chantilly alla croccantezza della pasta sfoglia. La sua caratteristica distintiva è il colore intenso, che proviene dalla presenza di ingredienti freschi e naturali, che esaltano la sua estetica e il suo gusto. La crema chantilly, realizzata con panna fresca e una leggera infusione di vaniglia, si alterna a strati sottili di pasta sfoglia, creando una texture croccante ma delicata al palato. Questo dolce è perfetto per chi cerca un dessert elegante e dal sapore deciso.'
        },
        {
          slug: 'tiramisu',
          nome: 'Tiramisù',
          prezzo: '24',
          ingredienti: 'savoiardi (farina, zucchero, uova), mascarpone, panna fresca, caffè espresso, zucchero, cacao amaro, liquore (opzionale).',
          allergeni: '',
          descrizione: 'Il Tiramisù è un dolce italiano iconico che unisce la delicatezza del mascarpone e il caffè espresso forte e aromatico. I savoiardi, imbevuti nel caffè e nel liquore, si alternano a una morbida crema di mascarpone e panna fresca, creando un contrasto di sapori e consistenze unico. Il tutto è arricchito da una spolverata di cacao amaro, che dona il tocco finale di raffinatezza e contrasto. La sua consistenza soffice e cremosa e il sapore avvolgente lo rendono perfetto per ogni occasione speciale.'
        },
        {
          slug: 'torta-sacker',
          nome: 'Torta Sacker',
          prezzo: '30',
          ingredienti: 'farina, burro, zucchero, uova, cioccolato fondente, crema di albicocca, panna fresca.',
          allergeni: '',
          descrizione: 'La Torta Sacker è un capolavoro della pasticceria, ricca di sapori intensi e decisi. La base è composta da un pan di spagna al cioccolato fondente, morbido e umido, che si sposa perfettamente con una crema al cioccolato ricca e vellutata. Un sottile strato di gelatina di albicocca aggiunge una nota fruttata e contrastante, completando il tutto con una copertura di cioccolato fondente che dona una lucentezza e un sapore deciso. Questo dolce è ideale per gli amanti del cioccolato e per chi cerca un dessert ricco e indulgente.'
        },
        {
          slug: 'torta-margherita',
          nome: 'Torta Margherita',
          prezzo: '11',
          ingredienti: 'farina, burro, zucchero, uova, vaniglia, lievito.',
          allergeni: '',
          descrizione: 'La Torta Margherita è un dolce semplice e genuino, ma ricco di sapore. La sua consistenza soffice e umida è il risultato dell\'incontro tra farina, zucchero e uova fresche, che, lavorati con cura, creano una base leggera e fragrante. La torta è arricchita da un delicato profumo di vaniglia, che la rende ideale per accompagnare una tazza di tè o caffè. Perfetta per chi cerca un dolce classico e non troppo dolce, ma altrettanto goloso.'
        },
        {
          slug: 'torta-yogurt',
          nome: 'Torta Yogurt',
          prezzo: '15',
          ingredienti: 'farina, zucchero, yogurt intero, uova, burro, lievito, vaniglia.',
          allergeni: '',
          descrizione: 'La Torta Yogurt è un dolce fresco e leggero, ideale per chi cerca una dolcezza naturale e non eccessivamente zuccherata. La base soffice di questa torta è preparata con yogurt intero, che dona una consistenza umida e morbida, mentre il suo sapore delicato si esalta con una leggera infusione di vaniglia. Questa torta è perfetta per le occasioni in cui si desidera un dessert semplice ma raffinato, che piacerà a tutti grazie alla sua freschezza.'
        },
      ];


      const prodottoTrovato = prodotti.find((p) => p.slug === slug);
      setProdotto(prodottoTrovato);
    }
  }, [slug]); // Carica il prodotto solo quando lo slug cambia

  useEffect(() => {
    if (dataRitiro) {
      const giornoSelezionato = new Date(dataRitiro);
      const dayOfWeek = getDay(giornoSelezionato);
      let orariGenerati = [];

      let orarioApertura;
      let orarioChiusura;

      if (dayOfWeek === 0) {
        orarioApertura = [new Date(giornoSelezionato).setHours(9, 0, 0, 0), new Date(giornoSelezionato).setHours(15, 0, 0, 0)];
        orarioChiusura = [new Date(giornoSelezionato).setHours(13, 0, 0, 0), new Date(giornoSelezionato).setHours(19, 0, 0, 0)];
      } else if (dayOfWeek >= 2 && dayOfWeek <= 5) {
        orarioApertura = [new Date(giornoSelezionato).setHours(8, 30, 0, 0)];
        orarioChiusura = [new Date(giornoSelezionato).setHours(19, 0, 0, 0)];
      } else if (dayOfWeek === 6) {
        orarioApertura = [new Date(giornoSelezionato).setHours(9, 0, 0, 0)];
        orarioChiusura = [new Date(giornoSelezionato).setHours(19, 0, 0, 0)];
      } else {
        setOrariDisponibili([]);
        setNegozioChiuso(true);
        return;
      }

      setNegozioChiuso(false);

      orarioApertura.forEach((apertura, index) => {
        const chiusura = orarioChiusura[index];
        let orarioCorrente = new Date(apertura);

        while (orarioCorrente < chiusura) {
          const nuovoOrario = new Date(orarioCorrente);
          const orarioOccupato = ordiniEsistenti.some((ordine) =>
            isSameDay(ordine.data, nuovoOrario) && isSameMinute(ordine.data, nuovoOrario)
          );

          if (!orarioOccupato) {
            orariGenerati.push(nuovoOrario);
          }

          orarioCorrente = addMinutes(orarioCorrente, 10);
        }
      });

      setOrariDisponibili(orariGenerati);
    }
  }, [dataRitiro]);

  const handleDataChange = (e) => {
    setDataRitiro(e.target.value);
    setOrarioRitiro("");
  };

  const handleOrarioChange = (e) => {
    setOrarioRitiro(e.target.value);
  };

  if (!prodotto) {
    return <p className={styles.loadingMessage}>Caricamento in corso...</p>;
  }

  const nomeImmagine = prodotto.slug.replace(/-/g, '') + '.png';

  return (
    <div>
      <header>
        <Header />
      </header>
      <Hero />
      <div className={styles.productContainer}>
        <div className={styles.productImageWrapper}>
          <img src={`/images/${nomeImmagine}`} alt={prodotto.nome} width={800} height={600} className={styles.productImage} />
        </div>
        <div className={styles.productDetails}>
          <div className={styles.titleAndPrice}>
            <h1 className={styles.productTitle}>{prodotto.nome}</h1>
            <p className={styles.productPrice}>{prodotto.prezzo}€</p>
          </div>
          <div className={styles.ingredientsAndAllergens}>
            <p className={styles.productingredients}><span>Ingredienti:</span> {prodotto.ingredienti}</p>
            <p className={styles.productAllergens}><span>Allergeni:</span> {prodotto.allergeni}</p>
          </div>
          <div className={styles.quantityDateAndOrder}>
            {/* <div className={styles.quantityControls} onQuantityChange={handleQuantityChange}>
              <button onClick={() => onQuantityChange(product.id, -1)} className={styles.quantityButton}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width='24' height='24' fill="#F3BC9F"><path d="M20 11H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1Z"></path></svg></button>
              <span className={styles.quantityDisplay}>{product.quantity}</span>
              <button onClick={() => onQuantityChange(product.id, 1)} className={styles.quantityButton}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" width='24' height='24' fill="#F3BC9F"><path d="M450 210H270V30a30 30 0 1 0-60 0v180H30a30 30 0 1 0 0 60h180v180a30 30 0 1 0 60 0V270h180a30 30 0 1 0 0-60Z"></path></svg></button>
            </div> */}
            <div className={styles.ritiroSection}>
              <label className={styles.ritiroLabel}>Seleziona data di ritiro:</label>
              <input type="date" value={dataRitiro} onChange={handleDataChange} className={styles.ritiroDate} />

              {negozioChiuso && (
                <p className={styles.negocioClosedMessage}>Il negozio è chiuso il lunedì. Seleziona un altro giorno.</p>
              )}

              {dataRitiro && orariDisponibili.length > 0 && !negozioChiuso && (
                <>
                  <label className={styles.ritiroLabel}>Seleziona orario di ritiro:</label>
                  <select value={orarioRitiro} onChange={handleOrarioChange} className={styles.ritiroTime}>
                    <option value="">Seleziona un orario</option>
                    {orariDisponibili.map((orario, index) => (
                      <option key={index} value={orario}>
                        {format(orario, "HH:mm")}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>
            <button className={styles.productButton}>Aggiungi al carrello <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width='30' height='30' fill="#000"><path d="M5 8h16l-2 7H7L5 8z" fill="#F3BC9F"></path><path d="M9 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM17 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM21 7H5.75l-.79-2.77A1 1 0 0 0 4 3.5H3c-.55 0-1 .45-1 1s.45 1 1 1h.25l2.48 8.69A2.5 2.5 0 0 0 8.13 16h9.74a2.5 2.5 0 0 0 2.4-1.81l1.69-5.91A1 1 0 0 0 21 7Zm-2.65 6.64a.5.5 0 0 1-.48.36H8.13a.5.5 0 0 1-.48-.36L6.33 9h13.35l-1.33 4.64Z"></path></svg></button>
          </div>
        </div>
      </div>
      <div className={styles.containerDescription}>
        <p className={styles.productDescription}>{prodotto.descrizione}</p>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
