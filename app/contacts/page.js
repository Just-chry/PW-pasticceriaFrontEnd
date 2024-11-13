'use client'

import { useState } from 'react';

import Hero from '@/components/hero';
import Footer from '@/components/footer';

import Image from 'next/image';
import pasticceria from '@/public/images/pasticceria.png';
import laboratorio from '@/public/images/laboratorio.png';
import form from '@/public/images/form.png';
import facebook from '@/public/images/facebook.png';
import instagram from '@/public/images/instagram.png';

import styles from '@/app/contacts/page.module.css';


export default function Contacts() {
    const [activeTab, setActiveTab] = useState('pasticceria');
    const [activeIndex, setActiveIndex] = useState(null);

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false); // 
        }, 4000);
    };

    const faqData = [
        {
            question: "Dove si trova Pasticceria C'Est La Vie?",
            answer: "Pasticceria C'Est La Vie si trova a Varese (VA) - Via Carlo Croce 4"
        },
        {
            question: "Quali sono gli orari di apertura di Pasticceria C'Est La Vie?",
            answer: "L'orario di apertura di Pasticceria C'Est La Vie è: da Martedì a Domenica: 09:00 - 13:00, da Martedì a Domenica: 14:00 - 19:30"
        },
        {
            question: "Quali sono i servizi che offre Pasticceria C'Est La Vie?",
            answer: "Pasticceria C'Est La Vie offre i seguenti servizi: Torte Personalizzate, Cake Design"
        },
        {
            question: "Quali sono le opinioni degli utenti di Pasticceria C'Est La Vie?",
            answer: (
                <>
                    Leggi le recensioni di Pasticceria C'Est La Vie oppure lascia la tua opinione su{" "}
                    <a href="https://www.paginegialle.it/pasticceria-cest-la-vie" target="_blank" rel="noopener noreferrer">Paginegialle.it</a>
                </>
            )
        },
        {
            question: "Quali sono le specialità di Pasticceria C'Est La Vie?",
            answer: "Pasticceria C'Est La Vie propone le seguenti specialità: Macarons, Cookies"
        },
        {
            question: "Come posso contattare Pasticceria C'Est La Vie?",
            answer: "Puoi contattare Pasticceria C'Est La Vie tramite email: info@pasticceriacestlavie.it, telefono: 327 7380932, WhatsApp: 327 7380932"
        },
    ];

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);

    };

    return (
        <section>
            <Hero />
            <section>
                <div id='tab' className={styles.contactsPage}>
                    <header className={styles.hero}>
                        <h1>Dove siamo</h1>
                        <p>La nostra pasticceria artigianale ti aspetta!</p>
                    </header>

                    <div id='#pasticceria' className={styles.tabs}>
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
                                            <a href="#map"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width='24' height='24' fill="#000"><path d="m17 5-5-2-5 2-2 6 7 10 7-10-2-6Zm-3 7h-4V8h4v4Z" fill="#F3BC9F"></path><path d="M12 4a6 6 0 0 1 6 6c0 3.06-3 6.76-6 9.41C9 16.77 6 13.07 6 10a6 6 0 0 1 6-6m0 9c1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3 1.35 3 3 3m0-11a8 8 0 0 0-8 8c0 4.96 5.47 9.93 7.36 11.49.37.3.9.31 1.26 0C14.51 19.93 20 14.96 20 10a8 8 0 0 0-8-8Zm0 9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Z"></path></svg> Come raggiungerci</a>
                                        </div>

                                        <div className={styles.timeDetails}>
                                            <h3>Orari</h3>
                                            <p>Lun: Chiuso</p>
                                            <p>Mar - Ven: 8:30 - 19:00</p>
                                            <p>Sab: 9:00 - 19:00</p>
                                            <p>Dom: 9:00 - 13:00 / 15:00 - 19:00</p>
                                        </div>

                                        <div className={styles.contactsDetails}>
                                            <h3>Contatti</h3>
                                            <p>+39 327 7380932</p>
                                            <p>pasticceriacestlavie@gmail.com</p>
                                        </div>
                                    </div>
                                    <a href="#tab" className={styles.hideOnDesktop}>
                                        <button className={styles.buttonSubmitUp}>Torna su</button>
                                    </a>
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
                                            <a href="#map"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width='24' height='24' fill="#000"><path d="m17 5-5-2-5 2-2 6 7 10 7-10-2-6Zm-3 7h-4V8h4v4Z" fill="#F3BC9F"></path><path d="M12 4a6 6 0 0 1 6 6c0 3.06-3 6.76-6 9.41C9 16.77 6 13.07 6 10a6 6 0 0 1 6-6m0 9c1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3 1.35 3 3 3m0-11a8 8 0 0 0-8 8c0 4.96 5.47 9.93 7.36 11.49.37.3.9.31 1.26 0C14.51 19.93 20 14.96 20 10a8 8 0 0 0-8-8Zm0 9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Z"></path></svg>Come raggiungerci</a>
                                        </div>
                                        <div className={styles.timeDetails}>
                                            <h3>Orari</h3>
                                            <p>Lun: Chiuso</p>
                                            <p>Mar - Sab: 7:30 - 13:00 / 14:30 - 16:00</p>
                                            <p>Dom: 8:00 - 12:30 </p>
                                        </div>

                                        <div className={styles.contactsDetails}>
                                            <h3>Contatti</h3>
                                            <p>+39 327 7380932</p>
                                            <p>pasticceriacestlavie@gmail.com</p>
                                        </div>
                                    </div>
                                    <a href="#tab" className={styles.hideOnDesktop}>
                                        <button className={styles.buttonSubmitUp}>Torna su</button>
                                    </a>
                                </div>
                            </>
                        )}
                    </div>
                    <div id='info' className={styles.contactFormSection}>
                        <div className={styles.formContainer}>
                            <h2>Compila il form per informazioni</h2>
                            <form className={styles.form} onSubmit={handleSubmit}>
                                <div className={styles.flexColumn}>
                                    <label htmlFor="firstName" className={styles.label}>Nome</label>
                                    <div className={styles.inputForm}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            width="25"
                                            height="25"
                                            fill="#000">
                                            <path d="m9 10 3-3 3 3-3 3zM4.59 18.5 12 16l7.5 2.5-7.45 2.97-7.46-2.97z" fill="#F3BC9F"></path>
                                            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18.22a8.18 8.18 0 0 1-5.03-1.72 8.18 8.18 0 0 1 10.06 0A8.18 8.18 0 0 1 12 20.22Zm6.32-2.97C16.6 15.84 14.4 15 12 15s-4.6.84-6.32 2.25a8.22 8.22 0 1 1 12.64 0ZM12 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z"></path>
                                        </svg>
                                        <input type="text" id="firstName" name="fisrtName" className={styles.input} placeholder="Inserisci il tuo Nome" required />
                                    </div>
                                </div>

                                <div className={styles.flexColumn}>
                                    <label htmlFor="LastName" className={styles.label}>Cognome</label>
                                    <div className={styles.inputForm}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            width="25"
                                            height="25"
                                            fill="#000">
                                            <path d="m9 10 3-3 3 3-3 3zM4.59 18.5 12 16l7.5 2.5-7.45 2.97-7.46-2.97z" fill="#F3BC9F"></path>
                                            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18.22a8.18 8.18 0 0 1-5.03-1.72 8.18 8.18 0 0 1 10.06 0A8.18 8.18 0 0 1 12 20.22Zm6.32-2.97C16.6 15.84 14.4 15 12 15s-4.6.84-6.32 2.25a8.22 8.22 0 1 1 12.64 0ZM12 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z"></path>
                                        </svg>
                                        <input type="text" id="lastName" name="lastName" className={styles.input} placeholder="Inserisci il tuo Cognome" required />
                                    </div>
                                </div>

                                <div className={styles.flexColumn}>
                                    <label htmlFor="email" className={styles.label}>Email</label>
                                </div>
                                <div className={styles.inputForm}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="25"
                                        height="25"
                                        fill="#000">
                                        <path d="m3 9 9 4 9.09-4v10.03H3V9z"
                                            fill="#F3BC9F">
                                        </path>
                                        <path d="M19.5 4h-15A2.5 2.5 0 0 0 2 6.5v11A2.5 2.5 0 0 0 4.5 20h15a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 19.5 4ZM12 12 4 8.67V6.5c0-.28.22-.5.5-.5h15c.28 0 .5.22.5.5v2.17l-8 3.32Zm0 2.16 8-3.31v6.66a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5v-6.66l8 3.31Z">
                                        </path></svg>
                                    <input type="email" id="email" name="email" className={styles.input} placeholder="Inserisci la tua Email" required />
                                </div>

                                <div className={styles.flexColumn}>
                                    <label htmlFor="phone" className={styles.label}>Cellurare</label>
                                </div>
                                <div className={styles.inputForm}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="25"
                                        height="25"
                                        fill="#000">
                                        <path d="m8 2 2 6-2 3 5 5 3-2 6.25 2.33L19 21l-9-2-5-5-2-9 5-3z" fill="#F3BC9F">
                                        </path>
                                        <path d="m21.38 14.31-3.47-1.49c-.32-.14-.66-.2-1-.2-.82 0-1.61.4-2.08 1.11L14 15s-1.7-.3-3.2-1.8-1.8-3.2-1.8-3.2l1.27-.85c1-.67 1.39-1.96.91-3.07L9.68 2.61a2.491 2.491 0 0 0-2.3-1.51c-.46 0-.93.13-1.36.4L3.57 3.1c-.6.39-1.05 1-1.25 1.67-.87 3.07.39 8.53 4.38 12.52 3.2 3.2 7.35 4.64 10.44 4.64.77 0 1.47-.09 2.08-.26.69-.2 1.28-.65 1.67-1.25l1.6-2.45c.84-1.3.32-3.05-1.11-3.66Zm-.57 2.57-1.6 2.45c-.14.21-.32.35-.53.41-.43.12-.96.19-1.54.19-2.29 0-6.03-1.06-9.03-4.06-3.69-3.69-4.48-8.4-3.87-10.57.06-.21.21-.4.41-.53l2.45-1.6a.503.503 0 0 1 .73.22l1.49 3.47c.1.22.02.48-.18.61l-1.27.85c-.66.44-1 1.23-.86 2 .04.24.46 2.38 2.36 4.27 1.89 1.89 4.03 2.31 4.27 2.36a2 2 0 0 0 2-.86l.85-1.27c.09-.14.25-.22.42-.22.07 0 .13 0 .2.04l3.47 1.49c.18.08.25.21.28.31s.05.26-.06.42Z">
                                        </path>
                                    </svg>
                                    <input type="tel" id="phone" name="phone" className={styles.input} placeholder="Inserisci il tuo Telefono" required />
                                </div>

                                <div className={styles.flexColumn}>
                                    <label htmlFor="message" className={styles.label}>Messaggio</label>
                                </div>
                                <div className={styles.inputFormMessage}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="25"
                                        height="25"
                                        fill="#000">
                                        <path fill="#F3BC9F" d="M21 17H7l-4 4V4.98h18V17z">
                                        </path>
                                        <path d="M19.5 4h-15A2.5 2.5 0 0 0 2 6.5V21a1 1 0 0 0 1.71.71L7.42 18h12.09a2.5 2.5 0 0 0 2.5-2.5v-9a2.5 2.5 0 0 0-2.5-2.5Zm.48 11.5a.5.5 0 0 1-.5.5H7c-.27 0-.52.11-.71.29L4 18.58V6.52c0-.28.22-.5.5-.5h15c.28 0 .5.22.5.5l-.02 8.98ZM17 8H7c-.55 0-1 .45-1 1s.45 1 1 1h10c.55 0 1-.45 1-1s-.45-1-1-1ZM13 12H7c-.55 0-1 .45-1 1s.45 1 1 1h6c.55 0 1-.45 1-1s-.45-1-1-1Z">
                                        </path>
                                    </svg>
                                    <textarea id="message" name="message" rows="10" cols="50" className={styles.textArea} placeholder="Inserisci il tuo Messaggio" required />
                                </div>

                                <div className={styles.formGroup}>
                                    <input type="checkbox" id="privacy" name="privacy" required />
                                    <label htmlFor="privacy">
                                        Ho letto l'<a href="#">informativa</a> e autorizzo il trattamento dei miei dati personali per le finalità ivi indicate.
                                    </label>
                                </div>

                                <button type="submit" className={styles.buttonSubmit}>Invia messaggio</button>

                                {isSubmitted && <p className={styles.confirmationMessage}>Il tuo messaggio è stato inviato correttamente!</p>}
                            </form>
                        </div>
                        <div className={styles.imageSection}>
                            <Image
                                src={form}
                                alt="Pasticceria C'est La Vie form"
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
                                <a href="https://www.facebook.com/pasticceriacestlavie" target="_blank" rel="noopener noreferrer" className={styles.facebookA}>
                                    <Image
                                        src={facebook}
                                        alt="Facebook"
                                        width={50}
                                        height={50}
                                    />
                                </a>
                                <p>Leggi i nostri ultimi aggiornamenti! Clicca sull'icona e segui la nostra pagina Facebook!</p>

                            </div>
                            <div className={styles.socialBox}>
                                <a href="https://www.instagram.com/pasticceriacestlavie/" target="_blank" rel="noopener noreferrer" className={styles.instagramA}>
                                    <Image
                                        src={instagram}
                                        alt="Instagram"
                                        width={50}
                                        height={50}
                                    />
                                </a>
                                <p>Non perderti neanche una delle nostre ultime creazioni, seguici!</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.tabContent}>
                        {activeTab === 'pasticceria' && (
                            <><div>
                                <div className={styles.containerMap} id='map'>
                                    <iframe src={'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5561.204278908551!2d8.82432497671759!3d45.81922590968008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47867e27ca55fc29%3A0xd9138dc0ff637221!2sVia%20Carlo%20Croce%2C%204%2C%2021100%20Varese%20VA!5e0!3m2!1sit!2sit!4v1730912667406!5m2!1sit!2sit" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'} className={styles.map}></iframe>
                                </div>
                                <a href="#tab" className={styles.hideOnDesktop}>
                                    <button className={styles.buttonSubmitUpMap}>Torna su</button>
                                </a>
                            </div>
                            </>
                        )}
                    </div>
                    <div className={styles.tabContent}>
                        {activeTab === 'laboratorio' && (
                            <><div>
                                <div className={styles.containerMap} id='map'>
                                    <iframe src={'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1390.2484029675452!2d8.832790134626885!3d45.82133512862362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47868082e205363b%3A0x63724b3a01d0062c!2sVia%20Giuseppe%20Garibaldi%2C%205%2C%2021100%20Varese%20VA!5e0!3m2!1sit!2sit!4v1730912231743!5m2!1sit!2sit" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'} className={styles.map}></iframe>
                                </div>
                                <a href="#tab" className={styles.hideOnDesktop}>
                                    <button className={styles.buttonSubmitUpMap}>Torna su</button>
                                </a>
                            </div>
                            </>
                        )}
                    </div>
                    <div className={styles.faqContainer}>
                        <h2>Domande generali</h2>
                        <div className={styles.accordion}>
                            {faqData.map((item, index) => (
                                <div key={index} className={styles.accordionItem}>
                                    <button
                                        className={`${styles.accordionButton} ${activeIndex === index ? styles.active : ''}`}
                                        onClick={() => handleToggle(index)}
                                    >
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
            </section>
            <footer>
                <Footer />
            </footer>
        </section>
    );
}
