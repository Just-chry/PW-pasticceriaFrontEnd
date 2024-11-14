"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import format from 'date-fns/format';
import addMinutes from 'date-fns/addMinutes';
import getDay from 'date-fns/getDay';
import styles from '@/app/cart/page.module.css';

export default function Cart() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dataRitiro, setDataRitiro] = useState("");
    const [orarioRitiro, setOrarioRitiro] = useState("");
    const [orariDisponibili, setOrariDisponibili] = useState([]);
    const [comments, setComments] = useState("");
    const [dayOfWeek, setDayOfWeek] = useState(null);
    const router = useRouter();

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
                    if (userData.role !== 'user') {
                        router.push('/not-found');
                    } else {
                        fetchCart(); // Carica il carrello solo se il ruolo dell'utente è corretto
                    }
                } else {
                    throw new Error('Errore durante il recupero dei dati utente');
                }
            } catch (error) {
                console.error('Errore durante la richiesta:', error);
                router.push('/not-found');
            }
        };

        const fetchCart = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:8080/orders/cart', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error("Errore durante il recupero del carrello. Riprova più tardi.");
                }

                const data = await response.json();
                setCart(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [router]);

    useEffect(() => {
        if (dataRitiro) {
            const giornoSelezionato = new Date(dataRitiro);
            const dayOfWeekSelected = getDay(giornoSelezionato);
            setDayOfWeek(dayOfWeekSelected);

            if (dayOfWeekSelected === 1) {
                setOrariDisponibili([]);
                return;
            }

            const orariGenerati = [];
            let orarioCorrente = new Date(giornoSelezionato.setHours(9, 0, 0, 0));
            const orarioChiusuraMattina = new Date(giornoSelezionato.setHours(13, 0, 0, 0));

            while (orarioCorrente < orarioChiusuraMattina) {
                orariGenerati.push(new Date(orarioCorrente));
                orarioCorrente = addMinutes(orarioCorrente, 10);
            }

            orarioCorrente = new Date(giornoSelezionato.setHours(15, 0, 0, 0));
            const orarioChiusuraPomeriggio = new Date(giornoSelezionato.setHours(19, 0, 0, 0));

            while (orarioCorrente < orarioChiusuraPomeriggio) {
                orariGenerati.push(new Date(orarioCorrente));
                orarioCorrente = addMinutes(orarioCorrente, 10);
            }

            setOrariDisponibili(orariGenerati);
        }
    }, [dataRitiro]);

    const handleDataChange = (e) => {
        setDataRitiro(e.target.value);
        setOrarioRitiro("");
    };

    const handleOrarioChange = (e) => {
        setOrarioRitiro(e.target.value);
    };

    const handleCommentsChange = (e) => {
        setComments(e.target.value);
    };

    const handleCreateOrder = async () => {
        try {
            const response = await fetch('http://localhost:8080/orders/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    pickupDate: dataRitiro,
                    pickupTime: orarioRitiro,
                    comments: comments,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            alert('Ordine creato con successo.');
            router.push('/ordiniUtente');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h1 className={styles.cartTitle}>Il Tuo Carrello</h1>
            {loading ? (
                <p>Caricamento in corso...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                cart && (
                    <div className={styles.cartContainer}>
                        <ul className={styles.cartList}>
                            {cart.products.map((item) => (
                                <li key={item.productId} className={styles.cartListItem}>
                                    <h3>{item.productName}</h3>
                                    <p>Quantità: {item.quantity}</p>
                                    <p>Prezzo: {item.price}€</p>
                                </li>
                            ))}
                        </ul>
                        <div className={styles.orderDetails}>
                            <label className={styles.ritiroLabel}>Seleziona data di ritiro:</label>
                            <input
                                type="date"
                                value={dataRitiro}
                                onChange={handleDataChange}
                                className={styles.ritiroDate}
                            />

                            {dataRitiro && orariDisponibili.length > 0 ? (
                                <>
                                    <label className={styles.ritiroLabel}>Seleziona orario di ritiro:</label>
                                    <select
                                        value={orarioRitiro}
                                        onChange={handleOrarioChange}
                                        className={styles.ritiroTime}
                                    >
                                        <option value="">Seleziona un orario</option>
                                        {orariDisponibili.map((orario, index) => (
                                            <option key={index} value={format(orario, 'HH:mm')}>
                                                {format(orario, 'HH:mm')}
                                            </option>
                                        ))}
                                    </select>
                                </>
                            ) : dayOfWeek === 1 ? (
                                <p className={styles.negocioClosedMessage}>
                                    Il negozio è chiuso il lunedì. Seleziona un altro giorno.
                                </p>
                            ) : null}

                            <label className={styles.ritiroLabel}>Commenti:</label>
                            <textarea
                                value={comments}
                                onChange={handleCommentsChange}
                                className={styles.comments}
                            />

                            <button onClick={handleCreateOrder} className={styles.createOrderButton}>
                                Crea Ordine
                            </button>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}
