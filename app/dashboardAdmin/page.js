"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';
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
        return <p>Caricamento in corso...</p>;
    }

    return (
        <>
            <div className={styles.heroContainer}>
                <div className={styles.heroBackground}></div>

                <div className={styles.profileContainer}>
                    <h2>Profilo Admin</h2>
                    <div className={styles.profileSection}>
                        <div className={styles.profileField}>
                            <label>Nome:</label>
                            <span>{user.name}</span>
                        </div>
                        <div className={styles.profileField}>
                            <label>Cognome:</label>
                            <span>{user.surname}</span>
                        </div>
                        <div className={styles.profileField}>
                            <label>Email:</label>
                            <span>{user.email}</span>
                        </div>
                        <div className={styles.profileField}>
                            <label>Telefono:</label>
                            <span>{user.phone}</span>
                        </div>
                    </div>

                    <h2>Modifica Password</h2>
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
                        <h2>Scopri gli ordini di oggi: </h2>
                        <button className={styles.button}>
                            <Link href="/ordiniGiornalieri">
                                <p>Ordini giornalieri</p>
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
