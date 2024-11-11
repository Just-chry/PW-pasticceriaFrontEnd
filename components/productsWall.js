import Image from "next/image";
import styles from "@/components/productsWall.module.css";

const productImages = [
    {
        src: "/images/tortaTiramisù.png",
        alt: "Tiramisù",
        label: "Tiramisù",
        link: "/products#tortaTiramisù",
    },
    {
        src: "/images/CrostataAllaMarmellata.png",
        alt: "Crostata alla Marmellata",
        label: "Crostata alla Marmellata",
        link: "/products#CrostataAllaMarmellata",
    },
    {
        src: "/images/millefoglie.png",
        alt: "Millefoglie",
        label: "Millefoglie",
        link: "/products#millefoglie",
    },
    {
        src: "/images/tortaChantilly.png",
        alt: "Torta Chantilly",
        label: "Torta Chantilly",
        link: "/products#tortaChantilly",
    },
    {
        src: "/images/CrostataAlleFragole.png",
        alt: "Crostata alle Fragole",
        label: "Crostata alle Fragole",
        link: "/products#CrostataAlleFragole",
    },
    {
        src: "/images/tortaAlLimone.png",
        alt: "Torta al Limone",
        label: "Torta al Limone",
        link: "/products#tortaAlLimone",
    }
];

export default function ProductsWall() {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>I nostri prodotti</h2>
            <p className={styles.subtitle}>Visita i nostri dolci prodotti</p>
            <div className={styles.wallContainer}>
                {productImages.map((image, index) => (
                    <div key={index} className={styles.imageContainer}>
                        <a href={image.link}>
                            <Image src={image.src} alt={`Product ${index + 1}`} className={styles.image} width={600} height={600} />
                        </a>
                    </div>
                ))}
            </div>
            <a href='/productsCategory' className={styles.buttonSubmitA}>
                <button type="submit" className={styles.buttonSubmit}>Scopri tutti i nostri prodotti</button>
            </a>
        </div>
    );
}
