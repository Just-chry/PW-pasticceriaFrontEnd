"use client";

import { useState, useEffect } from 'react';

import Header from '@/app/dashboardUtente/components/header';
import Footer from '@/components/footer';

import styles from '@/app/dashboardUtente/page.module.css'

export default function PersonalArea() {
    // Carica i dati utente da Local Storage al primo caricamento della pagina
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : {
            name: 'Mario',
            surname: 'Rossi',
            email: 'mario.rossi@example.com',
            phone: '+39123456789',
        };
    });

    const [editMode, setEditMode] = useState({
        email: false,
        phone: false,
        password: false,
    });

    const [newEmail, setNewEmail] = useState(user.email);
    const [newPhone, setNewPhone] = useState(user.phone);
    const [newPassword, setNewPassword] = useState('');

    // Funzione per salvare i dati utente in Local Storage
    const saveUserToLocalStorage = (updatedUser) => {
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const handleEditClick = (field) => {
        setEditMode(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleSaveClick = (field) => {
        const updatedUser = { ...user };

        if (field === 'email') {
            updatedUser.email = newEmail;
        } else if (field === 'phone') {
            updatedUser.phone = newPhone;
        }

        // Aggiorna lo stato dell'utente e salva in Local Storage
        setUser(updatedUser);
        saveUserToLocalStorage(updatedUser);

        // Disattiva la modalità di modifica
        setEditMode(prev => ({
            ...prev,
            [field]: false
        }));
    };

    useEffect(() => {
        // Aggiorna i campi di modifica con i valori attuali quando i dati utente cambiano
        setNewEmail(user.email);
        setNewPhone(user.phone);
    }, [user]);

    return (
        <>
            <Header/>
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
                            {editMode.email ? (
                                <div className={styles.editField}>
                                    <input
                                        type="email"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                    />
                                    <button className={styles.button} onClick={() => handleSaveClick('email')}>Salva</button>
                                </div>
                            ) : (
                                <div className={styles.fieldWithButton}>
                                    <span>{user.email}</span>
                                    <button className={styles.button} onClick={() => handleEditClick('email')}>Modifica</button>
                                </div>
                            )}
                        </div>
                        <div className={styles.profileField}>
                            <label>Telefono:</label>
                            {editMode.phone ? (
                                <div className={styles.editField}>
                                    <input
                                        type="tel"
                                        value={newPhone}
                                        onChange={(e) => setNewPhone(e.target.value)}
                                    />
                                    <button className={styles.button} onClick={() => handleSaveClick('phone')}>Salva</button>
                                </div>
                            ) : (
                                <div className={styles.fieldWithButton}>
                                    <span>{user.phone}</span>
                                    <button className={styles.button} onClick={() => handleEditClick('phone')}>Modifica</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <h2>Modifica Password</h2>
                    <div className={styles.profileSection}>
                        <div className={styles.profileField}>
                            <label>Nuova Password:</label>
                            {editMode.password ? (
                                <div className={styles.editField}>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <button className={styles.button} onClick={() => {
                                        // Qui puoi aggiungere la logica per aggiornare la password
                                        console.log('Password aggiornata:', newPassword);
                                        setEditMode(prev => ({ ...prev, password: false }));
                                        setNewPassword('');
                                    }}>Salva</button>
                                </div>
                            ) : (
                                <div className={styles.fieldWithButton}>
                                    <button className={styles.button} onClick={() => handleEditClick('password')}>Modifica Password</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}
