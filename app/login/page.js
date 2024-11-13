"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import Link from "next/link";
import Image from "next/image";
import sfondo from '@/public/images/imageRegisterLogin.png';

import styles from '@/app/login/page.module.css';

export default function Login() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        emailOrPhone: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

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
                const errorData = await response.json();
                throw new Error(errorData.message || "Errore durante l'accesso. Riprova più tardi.");
            }

            const userResponse = await fetch('http://localhost:8080/user', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (userResponse.ok) {
                const userData = await userResponse.json();
                console.log(userData);

                if (userData.role === "admin") {
                    window.location.replace("/dashboardAdmin");
                } else if (userData.role === "user") {
                    window.location.replace("/dashboardUtente");
                } else {
                    alert("Ruolo utente non riconosciuto.");
                }
            } else {
                throw new Error('Errore nella richiesta dei dati utente');
            }
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
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            fill="#000">
                            <path d="M12 20V4l-8 8 8 8z"
                                fill="#F3BC9F">
                            </path>
                            <path d="m2.29 12.71l8 8c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41l-6.29-6.29h15.59c.55 0 1-.45 1-1s-.45-1-1-1H5.41l6.29-6.29c.39-.39.39-1.02 0-1.41-.2-.2-.45-.29-.71-.29s-.51.1-.71.29L2.29 11.29c-.39.39-.39 1.02 0 1.41Z">
                            </path>
                        </svg>
                    </Link>
                    <h2>Continua il tuo dolce viaggio</h2>
                    <h1>Bentornato nella nostra Pasticceria</h1>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.flexColumn}>
                            <label htmlFor="emailOrPhone" className={styles.label}>Email o Cellulare</label>
                        </div>
                        <div className={styles.inputForm}>
                            <div className={styles.svgContainer}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="25"
                                    height="25"
                                    fill="#000">
                                    <path d="m3 9 9 4 9.09-4v10.03H3V9z"
                                        fill="#F3BC9F">
                                    </path>
                                    <path
                                        d="M19.5 4h-15A2.5 2.5 0 0 0 2 6.5v11A2.5 2.5 0 0 0 4.5 20h15a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 19.5 4ZM12 12 4 8.67V6.5c0-.28.22-.5.5-.5h15c.28 0 .5.22.5.5v2.17l-8 3.32Zm0 2.16 8-3.31v6.66a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5v-6.66l8 3.31Z">
                                    </path>
                                </svg>
                            </div>
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
                            <div className={styles.inputForm}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="25"
                                    height="25"
                                    fill="#000">
                                    <path d="M5 11h14v10H5z"
                                        fill="#F3BC9F">
                                    </path>
                                    <g>
                                        <path d="M17.5 10H17V7A5 5 0 0 0 7 7v3h-.5A2.5 2.5 0 0 0 4 12.5v7A2.5 2.5 0 0 0 6.5 22h11a2.5 2.5 0 0 0 2.5-2.5v-7a2.5 2.5 0 0 0-2.5-2.5ZM9 7c0-1.65 1.35-3 3-3s3 1.35 3 3v3H9V7Zm9 12.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-7c0-.28.22-.5.5-.5h11c.28 0 .5.22.5.5v7Z"></path>
                                        <circle cx="12" cy="16" r="2"></circle>
                                    </g>
                                </svg>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className={styles.input}
                                    placeholder="Inserisci la tua Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button type="button" onClick={toggleShowPassword} className={styles.showPasswordButton}>
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
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
