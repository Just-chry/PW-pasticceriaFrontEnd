"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import sfondo from '@/public/images/imageRegisterLogin.png';
import styles from '@/app/login/page.module.css';
import {useRouter} from "next/navigation";

export default function Login() {
    const router = useRouter();
    // State per gestire i valori dei campi
    const [formData, setFormData] = useState({
        emailOrPhone: "",
        password: ""
    });

    // Funzione per aggiornare i valori dei campi
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Funzione per gestire il submit del modulo
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || "Errore durante l'accesso. Riprova più tardi.");
            }

            // Cambia `response.json()` in `response.text()` se la risposta non è JSON
            const data = await response.json();
            alert(data.message || "Login avvenuto con successo!");
            router.push("/dashboard")
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <section className={styles.container}>
            <div className={styles.formSection}>
                <div className={styles.headerSection}>
                    <Link href="/" className={styles.logoText}>Pasticceria C'est La Vie</Link>
                </div>

                <div className={styles.containerRegister}>
                    <Link href="/" className={styles.aSvg}>
                        {/* SVG Icon */}
                    </Link>
                    <h2>Continua il tuo dolce viaggio</h2>
                    <h1>Bentornato nella nostra Pasticceria</h1>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.flexColumn}>
                            <label htmlFor="emailOrPhone" className={styles.label}>Email o Cellulare</label>
                        </div>
                        <div className={styles.inputForm}>
                            {/* SVG Icon */}
                            <input
                                type="text"
                                id="emailOrPhone"
                                name="emailOrPhone"
                                className={styles.input}
                                placeholder="Inserisci la tua Email o Cellulare"
                                value={formData.emailOrPhone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.flexColumn}>
                            <label htmlFor="password" className={styles.label}>Password</label>
                        </div>
                        <div className={styles.inputForm}>
                            {/* SVG Icon */}
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className={styles.input}
                                placeholder="Inserisci la tua Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.flexPassword}>
                            <Link href="/forgot-password" className={styles.spanPassword}>Password dimenticata?</Link>
                        </div>
                        <button type="submit" className={styles.buttonSubmit}>Accedi</button>
                        <p className={styles.p}>
                            Non hai ancora un account? <Link href="/register" className={styles.span}>Registrati</Link>
                        </p>
                    </form>
                </div>
            </div>

            <div className={styles.imageSection}>
                <Image src={sfondo} alt="imageRegister" />
            </div>
        </section>
    );
}
