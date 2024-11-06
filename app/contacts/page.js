'use client'

import Header from '@/components/header';
import Footer from '@/components/footer';

import Image from 'next/image';
import logo from '@/public/images/logoPasticceria.png';

import { useState } from 'react';

import styles from '@/app/contacts/page.module.css';

export default function Contacts() {
    const [activeTab, setActiveTab] = useState('info');

    return (
        <section className={styles.container}>
            <header>
                <Header />
            </header>

            <div className={styles.heroSection}>
                </div>

            {/* Tabs Section */}
            <div className={styles.tabsContainer}>
                <div className={styles.tabsHeader}>
                    <button
                        className={activeTab === 'info' ? styles.activeTab : ''}
                        onClick={() => setActiveTab('info')}
                    >
                        Informazioni
                    </button>
                    <button
                        className={activeTab === 'location' ? styles.activeTab : ''}
                        onClick={() => setActiveTab('location')}
                    >
                        Dove Trovarci
                    </button>
                </div>
                <div className={styles.tabsContent}>
                    {activeTab === 'info' && (
                        <div className={styles.tabContent}>
                            <p>
                                Benvenuti nella nostra Pasticceria! Offriamo una varietà di dolci freschi preparati ogni giorno.
                                Vieni a trovarci per assaggiare le nostre specialità e lasciati conquistare dai nostri sapori unici.
                            </p>
                            <Image
                                src="/images/pasticceria.jpg"
                                alt="Pasticceria"
                                width={500}
                                height={300}
                            />
                        </div>
                    )}
                    {activeTab === 'location' && (
                        <div className={styles.tabContent}>
                            <Image
                                src="/images/pasticceriaLocation.jpg"
                                alt="La nostra sede"
                                width={500}
                                height={300}
                            />
                            <div className={styles.mapSection}>
                                {/* Potresti integrare Google Maps o usare un'immagine della mappa */}
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18..."
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Contact Form Section */}
            <div className={styles.formSection}>
                <h3>Contattaci</h3>
                <form className={styles.contactForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Nome</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="message">Messaggio</label>
                        <textarea id="message" name="message" rows="4" required></textarea>
                    </div>
                    <button type="submit" className={styles.submitButton}>Invia Messaggio</button>
                </form>
            </div>

            {/* Follow Us Section */}
            <div className={styles.followUsSection}>
                <div className={styles.box}>
                    <h4>Seguici su Facebook</h4>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <Image
                            src="/images/facebookLogo.png"
                            alt="Facebook"
                            width={50}
                            height={50}
                        />
                    </a>
                </div>
                <div className={styles.box}>
                    <h4>Seguici su Instagram</h4>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <Image
                            src="/images/instagramLogo.png"
                            alt="Instagram"
                            width={50}
                            height={50}
                        />
                    </a>
                </div>
            </div>

            <footer>
                <Footer />
            </footer>
        </section>
    );
}
