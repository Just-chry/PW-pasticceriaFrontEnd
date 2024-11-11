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
          descrizione: 'La Crostata di Frutta è un dessert raffinato e fresco, ideale per ogni stagione. La base è una croccante pasta frolla, preparata artigianalmente con burro di alta qualità, farina selezionata e zucchero. La farcitura consiste in una crema pasticcera vellutata, preparata con uova fresche e vaniglia, che bilancia perfettamente la dolcezza della frutta fresca di stagione. Il topping di fragole, kiwi, mirtilli e pesche, scelto per la sua naturalezza e freschezza, arricchisce il piatto con colori vivaci e sapori equilibrati. Perfetta per chi cerca un dolce leggero ma ricco di gusto. **Ingredienti:** farina, burro, zucchero, uova, frutta fresca di stagione, crema pasticcera (latte, uova, zucchero, amido di mais, vaniglia).'
        },
        { 
          slug: 'millefoglie', 
          nome: 'Millefoglie', 
          prezzo: '17.50 euro', 
          descrizione: 'La Millefoglie è un dolce classico e intramontabile, composto da sottili strati di pasta sfoglia dorata e croccante, alternati a una crema chantilly morbida e vellutata, fatta con panna fresca e vaniglia. La leggera croccantezza della sfoglia si fonde armoniosamente con la delicatezza della crema, creando un\'esperienza gustativa perfetta. Ogni boccone regala una combinazione ideale di consistenze e sapori, reso ancora più irresistibile da un tocco di zucchero a velo. **Ingredienti:** farina, burro, zucchero, panna fresca, vaniglia, amido di mais.'
        },
        { 
          slug: 'redtorta', 
          nome: 'Redtorta', 
          prezzo: '21 euro', 
          descrizione: 'La Redtorta è un dessert sofisticato che unisce la leggerezza della crema chantilly alla croccantezza della pasta sfoglia. La sua caratteristica distintiva è il colore intenso, che proviene dalla presenza di ingredienti freschi e naturali, che esaltano la sua estetica e il suo gusto. La crema chantilly, realizzata con panna fresca e una leggera infusione di vaniglia, si alterna a strati sottili di pasta sfoglia, creando una texture croccante ma delicata al palato. Questo dolce è perfetto per chi cerca un dessert elegante e dal sapore deciso. **Ingredienti:** farina, burro, zucchero, panna fresca, vaniglia, amido di mais.'
        },
        { 
          slug: 'tiramisu', 
          nome: 'Tiramisù', 
          prezzo: '24 euro', 
          descrizione: 'Il Tiramisù è un dolce italiano iconico che unisce la delicatezza del mascarpone e il caffè espresso forte e aromatico. I savoiardi, imbevuti nel caffè e nel liquore, si alternano a una morbida crema di mascarpone e panna fresca, creando un contrasto di sapori e consistenze unico. Il tutto è arricchito da una spolverata di cacao amaro, che dona il tocco finale di raffinatezza e contrasto. La sua consistenza soffice e cremosa e il sapore avvolgente lo rendono perfetto per ogni occasione speciale. **Ingredienti:** savoiardi (farina, zucchero, uova), mascarpone, panna fresca, caffè espresso, zucchero, cacao amaro, liquore (opzionale).'
        },
        { 
          slug: 'torta-sacker', 
          nome: 'Torta Sacker', 
          prezzo: '30 euro', 
          descrizione: 'La Torta Sacker è un capolavoro della pasticceria, ricca di sapori intensi e decisi. La base è composta da un pan di spagna al cioccolato fondente, morbido e umido, che si sposa perfettamente con una crema al cioccolato ricca e vellutata. Un sottile strato di gelatina di albicocca aggiunge una nota fruttata e contrastante, completando il tutto con una copertura di cioccolato fondente che dona una lucentezza e un sapore deciso. Questo dolce è ideale per gli amanti del cioccolato e per chi cerca un dessert ricco e indulgente. **Ingredienti:** farina, burro, zucchero, uova, cioccolato fondente, crema di albicocca, panna fresca.'
        },
        { 
          slug: 'torta-margherita', 
          nome: 'Torta Margherita', 
          prezzo: '11 euro', 
          descrizione: 'La Torta Margherita è un dolce semplice e genuino, ma ricco di sapore. La sua consistenza soffice e umida è il risultato dell\'incontro tra farina, zucchero e uova fresche, che, lavorati con cura, creano una base leggera e fragrante. La torta è arricchita da un delicato profumo di vaniglia, che la rende ideale per accompagnare una tazza di tè o caffè. Perfetta per chi cerca un dolce classico e non troppo dolce, ma altrettanto goloso. **Ingredienti:** farina, burro, zucchero, uova, vaniglia, lievito.'
        },
        { 
          slug: 'torta-yogurt', 
          nome: 'Torta Yogurt', 
          prezzo: '15 euro', 
          descrizione: 'La Torta Yogurt è un dolce fresco e leggero, ideale per chi cerca una dolcezza naturale e non eccessivamente zuccherata. La base soffice di questa torta è preparata con yogurt intero, che dona una consistenza umida e morbida, mentre il suo sapore delicato si esalta con una leggera infusione di vaniglia. Questa torta è perfetta per le occasioni in cui si desidera un dessert semplice ma raffinato, che piacerà a tutti grazie alla sua freschezza. **Ingredienti:** farina, zucchero, yogurt intero, uova, burro, lievito, vaniglia.'
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
