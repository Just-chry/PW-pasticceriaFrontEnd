'use client'

import { useState } from 'react';

import styles from "@/components/newsletter.module.css";

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState(''); // Aggiungi questo stato

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Email inviata:', email);

        setConfirmationMessage('Grazie mille! La tua email è stata aggiunta alla newsletter.');

        setTimeout(() => {
            setEmail('');
            setConfirmationMessage('');
        }, 4000);
    };

    return (
        <div className={styles.container}>
            <div className={styles.newsletterBackground}></div>
            <div className={styles.newsletterContainer}>
                <div className={styles.textContainer}>
                <h2 className={styles.title}>Iscriviti alla nostra Newsletter</h2>
                <p className={styles.subtitle}>
                    Resta aggiornato sulle ultime novità, ricevi offerte speciali e promozioni dedicate!
                </p>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.flexColumn}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                    </div>
                    <div className={styles.inputForm}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="30"
                            height="30"
                            fill="#000">
                            <path d="m3 9 9 4 9.09-4v10.03H3V9z"
                                fill="#F3BC9F">
                            </path>
                            <path d="M19.5 4h-15A2.5 2.5 0 0 0 2 6.5v11A2.5 2.5 0 0 0 4.5 20h15a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 19.5 4ZM12 12 4 8.67V6.5c0-.28.22-.5.5-.5h15c.28 0 .5.22.5.5v2.17l-8 3.32Zm0 2.16 8-3.31v6.66a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5v-6.66l8 3.31Z">
                            </path></svg>
                        <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} className={styles.input} placeholder="Inserisci la tua Email" required />
                    </div>
                    <div className={styles.formGroup}>
                        <input type="checkbox" id="privacy" name="privacy" required />
                        <label htmlFor="privacy">
                            Ho letto l'<a href="#">informativa</a> e autorizzo il trattamento dei miei dati personali per le finalità ivi indicate.
                        </label>
                    </div>
                    <button type="submit" className={styles.buttonSubmit}>Iscriviti</button>
                </form>
                {confirmationMessage && (
                    <div className={styles.confirmationMessage}>
                        {confirmationMessage}
                    </div>
                )}
            </div>
        </div>
        </div >
    );
}
