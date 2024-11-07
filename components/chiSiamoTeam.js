import Image from 'next/image';

import chiSiamoTeam from '@/public/images/chiSiamoTeam.png';

import styles from "@/components/chiSiamoTeam.module.css";

export default function ChiSiamoTeam() {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h4 className={styles.subTitle}>Il nostro team</h4>
                <h2 className={styles.title}>Entra a far parte del nostro team</h2>
                <p className={styles.paragraph}>
                    Il mio è un giovanissimo team che guido con entusiasmo e passione. Una passione che porto avanti da 16 anni, iniziata con un percorso nella scuola alberghiera di Stresa e concluso con il corso superiore di pasticceria di Alma.
                    Accanto a me, uno staff giovane e preparato. Formo personalmente il mio team trasmettendo valori per me fondamentali in questo lavoro: Divertimento, Passione, Ricercatezza, Innovazione e Attenzione al dettaglio.
                    C’est la Vie è un luogo capace di sorprendere per l’amore trasmesso attraverso l’arte della pasticceria, ma anche per l’accoglienza informale: “Ci piace coinvolgere il cliente e trasmettere la nostra passione”.
                </p>
                <a href='/contacts#info'>
                    <button type="submit" className={styles.buttonSubmit}>Contattaci</button>
                </a>
            </div>
            <div className={styles.imageContainer}>
                <Image
                    src={chiSiamoTeam}
                    alt="Immagine rappresentativa della pasticceria"
                    className={styles.image}
                />
            </div>
        </div>
    );
}