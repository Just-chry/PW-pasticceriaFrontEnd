"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import Footer from "@/components/footer";

import styles from "./page.module.css";

export default function ForgotPassword() {
    const router = useRouter();
    const [contact, setContact] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleContactChange = (e) => setContact(e.target.value);

    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();

        let formattedContact = contact;
        if (!formattedContact.includes("@") && !formattedContact.startsWith("+39")) {
            formattedContact = `+39${formattedContact}`;
        }

        try {
            const response = await fetch(`http://localhost:8080/auth/forgot-password?contact=${encodeURIComponent(formattedContact)}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || "Errore nell'invio del codice di recupero.");
            }
            if (formattedContact.includes("@")) {
                alert("Email di recupero inviata con successo. Controlla il tuo indirizzo email!");
                router.push("/login");
            } else {
                alert("Codice di recupero inviato con successo. Controlla il tuo dispositivo!");
                router.push(`/verify?contact=${encodeURIComponent(formattedContact)}&type=password-reset`);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <div className={styles.heroContainer}>
                <div className={styles.heroBackground}></div>
                <div className={styles.formContainer}>
                    <h1 className={styles.title}>Recupera password</h1>
                    <form className={styles.form} onSubmit={handleForgotPasswordSubmit}>
                        <label className={styles.label} htmlFor="contact">Inserisci la tua Email o Cellulare</label>
                        <input
                            type="text"
                            id="contact"
                            name="contact"
                            className={styles.input}
                            value={contact}
                            onChange={handleContactChange}
                            ref={inputRef}
                            required
                        />
                        <button type="submit" className={styles.button}>Invia Codice</button>
                    </form>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </>
    );
}
