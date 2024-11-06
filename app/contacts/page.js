'use client'

import Header from '@/components/header';
import Hero from '@/components/hero';
import Footer from '@/components/footer';

import { useState } from 'react';

import Image from 'next/image';
import pasticceria from '@/public/images/pasticceria.png';
import laboratorio from '@/public/images/laboratorio.png';

import styles from '@/app/contacts/page.module.css';


export default function Contacts() {
    const [activeTab, setActiveTab] = useState('pasticceria');
    const [activeIndex, setActiveIndex] = useState(null);

    const faqData = [
        {
            question: "Dove si trova Pasticceria C'Est La Vie?",
            answer: "Pasticceria C'Est La Vie si trova a Varese (VA) - Via Carlo Croce 4"
        },
        {
            question: "Quali sono gli orari di apertura di Pasticceria C'Est La Vie?",
            answer: "Lunedì: chiuso, Mar-Ven: 8:30 - 19:00, Sab: 9:00 - 19:00, Dom: 9:00 - 13:00, 15:00 - 19:00"
        },
        {
            question: "Quali sono i servizi che offre Pasticceria C'Est La Vie?",
            answer: "Pasticceria C'Est La Vie offre una vasta gamma di dolci artigianali, torte personalizzate, e servizi per eventi speciali."
        },
        {
            question: "Quali sono le opinioni degli utenti di Pasticceria C'Est La Vie?",
            answer: "I nostri clienti ci adorano per la qualità e il gusto dei nostri prodotti!"
        },
        {
            question: "Quali sono le specialità di Pasticceria C'Est La Vie?",
            answer: "Le specialità includono torte artigianali, croissant freschi e pasticceria mignon."
        },
        {
            question: "Come posso contattare Pasticceria C'Est La Vie?",
            answer: "Puoi contattarci via email all'indirizzo info@pasticceriacestlavie.it o telefonare al numero +39 327 7380932."
        },
    ];

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);

    };

    return (
        <section>
            <header>
                <Header />
            </header>
            <Hero />
            <div className={styles.contactsPage}>
                <header className={styles.hero}>
                    <h1>Dove siamo</h1>
                    <p>La nostra pasticceria artigianale ti aspetta!</p>
                </header>

                <div className={styles.tabs}>
                    <button
                        className={activeTab === 'pasticceria' ? styles.activeTab : styles.tabButton}
                        onClick={() => setActiveTab('pasticceria')}>
                        Pasticceria
                    </button>
                    <button
                        className={activeTab === 'laboratorio' ? styles.activeTab : styles.tabButton}
                        onClick={() => setActiveTab('laboratorio')}>
                        Laboratorio
                    </button>
                </div>

                <div className={styles.tabContent}>
                    {activeTab === 'pasticceria' && (
                        <>
                            <p className={styles.description}>
                                C'est la Vie è una pasticceria in stile francese del tutto artigianale  offre una vasta gamma di prodotti dolciari, tra cui: macarons, torte tradizionali e moderne, biscotti artigianali, pasticceria mignon, confetture e marmellate. Inoltre, su prenotazione, realizziamo torte personalizzabili per eventi e wedding cake.
                            </p>
                            <div className={styles.infoContainer}>
                                <div className={styles.containerImage}>
                                    <Image src={pasticceria} alt="Pasticceria" className={styles.image} />
                                </div>
                                <div className={styles.details}>
                                    <div className={styles.mapDetails}>
                                        <h3>Indirizzo</h3>
                                        <p>Via Carlo Croce, 4 — 21100 Varese (VA)</p>
                                        <a href="#map">Come raggiungerci</a>
                                    </div>

                                    <div className={styles.timeDetails}>
                                        <h3>Orari</h3>
                                        <p>Lun: Chiuso</p>
                                        <p>Mar - Ven: 8:30 - 19:00</p>
                                        <p>Sab: 9:00 - 19:00</p>
                                        <p>Dom: 8:30 - 19:00 15:00 - 19:00</p>
                                    </div>

                                    <div className={styles.contactsDetails}>
                                        <h3>Contatti</h3>
                                        <p>+39 327 7380932</p>
                                        <p>pasticceriacestlavie@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'laboratorio' && (
                        <>
                            <p className={styles.description}>
                                Il nostro laboratorio artigianale è dove la magia prende vita. È possibile recarsi sia per gli ordini che per i ritiri, per effettuare un ordine o richiedere informazioni, è possibile compilare il modulo di contatto.
                            </p>
                            <div className={styles.infoContainer}>
                                <div className={styles.containerImage}>
                                    <Image src={laboratorio} alt="Laboratorio" className={styles.image} />
                                </div>
                                <div className={styles.details}>
                                    <div className={styles.mapDetails}>
                                        <h3>Indirizzo</h3>
                                        <p>Via Garibaldi, 5 — 21100 Varese (VA)</p>
                                        <a href="#map">Come raggiungerci</a>
                                    </div>
                                    <div className={styles.timeDetails}>
                                        <h3>Orari</h3>
                                        <p>Lun: Chiuso</p>
                                        <p>Mar - Sab: 7:30 - 13:00 14:30 - 16:00</p>
                                        <p>Dom: 8:00 - 12:30 </p>
                                    </div>

                                    <div className={styles.contactsDetails}>
                                        <h3>Contatti</h3>
                                        <p>+39 327 7380932</p>
                                        <p>pasticceriacestlavie@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className={styles.contactFormSection}>
                    <div className={styles.formContainer}>
                        <h2>Compila il form per informazioni</h2>
                        <form className={styles.form}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">* Nome:</label>
                                <input type="text" id="name" name="name" required />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="surname">* Cognome:</label>
                                <input type="text" id="surname" name="surname" required />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email">* E-mail:</label>
                                <input type="email" id="email" name="email" required />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="phone">Telefono:</label>
                                <input type="tel" id="phone" name="phone" />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="message">* Messaggio:</label>
                                <textarea id="message" name="message" rows="4" required></textarea>
                            </div>

                            <div className={styles.formGroup}>
                                <input type="checkbox" id="privacy" name="privacy" required />
                                <label htmlFor="privacy">
                                    Ho letto l'<a href="#">informativa</a> e autorizzo il trattamento dei miei dati personali per le finalità ivi indicate.
                                </label>
                            </div>

                            <div className={styles.formGroup}>
                                <input type="checkbox" id="offers" name="offers" />
                                <label htmlFor="offers">Ricevi offerte speciali e promozioni dedicate.</label>
                            </div>

                            <button type="submit" className={styles.submitButton}>INVIA MESSAGGIO</button>
                        </form>
                    </div>
                    <div className={styles.imageSection}>
                        <Image
                            src="/images/pasticceriaInterno.jpg"
                            alt="Pasticceria C'est La Vie Interno"
                            layout="responsive"
                            width={500}
                            height={400}
                        />
                    </div>
                </div>
                <div className={styles.socialFollowSection}>
                    <h2>Rimani connesso con noi!</h2>
                    <div className={styles.socialBoxes}>
                        <div className={styles.socialBox}>
                            <Image
                                src="/images/facebookLogo.png"
                                alt="Facebook"
                                width={50}
                                height={50}
                            />
                            <p>Leggi i nostri ultimi aggiornamenti! Clicca sull'icona e segui la nostra pagina Facebook!</p>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                Vai a Facebook
                            </a>
                        </div>
                        <div className={styles.socialBox}>
                            <Image
                                src="/images/instagramLogo.png"
                                alt="Instagram"
                                width={50}
                                height={50}
                            />
                            <p>Non perderti neanche una delle nostre ultime creazioni, seguici!</p>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                Vai su Instagram
                            </a>
                        </div>
                    </div>
                </div>
                <div className={styles.tabContent}>
                    {activeTab === 'pasticceria' && (
                        <>
                            <div className={styles.containerMap} id='map'>
                            <iframe src={'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5561.204278908551!2d8.82432497671759!3d45.81922590968008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47867e27ca55fc29%3A0xd9138dc0ff637221!2sVia%20Carlo%20Croce%2C%204%2C%2021100%20Varese%20VA!5e0!3m2!1sit!2sit!4v1730912667406!5m2!1sit!2sit" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'} className={styles.map}></iframe>
                            </div>
                        </>
                    )}
                </div>
                <div className={styles.tabContent}>
                    {activeTab === 'laboratorio' && (
                        <>
                            <div className={styles.containerMap} id='map'>
                            <iframe src={'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1390.2484029675452!2d8.832790134626885!3d45.82133512862362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47868082e205363b%3A0x63724b3a01d0062c!2sVia%20Giuseppe%20Garibaldi%2C%205%2C%2021100%20Varese%20VA!5e0!3m2!1sit!2sit!4v1730912231743!5m2!1sit!2sit" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'} className={styles.map}></iframe>
                            </div>
                        </>
                    )}
                </div>
                <div className={styles.faqContainer}>
                    <h2>Domande generali</h2>
                    <div className={styles.accordion}>
                        {faqData.map((item, index) => (
                            <div key={index} className={styles.accordionItem}>
                                <button className={styles.accordionButton} onClick={() => handleToggle(index)}>
                                    <span>{item.question}</span>
                                    <span className={styles.icon}>{activeIndex === index ? '▲' : '▼'}</span>
                                </button>
                                {activeIndex === index && (
                                    <div className={styles.accordionContent}>
                                        <p>{item.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <footer>
                <Footer />
            </footer>
        </section>
    );
}
