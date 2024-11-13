'use client'

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from 'next/image';

import styles from '@/components/sliderCategory.module.css';

const categories = [
    {
        src: "/images/macarons.png",
        alt: "Macarons",
        label: "Macarons",
        link: "/productsCategory/macarons",
    },
    {
        src: "/images/cookies.png",
        alt: "Biscotti",
        label: "Biscotti",
        link: "/productsCategory/cookies",
    },
    {
        src: "/images/jams.png",
        alt: "Confetture o Marmellate",
        label: "Confetture o Marmellate",
        link: "/productsCategory/jams",
    },
    {
        src: "/images/bars.png",
        alt: "Tavolette di Cioccolato",
        label: "Tavolette di Cioccolato",
        link: "/productsCategory/bars",
    },
    {
        src: "/images/cakes.png",
        alt: "Torte",
        label: "Torte",
        link: "/productsCategory/cakes",
    }
];

export default function CategorySlider() {
    return (
        <div className={styles.sliderContainer}>
            <h2 className={styles.title}>Le nostre categorie</h2>
            <p className={styles.subtitle}>Dolci esperienze per festeggiare i momenti importanti</p>
            <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={10}
                slidesPerView={2}
                slidesPerGroup={2}
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
                {categories.map((category, index) => (
                    <SwiperSlide key={index}>
                        <div className={styles.slide}>
                            <Image
                                src={category.src}
                                alt={category.alt}
                                width={600}
                                height={450}
                                className={styles.image}
                            />
                            <div className={styles.caption}>
                                <h3>{category.label}</h3>
                                <a href={category.link} className={styles.ctaButton}>Scopri di più</a>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
