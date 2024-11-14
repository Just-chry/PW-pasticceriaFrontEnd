"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Footer from "@/components/footer";

export default function ForgotPassword() {
    const router = useRouter();
    const [contact, setContact] = useState("");

    const handleContactChange = (e) => setContact(e.target.value);

    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();

        let formattedContact = contact;
        // Aggiungi il prefisso solo se non è un'email
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
                // Caso email: rimani sulla stessa pagina e visualizza il messaggio di successo
                alert("Email di recupero inviata con successo. Controlla il tuo indirizzo email!");
                router.push("/login"); // Pusha al login solo dopo il messaggio di successo
            } else {
                // Caso numero di telefono: reindirizza alla pagina di verifica OTP
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
                    <h1 className={styles.title}>Recupera Password</h1>
                    <form className={styles.form} onSubmit={handleForgotPasswordSubmit}>
                        <label className={styles.label} htmlFor="contact">Inserisci la tua Email o Cellulare</label>
                        <input
                            type="text"
                            id="contact"
                            name="contact"
                            className={styles.input}
                            value={contact}
                            onChange={handleContactChange}
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
