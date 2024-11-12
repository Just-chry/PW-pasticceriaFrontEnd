import Image from "next/image";
import styles from "@/components/productsWall.module.css";

const productImages = [
    {
        src: "/images/raspberry.png",
        alt: "Macaron Raspberry",
        label: "Macaron Raspberry",
        link: "/products/dcda6f2d-a0fe-11ef-b7f2-489ebd4db940",
    },
    {
        src: "/images/chocolateChip.png",
        alt: "Chocolate Chip Cookie",
        label: "Chocolate Chip Cookie",
        link: "/products/dcdeeff2-a0fe-11ef-b7f2-489ebd4db940",
    },
    {
        src: "/images/blend.png",
        alt: "Mixed Berry Jam",
        label: "Mixed Berry Jam",
        link: "/products/dce3ddbf-a0fe-11ef-b7f2-489ebd4db940",
    },
    {
        src: "/images/almonds.png",
        alt: "Almond Bar",
        label: "Almond Bar",
        link: "/products/dce90d93-a0fe-11ef-b7f2-489ebd4db940",
    },
    {
        src: "/images/Crostatadifrutta.png",
        alt: "Crostata di Frutta",
        label: "Crostata di Frutta",
        link: "/products/2e2b56f3-7e62-4a1d-8e5a-4b35d8a0d4c7",
    },
    {
        src: "/images/coffee.png",
        alt: "Macaron Coffee",
        label: "Macaron Coffee",
        link: "/products/dcda71c1-a0fe-11ef-b7f2-489ebd4db940",
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
