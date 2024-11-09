'use client'

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from 'next/image';

import styles from '@/components/sliderTorte.module.css';

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

export default function TorteSlider() {
    return (
        <div className={styles.sliderContainer}>
            <h2 className={styles.title}>Le nostre torte</h2>
            <p className={styles.subtitle}>Dolci esperienze per festeggiare i momenti importanti</p>
            <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={10}
                slidesPerView={2}
                slidesPerGroup={2}
                loop={true}
                navigation={true}
                autoplay={{ delay: 3000 }}
                speed={2500}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                    },
                    768: {
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                    },
                    1440: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                    },
                }}
            >
                {cakes.map((cake, index) => (
                    <SwiperSlide key={index}>
                        <div className={styles.slide}>
                            <Image
                                src={cake.src}
                                alt={cake.alt}
                                width={600}
                                height={450}
                                className={styles.image}
                            />
                            <div className={styles.caption}>
                                <h3>{cake.label}</h3>
                                <a href={cake.link} className={styles.ctaButton}>Scopri di più</a>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
