"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import format from 'date-fns/format';
import addMinutes from 'date-fns/addMinutes';
import getDay from 'date-fns/getDay';
import isBefore from 'date-fns/isBefore';
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
            const fetchAvailableSlots = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/orders/available-slots?date=${dataRitiro}`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                    });

                    if (!response.ok) {
                        throw new Error("Errore durante il recupero degli orari disponibili. Riprova più tardi.");
                    }

                    // Assumendo che l'API restituisca gli slot in formato "HH:mm"
                    const availableSlots = await response.json();

                    // Converte ciascun slot in un oggetto Date con la stessa data di dataRitiro
                    const convertedSlots = availableSlots.map(slot => {
                        const [hours, minutes] = slot.split(':');
                        const date = new Date(dataRitiro);
                        date.setHours(parseInt(hours, 10));
                        date.setMinutes(parseInt(minutes, 10));
                        date.setSeconds(0);
                        date.setMilliseconds(0);
                        return date;
                    });

                    setOrariDisponibili(convertedSlots);
                } catch (error) {
                    console.error("Errore durante la richiesta:", error);
                }
            };

            fetchAvailableSlots();
        }
    }, [dataRitiro]);





    const handleDataChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (isBefore(selectedDate, today)) {
            alert("Non puoi selezionare una data precedente a quella odierna.");
            setDataRitiro("");
            return;
        }

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
                            <label className={styles.ritiroLabel}>Seleziona data di ritiro:</label>
                            <input type="date" value={dataRitiro} onChange={handleDataChange} className={styles.ritiroDate} min={format(new Date(), 'yyyy-MM-dd')}  />

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
