'use client';

import { useRouter } from "next/navigation";
import {useEffect, useState} from 'react';

import Hero from '@/components/hero';

import Footer from '@/components/footer';

import styles from './page.module.css';

export default function OrdiniGiornalieri() {
    const router = useRouter();
    const [userRole, setUserRole] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://localhost:8080/user', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Errore durante il caricamento dei dati utente.');
                }

                const userData = await response.json();
                if (userData.role !== 'admin') {
                    router.push('/not-found');
                } else {
                    setUserRole('admin');
                }
            } catch (error) {
                console.error('Errore:', error.message);
                router.push('/not-found');
            }
        };

        fetchUser();
    }, [router]);

    const [date] = useState(new Date().toISOString().split('T')[0]); 

    useEffect(() => {
        if (userRole === 'admin' && date) {
            const fetchOrders = async () => {
                try {
                    setLoading(true);

                    const response = await fetch(`http://localhost:8080/orders/day/${date}`, {
                        method: 'GET',
                        credentials: 'include',
                    });

                    if (!response.ok) {
                        throw new Error('Errore durante il caricamento degli ordini. Riprova più tardi.');
                    }

                    const ordersData = await response.json();

                    const fetchUsers = async (orders) => {
                        const updatedOrders = await Promise.all(
                            orders.map(async (order) => {
                                const userResponse = await fetch(`http://localhost:8080/user/${order.userId}`, {
                                    method: 'GET',
                                    credentials: 'include',
                                });

                                if (!userResponse.ok) {
                                    throw new Error('Errore durante il caricamento dei dati utente.');
                                }

                                const userData = await userResponse.json();
                                return {
                                    ...order,
                                    user: userData,
                                };
                            })
                        );
                        return updatedOrders;
                    };

                    const ordersWithUserData = await fetchUsers(ordersData);
                    setOrders(ordersWithUserData);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchOrders();
        }
    }, [userRole, date]);


    return (
        <div>
            <Hero/>
            <main className={styles.main}>
                <h1 className={styles.title}>Tutti i ritiri giornalieri</h1>

                {loading ? (
                    <p className={styles.centerdText}>Caricamento in corso...</p>
                ) : error ? (
                    <p className={styles.centerdText}>{error}</p>
                ) : orders.length === 0 ? (
                    <p className={styles.centerdText}>Nessun ritiro presente!</p>
                ) : (
                    <div className={styles.grid}>
                        {orders.map((order) => (
                            <OrderCard key={order.id} order={order} setOrders={setOrders}/>
                        ))}
                    </div>
                )}
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
}

function calculateTotalPrice(products) {
    return products.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
}

function OrderCard({ order, setOrders }) {
    const { user } = order;

    const displayContactInfo = () => {
        if (user) {
            if (user.email && !user.phone) {
                return `Email: ${user.email}`;
            } else if (!user.email && user.phone) {
                return `Telefono: ${user.phone}`;
            } else if (user.email && user.phone) {
                return `Email: ${user.email}`;
            }
        }
        return 'Informazioni di contatto non disponibili';
    };

    const handleAcceptOrder = async () => {
        try {
            const response = await fetch(`http://localhost:8080/orders/accept/${order.id}`, {
                method: 'PUT',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error("Errore durante l'accettazione dell'ordine.");
            }

            alert('Ordine accettato con successo');

            // Aggiorna lo stato dell'ordine in modo che mostri lo stato aggiornato
            setOrders((prevOrders) =>
                prevOrders.map((o) =>
                    o.id === order.id ? { ...o, status: 'accepted' } : o
                )
            );
        } catch (error) {
            console.error('Errore:', error.message);
        }
    };

    const handleRejectOrder = async () => {
        try {
            const response = await fetch(`http://localhost:8080/orders/reject/${order.id}`, {
                method: 'PUT',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error("Errore durante il rifiuto dell'ordine.");
            }

            alert('Ordine rifiutato con successo');

            // Aggiorna lo stato dell'ordine in modo che mostri lo stato aggiornato
            setOrders((prevOrders) =>
                prevOrders.map((o) =>
                    o.id === order.id ? { ...o, status: 'rejected' } : o
                )
            );
        } catch (error) {
            console.error('Errore:', error.message);
        }
    };

    const handleSendNotification = async () => {
        try {
            const response = await fetch(`http://localhost:8080/orders/notify/${order.id}`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Errore durante l\'invio della notifica.');
            }

            alert('Notifica inviata con successo');
        } catch (error) {
            console.error('Errore:', error.message);
        }
    };

    return (
        <div className={styles.card}>
            <h2 className={styles.orderId}>Ordine ID: {order.id}</h2>
            <p className={styles.contactInfo}><strong>Contatto:</strong> {displayContactInfo()}</p>
            <p className={styles.orderDate}><strong>Data di
                Ritiro:</strong> {new Date(order.pickupDateTime).toLocaleString()}</p>
            <p className={styles.orderStatus}><strong>Stato:</strong> {order.status}</p>
            <div className={styles.orderItems}>
                <strong>Prodotti:</strong>
                <ul>
                    {order.products.map((item, index) => (
                        <li key={index}>
                            {item.productName} - Quantità: {item.quantity}
                        </li>
                    ))}
                </ul>
            </div>
            {order.comments && (
                <p className={styles.comments}><strong>Commenti:</strong> {order.comments}</p>
            )}
            <p className={styles.totalPrice}><strong>Totale:</strong> {calculateTotalPrice(order.products)}€</p>
            {order.status === 'pending' && (
                <div className={styles.actionButtons}>
                    <button onClick={handleAcceptOrder} className={styles.acceptButton}>Accetta</button>
                    <button onClick={handleRejectOrder} className={styles.rejectButton}>Rifiuta</button>
                </div>
            )}
            {order.status === 'cart' && (
                <div className={styles.actionButtons}>
                    <button onClick={handleSendNotification} className={styles.notifyButton}>Invia Notifica</button>
                </div>
            )}
        </div>
    );
}
