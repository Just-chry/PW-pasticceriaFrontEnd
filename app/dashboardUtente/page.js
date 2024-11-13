"use client";

import { useState, useEffect } from 'react';
import Footer from '@/components/footer';
import styles from '@/app/dashboardUtente/page.module.css';

export default function PersonalArea() {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState({ password: false });
    const [newPhone, setNewPhone] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

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
                    setUser(userData);
                    setNewPhone(userData.phone || '');
                    setNewEmail(userData.email || '');
                } else {
                    throw new Error('Errore durante il recupero dei dati utente');
                }
            } catch (error) {
                console.error('Errore durante la richiesta:', error);
            }
        };

        fetchUserData();
    }, []);

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
            console.error('Errore durante il salvataggio:', error);
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
            console.error('Errore durante il salvataggio:', error);
        }
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
                throw new Error("Errore durante il salvataggio della password");
            }

            setEditMode((prev) => ({ ...prev, password: false }));
            setOldPassword('');
            setNewPassword('');
        } catch (error) {
            console.error('Errore durante il salvataggio della password:', error);
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
                    <h2>Profilo Utente</h2>
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
                            {user.email ? (
                                <span>{user.email}</span>
                            ) : (
                                <div className={styles.editField}>
                                    <input
                                        type="email"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        placeholder="Aggiungi email"
                                    />
                                    <button className={styles.button} onClick={handleSaveEmail}>Aggiungi</button>
                                </div>
                            )}
                        </div>
                        <div className={styles.profileField}>
                            <label>Telefono:</label>
                            {user.phone ? (
                                <span>{user.phone}</span>
                            ) : (
                                <div className={styles.editField}>
                                    <input
                                        type="tel"
                                        value={newPhone}
                                        onChange={(e) => setNewPhone(e.target.value)}
                                        placeholder="Aggiungi telefono"
                                    />
                                    <button className={styles.button} onClick={handleSavePhone}>Aggiungi</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <h2>Modifica Password</h2>
                    <div className={styles.profileSection}>
                        {editMode.password && (
                            <>
                                <div className={styles.profileField}>
                                    <label>Vecchia Password:</label>
                                    <div className={styles.editField}>
                                        <input
                                            type="password"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={styles.profileField}>
                                    <label>Nuova Password:</label>
                                    <div className={styles.editField}>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        <button className={styles.button} onClick={handleSavePassword}>Salva</button>
                                    </div>
                                    {passwordError && <p className={styles.error}>{passwordError}</p>}
                                </div>
                            </>
                        )}
                        {!editMode.password && (
                            <div className={styles.fieldWithButton}>
                                <button className={styles.button} onClick={() => handleEditClick('password')}>
                                    Modifica Password
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </>
    );
}
