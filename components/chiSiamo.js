import Image from 'next/image';

import chiSiamo from '@/public/images/chiSiamo.png';

import styles from "@/components/chiSiamo.module.css";

export default function ChiSiamo() {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h4 className={styles.subTitle}>Chi siamo</h4>
                <h2 className={styles.title}>Pasticceria C'est la Vie a Varese</h2>
                <p className={styles.paragraph}>
                    Mi chiamo Giacomo Aceti e sono il titolare di C’est la Vie. La mia pasticceria nasce nel 2015 come laboratorio artigianale in via Garibaldi, 5 a Varese e nel 2020 apro un punto vendita espositivo per la vendita diretta in Via Carlo Croce, 4.
                    Nel laboratorio produciamo tutti i prodotti messi a disposizione del pubblico nella boutique, con una continua ricerca di materie prime di alta qualità e una lavorazione che unisce tradizione e innovazione.
                    A fare la differenza è anche la location di Via Carlo Croce. Già dall’esterno è possibile ammirare una grande vetrata da cui poter apprezzare i nostri deliziosi prodotti. Una location elegante e raffinata. Una volta entrati vi perderete in meravigliosi profumi e colori capaci di sorprendere ed incuriosire.
                </p>
            </div>
            <div className={styles.imageContainer}>
                <Image
                    src={chiSiamo}
                    alt="Immagine rappresentativa della pasticceria"
                    className={styles.image}
                />
            </div>
        </div>
    );
}
