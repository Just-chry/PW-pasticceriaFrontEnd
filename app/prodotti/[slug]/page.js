"use client"; // Assicurati che questo sia un Client Component

import { useEffect, useState } from 'react';
import addMinutes from 'date-fns/addMinutes';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import isSameMinute from 'date-fns/isSameMinute';
import getDay from 'date-fns/getDay';
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
          prezzo: '28 euro', 
          descrizione: 'Una crostata fresca e colorata, preparata con una base croccante di pasta frolla fatta in casa e farcita con una crema pasticcera vellutata. Decorata con un mix di frutta di stagione, come fragole, kiwi, mirtilli e pesche, per un sapore fresco e naturale. Ideale per chi cerca un dolce leggero e delizioso, perfetto per ogni occasione. Ingredienti: farina, burro, zucchero, uova, frutta fresca di stagione, crema pasticcera.' 
        },
        { 
          slug: 'millefoglie', 
          nome: 'Millefoglie', 
          prezzo: '17.50 euro', 
          descrizione: 'Un dolce classico e sofisticato, composto da strati croccanti di pasta sfoglia che si alternano a una delicata crema chantilly, realizzata con panna fresca e vaniglia. Questo dessert si distingue per la sua leggerezza e la combinazione di consistenze perfette. Ingredienti: farina, burro, zucchero, panna fresca, vaniglia.' 
        },

        { 
          slug: 'redtorta', 
          nome: 'Redtorta', 
          prezzo: '21 euro', 
          descrizione: 'Un dolce classico e sofisticato, composto da strati croccanti di pasta sfoglia che si alternano a una delicata crema chantilly, realizzata con panna fresca e vaniglia. Questo dessert si distingue per la sua leggerezza e la combinazione di consistenze perfette. Ingredienti: farina, burro, zucchero, panna fresca, vaniglia.' 
        },

        { 
          slug: 'tiramisu', 
          nome: 'Tiramisù', 
          prezzo: '24 euro', 
          descrizione: 'Un dolce classico e sofisticato, composto da strati croccanti di pasta sfoglia che si alternano a una delicata crema chantilly, realizzata con panna fresca e vaniglia. Questo dessert si distingue per la sua leggerezza e la combinazione di consistenze perfette. Ingredienti: farina, burro, zucchero, panna fresca, vaniglia.' 
        },

        { 
          slug: 'torta-sacker', 
          nome: 'Torta Sacker', 
          prezzo: '30 euro', 
          descrizione: 'Un dolce classico e sofisticato, composto da strati croccanti di pasta sfoglia che si alternano a una delicata crema chantilly, realizzata con panna fresca e vaniglia. Questo dessert si distingue per la sua leggerezza e la combinazione di consistenze perfette. Ingredienti: farina, burro, zucchero, panna fresca, vaniglia.' 
        },

        { 
          slug: 'torta-margherita', 
          nome: 'Torta Margherita', 
          prezzo: '11 euro', 
          descrizione: 'Un dolce classico e sofisticato, composto da strati croccanti di pasta sfoglia che si alternano a una delicata crema chantilly, realizzata con panna fresca e vaniglia. Questo dessert si distingue per la sua leggerezza e la combinazione di consistenze perfette. Ingredienti: farina, burro, zucchero, panna fresca, vaniglia.' 
        },

        { 
          slug: 'torta-yogurt', 
          nome: 'Torta Yogurt', 
          prezzo: '15 euro', 
          descrizione: 'Un dolce classico e sofisticato, composto da strati croccanti di pasta sfoglia che si alternano a una delicata crema chantilly, realizzata con panna fresca e vaniglia. Questo dessert si distingue per la sua leggerezza e la combinazione di consistenze perfette. Ingredienti: farina, burro, zucchero, panna fresca, vaniglia.' 
        },
        
        




        // altri prodotti...
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

  // Gestisci il nome dell'immagine con il formato corretto (ad esempio, rimuovi i trattini dallo slug per il nome dell'immagine)
  const nomeImmagine = prodotto.slug.replace(/-/g, '') + '.png';

  return (
    <div className={styles.prodottoContainer}>
      <h1 className={styles.prodottoTitle}>{prodotto.nome}</h1>
      <p className={styles.prodottoDescription}>{prodotto.descrizione}</p>
      <p className={styles.prodottoPrice}><strong>Prezzo:</strong> {prodotto.prezzo}</p>
      <div className={styles.prodottoImageWrapper}>
        {/* Assicurati che il nome dell'immagine sia coerente con il formato delle immagini */}
        <img src={`/images/${nomeImmagine}`} alt={prodotto.nome} className={styles.prodottoImage} />
      </div>

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

      <button className={styles.prodottoButton}>Ordina ora</button>
    </div>
  );
}
