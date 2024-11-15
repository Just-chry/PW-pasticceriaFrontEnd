"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Link from 'next/link';
import Image from 'next/image';

import Loading from '@/components/loading';

import Footer from '@/components/footer';

import styles from '@/app/dashboardAdmin/page.module.css';

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState({ password: false });
    const [newPhone, setNewPhone] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const toggleShowOldPassword = () => setShowOldPassword((prev) => !prev);
    const toggleShowNewPassword = () => setShowNewPassword((prev) => !prev);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:8080/user', {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    const userData = await response.json();
                    if (userData.role !== 'admin') {
                        router.push('/not-found');
                    } else {
                        setUser(userData);
                        setNewPhone(userData.phone || '');
                        setNewEmail(userData.email || '');
                    }
                } else {
                    throw new Error('Errore durante il recupero dei dati utente');
                }
            } catch (error) {
                console.error('Errore durante la richiesta:', error);
                router.push('/not-found');
            }
        };

        const capitalize = (text) => {
            return text.replace(/\b\w/g, (char) => char.toUpperCase());
        };

        const today = new Date().toLocaleDateString('it-IT', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        setCurrentDate(capitalize(today));

        fetchUserData();
    }, [router]);

    const handleSaveEmail = async () => {
        try {
            const response = await fetch('http://localhost:8080/profile/modify/email', {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: newEmail }),
            });

            if (!response.ok) {
                throw new Error("Errore durante il salvataggio dell'email");
            }

            const updatedUser = await response.json();
            setUser(updatedUser);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleSavePhone = async () => {
        try {
            const response = await fetch('http://localhost:8080/profile/modify/phone', {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: newPhone }),
            });

            if (!response.ok) {
                throw new Error("Errore durante il salvataggio del telefono");
            }

            const updatedUser = await response.json();
            setUser(updatedUser);
        } catch (error) {
            alert(error.message);
        }
    };

    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasMinLength = password.length >= 8;

        if (!hasUpperCase || !hasLowerCase || !hasMinLength) {
            setPasswordError(
                'La password deve contenere almeno una lettera maiuscola, una lettera minuscola e minimo 8 caratteri'
            );
            return false;
        }

        setPasswordError('');
        return true;
    };

    const handleSavePassword = async () => {
        if (!validatePassword(newPassword)) {
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/profile/modify/password', {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ oldPassword, newPassword }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }

            setEditMode((prev) => ({ ...prev, password: false }));
            setOldPassword('');
            setNewPassword('');
            setSuccessMessage('Password cambiata con successo');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            setPasswordError(error.message);
        }
    };

    const handleEditClick = (field) => {
        setEditMode((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    if (!user) {
        return <Loading />;
    }

    return (
        <>
            <div className={styles.heroContainer}>
                <div className={styles.heroBackground}></div>

                <div className={styles.profileContainer}>
                    <h2 className={styles.textProfile}>Profilo Admin</h2>
                    <div className={styles.profileSection}>
                        <div className={styles.profileField}>
                            <label>Nome:</label>
                            <span>{user.name}</span>
                        </div>
                        <div className={styles.profileField}>
                            <label>Cognome:</label>
                            <span>{user.surname}</span>
                        </div>
                        <div className={styles.profileFieldEmailTel}>
                            <label>Email:</label>
                            {user.email ? (
                                <span>{user.email}</span>
                            ) : (
                                <div className={styles.inputFormEmailTel}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="30"
                                        height="30"
                                        fill="#000">
                                        <path d="m3 9 9 4 9.09-4v10.03H3V9z"
                                            fill="#F3BC9F">
                                        </path>
                                        <path
                                            d="M19.5 4h-15A2.5 2.5 0 0 0 2 6.5v11A2.5 2.5 0 0 0 4.5 20h15a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 19.5 4ZM12 12 4 8.67V6.5c0-.28.22-.5.5-.5h15c.28 0 .5.22.5.5v2.17l-8 3.32Zm0 2.16 8-3.31v6.66a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5v-6.66l8 3.31Z">
                                        </path>
                                    </svg>
                                    <input
                                        type="email"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        placeholder="Aggiungi email"
                                        className={styles.inputEmailTel}
                                    />
                                    <button className={styles.buttonEmailTel} onClick={handleSaveEmail}>Aggiungi</button>
                                </div>
                            )}
                        </div>
                        <div className={styles.profileFieldEmailTel}>
                            <label>Telefono:</label>
                            {user.phone ? (
                                <span>{user.phone}</span>
                            ) : (
                                <div className={styles.inputFormEmailTel}>
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
                                        value={newPhone}
                                        onChange={(e) => setNewPhone(e.target.value)}
                                        placeholder="Aggiungi telefono"
                                        className={styles.inputEmailTel}
                                    />
                                    <button className={styles.buttonEmailTel} onClick={handleSavePhone}>Aggiungi</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <h2 className={styles.textProfile}>Modifica Password</h2>
                    <div className={styles.profileSection}>
                        {editMode.password && (
                            <>
                                <div className={styles.profileField}>
                                    <label>Vecchia Password:</label>
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
                                            type={showOldPassword ? "text" : "password"}
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            placeholder="Inserisci la vecchia password"
                                            className={styles.input}
                                        />
                                        <button type="button" onClick={toggleShowOldPassword} className={styles.showPasswordButton}>
                                            {showOldPassword ? <FaEye /> : <FaEyeSlash />}
                                        </button>
                                    </div>
                                </div>
                                <div className={styles.profileField}>
                                    <label>Nuova Password:</label>
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
                                            type={showNewPassword ? "text" : "password"}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Inserisci la nuova password"
                                            className={styles.input}
                                        />
                                        <button type="button" onClick={toggleShowNewPassword} className={styles.showPasswordButton}>
                                            {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                                        </button>
                                    </div>
                                </div>
                                <button className={styles.button} onClick={handleSavePassword}>Salva</button>
                            </>
                        )}
                        {!editMode.password && (
                            <div className={styles.fieldWithButton}>
                                <button className={styles.button} onClick={() => handleEditClick('password')}>
                                    Modifica qui
                                </button>
                            </div>
                        )}
                        {passwordError && <p className={styles.error}>{passwordError}</p>}
                        {successMessage && <p className={styles.success}>{successMessage}</p>}
                    </div>
                </div>

                <div className={styles.dateAndOrders}>
                    <p className={styles.currentDate}>{currentDate}</p>
                    <div className={styles.ordersDay}>
                        <h2>Scopri i ritiri di oggi: </h2>
                        <button className={styles.button}>
                            <Link href="/ritiriGiornalieri">
                                <p>Ritiri giornalieri</p>
                            </Link>
                        </button>
                    </div>
                </div>

                <div className={styles.centerSection}>
                    <div className={styles.logoContainer}>
                        <Image
                            src="/images/logoPasticceria.png"
                            alt="Logo"
                            width={500}
                            height={200}
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.buttonCards}>
                        <button className={styles.button}>
                            <Link href="/magazzino">
                                <p>Magazzino</p>
                            </Link>
                        </button>
                        <button className={styles.button}>
                            <Link href="/utenti">
                                <p>Utenti</p>
                            </Link>
                        </button>
                        <button className={styles.button}>
                            <Link href="/ordiniAdmin">
                                <p>Ordini</p>
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
