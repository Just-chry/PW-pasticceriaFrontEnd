"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';

import { FaEye, FaEyeSlash } from "react-icons/fa";

import Link from "next/link";
import Image from "next/image";
import sfondo from '@/public/images/imageRegisterLogin.png';

import styles from '@/app/register/page.module.css';

export default function Register() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
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

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            alert("La password deve contenere almeno una lettera maiuscola, una lettera minuscola e un minimo di 8 caratteri.");
            return;
        }

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
                const errorData = await response.text();
                throw new Error(errorData || "Errore durante la registrazione. Riprova più tardi.");
            }

            const data = await response.text();
            alert(data || "Registrazione completata con successo!");

            if (formData.phone && !formData.email) {
                // Se l'utente ha inserito solo il numero di telefono, reindirizza alla pagina OTP
                router.push(`/verify?contact=${formData.phone}`);
            } else {

                router.push("/login");
            }
        } catch (error) {
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
                    <h2>Inizia il tuo dolce viaggio</h2>
                    <h1>Benvenuto nella nostra Pasticceria</h1>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.flexRow}>
                            <div className={styles.flexColumn}>
                                <label htmlFor="name" className={styles.label}>Nome</label>
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
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="25"
                                        height="25"
                                        fill="#000">
                                        <path d="m9 10 3-3 3 3-3 3zM4.59 18.5 12 16l7.5 2.5-7.45 2.97-7.46-2.97z" fill="#F3BC9F"></path>
                                        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18.22a8.18 8.18 0 0 1-5.03-1.72 8.18 8.18 0 0 1 10.06 0A8.18 8.18 0 0 1 12 20.22Zm6.32-2.97C16.6 15.84 14.4 15 12 15s-4.6.84-6.32 2.25a8.22 8.22 0 1 1 12.64 0ZM12 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z"></path>
                                    </svg>
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
