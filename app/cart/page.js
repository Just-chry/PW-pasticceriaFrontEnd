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
    const [orariPrenotati, setOrariPrenotati] = useState([]);
    const [comments, setComments] = useState("");
    const [dayOfWeek, setDayOfWeek] = useState(null);
    const [storeClosedMessage, setStoreClosedMessage] = useState(""); // Nuovo stato per il messaggio
    const router = useRouter();

    const today = format(new Date(), 'yyyy-MM-dd');

    // Funzione per verificare se un orario è valido (cioè non passato)
    const isTimeValid = (time) => {
        const now = new Date();
        now.setSeconds(0, 0); // Resetta i secondi e i millisecondi
        return time >= now;
    };

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
                setOrariDisponibili([]); // Se è lunedì, non ci sono orari disponibili
                setStoreClosedMessage("Il negozio è chiuso il lunedì. Seleziona un altro giorno.");
                return;
            } else {
                setStoreClosedMessage(""); // Resetta il messaggio se il giorno selezionato non è lunedì
            }

            const orariGenerati = [];
            let orarioCorrente = new Date(giornoSelezionato.setHours(9, 0, 0, 0));
            const orarioChiusuraMattina = new Date(giornoSelezionato.setHours(13, 0, 0, 0));

            while (orarioCorrente < orarioChiusuraMattina) {
                if (isTimeValid(orarioCorrente)) {
                    orariGenerati.push(new Date(orarioCorrente));
                }
                orarioCorrente = addMinutes(orarioCorrente, 10);
            }

            orarioCorrente = new Date(giornoSelezionato.setHours(15, 0, 0, 0));
            const orarioChiusuraPomeriggio = new Date(giornoSelezionato.setHours(19, 0, 0, 0));

            while (orarioCorrente < orarioChiusuraPomeriggio) {
                if (isTimeValid(orarioCorrente)) {
                    orariGenerati.push(new Date(orarioCorrente));
                }
                orarioCorrente = addMinutes(orarioCorrente, 10);
            }

            setOrariDisponibili(orariGenerati);
            fetchBookedTimes(giornoSelezionato); // Chiamata per ottenere gli orari prenotati
        }
    }, [dataRitiro]);

    // Funzione per ottenere gli orari prenotati per la data selezionata
    const fetchBookedTimes = async (selectedDate) => {
        try {
            const response = await fetch(`http://localhost:8080/orders/booking-times?date=${format(selectedDate, 'yyyy-MM-dd')}`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setOrariPrenotati(data); // Imposta gli orari prenotati
            } else {
                throw new Error("Errore durante il recupero degli orari prenotati");
            }
        } catch (error) {
            console.error('Errore durante la richiesta:', error);
        }
    };

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

    const handleDeleteProduct = async (productId) => {
        const confirmed = confirm('Sei sicuro di voler rimuovere questo prodotto dal carrello?');
        if (!confirmed) return;

        try {
            const response = await fetch(`http://localhost:8080/orders/delete/${productId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error("Errore durante la rimozione del prodotto dal carrello. Riprova più tardi.");
            }

            alert('Prodotto rimosso dal carrello con successo.');
            setCart((prevCart) => ({
                ...prevCart,
                products: prevCart.products.filter((item) => item.productId !== productId),
            }));
        } catch (error) {
            alert(error.message);
        }
    };

    const isTimeBooked = (time) => {
        return orariPrenotati.some((bookedTime) => format(bookedTime, 'HH:mm') === time);
    };

    return (
        <div className={styles.cartWrapper}>
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
                                    <button
                                        onClick={() => handleDeleteProduct(item.productId)}
                                        className={styles.deleteButton}
                                    >
                                        - Rimuovi
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className={styles.orderDetails}>
                            <div className={styles.dateBlock}>
                                <label className={styles.ritiroLabel}>Seleziona data di ritiro:</label>
                                <input
                                    type="date"
                                    value={dataRitiro}
                                    onChange={handleDataChange}
                                    className={styles.ritiroDate}
                                    min={today} // Impedisce la selezione di date precedenti a oggi
                                />
                            </div>

                            {/* Aggiungi il messaggio per il lunedì */}
                            {storeClosedMessage && (
                                <p className={styles.storeClosedMessage}>{storeClosedMessage}</p>
                            )}

                            {dataRitiro && orariDisponibili.length > 0 && (
                                <div className={styles.timeBlock}>
                                    <label className={styles.ritiroLabel}>Seleziona orario di ritiro:</label>
                                    <select
                                        value={orarioRitiro}
                                        onChange={handleOrarioChange}
                                        className={styles.ritiroOrario}
                                    >
                                        <option value="">-- Seleziona orario --</option>
                                        {orariDisponibili.map((orario, index) => {
                                            const orarioFormatted = format(orario, 'HH:mm');
                                            return (
                                                <option
                                                    key={index}
                                                    value={orarioFormatted}
                                                    disabled={isTimeBooked(orario)}
                                                >
                                                    {orarioFormatted} {isTimeBooked(orario) && '(Prenotato)'}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            )}

                            <div className={styles.commentsBlock}>
                                <label className={styles.ritiroLabel}>Aggiungi un commento:</label>
                                <textarea
                                    value={comments}
                                    onChange={handleCommentsChange}
                                    className={styles.commentsTextarea}
                                    placeholder="Scrivi un commento..."
                                />
                            </div>

                            <button
                                className={styles.createOrderButton}
                                onClick={handleCreateOrder}
                                disabled={!dataRitiro || !orarioRitiro}
                            >
                                Crea ordine
                            </button>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}
