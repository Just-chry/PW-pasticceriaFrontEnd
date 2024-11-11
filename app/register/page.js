"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import sfondo from '@/public/images/imageRegisterLogin.png';
import styles from '@/app/register/page.module.css';

export default function Register() {
    // State per gestire i valori dei campi
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
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
            const response = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error("Errore durante la registrazione. Riprova più tardi.");
            }

            // Cambia `response.json()` in `response.text()` se la risposta non è JSON
            const data = await response.text();
            alert(data || "Registrazione completata con successo! Controlla il tuo contatto per confermare.");
        } catch (error) {
            console.error("Errore:", error);
            alert(error.message);
        }
    };



    return (
        <div className={styles.container}>
            <div className={styles.formSection}>
                <div className={styles.headerSection}>
                    <Link href="/" className={styles.logoText}>Pasticceria C'est La Vie</Link>
                </div>

                <div className={styles.containerRegister}>
                    <Link href="/" className={styles.aSvg}>
                        {/* SVG */}
                    </Link>
                    <h2>Inizia il tuo dolce viaggio</h2>
                    <h1>Benvenuto nella nostra Pasticceria</h1>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.flexRow}>
                            <div className={styles.flexColumn}>
                                <label htmlFor="name" className={styles.label}>Nome</label>
                                <div className={styles.inputForm}>
                                    {/* SVG */}
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className={styles.input}
                                        placeholder="Inserisci il tuo Nome"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.flexColumn}>
                                <label htmlFor="surname" className={styles.label}>Cognome</label>
                                <div className={styles.inputForm}>
                                    {/* SVG */}
                                    <input
                                        type="text"
                                        id="surname"
                                        name="surname"
                                        className={styles.input}
                                        placeholder="Inserisci Il tuo Cognome"
                                        value={formData.surname}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={styles.flexColumn}>
                            <label htmlFor="email" className={styles.label}>Email</label>
                            <div className={styles.inputForm}>
                                {/* SVG */}
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={styles.input}
                                    placeholder="Inserisci la tua Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className={styles.flexColumn}>
                            <label htmlFor="phone" className={styles.label}>Cellulare</label>
                            <div className={styles.inputForm}>
                                {/* SVG */}
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className={styles.input}
                                    placeholder="Inserisci il tuo Telefono"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className={styles.flexColumn}>
                            <label htmlFor="password" className={styles.label}>Password</label>
                            <div className={styles.inputForm}>
                                {/* SVG */}
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
                        </div>
                        <button type="submit" className={styles.buttonSubmit}>Registrati</button>
                        <p className={styles.p}>
                            Hai già un account? <Link href="/login" className={styles.span}>Accedi</Link>
                        </p>
                    </form>
                </div>
            </div>

            <div className={styles.imageSection}>
                <Image src={sfondo} alt="imageRegister" />
            </div>
        </div>
    );
}
