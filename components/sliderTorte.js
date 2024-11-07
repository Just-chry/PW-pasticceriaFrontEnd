'use client'

import { useState } from "react";

import Image from "next/image";

import styles from "@/components/sliderTorte.module.css";

const cakes = [
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
];

export default function TorteSlider() {
    const [current, setCurrent] = useState(1);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % cakes.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + cakes.length) % cakes.length);

    return (
        <div className={styles.sliderContainer}>
            <h2 className={styles.title}>Torte Personalizzate</h2>
            <p className={styles.subtitle}>Dolci esperienze per festeggiare i momenti importanti</p>
            <div className={styles.slider}>
                <button onClick={prevSlide} className={styles.arrowLeft}>&#60;</button>
                <div className={styles.slides}>
                    {cakes.map((cake, index) => (
                        <div
                            key={index}
                            className={`${styles.slide} ${index === current ? styles.active : ""}`}
                        >
                            <Image src={cake.src} alt={cake.alt} width={500} height={450} className={styles.image} />
                            {index === current && (
                                <div className={styles.caption}>
                                    <h3>{cake.label}</h3>
                                    <a href={cake.link} className={styles.ctaButton}>Scopri di più</a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <button onClick={nextSlide} className={styles.arrowRight}>&#62;</button>
            </div>
        </div>
    );
}
