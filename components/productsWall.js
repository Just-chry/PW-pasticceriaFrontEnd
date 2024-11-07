import Image from "next/image";
import styles from "@/components/productsWall.module.css";

const productImages = [
    "/images/product1.jpg",
    "/images/product2.jpg",
    "/images/product3.jpg",
    "/images/product4.jpg",
    "/images/product5.jpg",
    "/images/product6.jpg",
    // Aggiungi altre immagini se necessario
];

export default function ProductsWall() {
    return (
        <div className={styles.wallContainer}>
            {productImages.map((src, index) => (
                <div key={index} className={styles.imageContainer}>
                    <Image src={src} alt={`Product ${index + 1}`} className={styles.image} width={300} height={300} />
                </div>
            ))}
        </div>
    );
}
