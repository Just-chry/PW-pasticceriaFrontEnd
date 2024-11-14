'use client';

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

import Hero from '@/components/hero';

import Footer from '@/components/footer';

import styles from './page.module.css';

export default function OrdiniUtente() {
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
                if (userData.role !== 'user') {
                    router.push('/not-found');
                } else {
                    setUserRole('user');
                }
            } catch (error) {
                console.error('Errore:', error.message);
                router.push('/not-found');
            }
        };

        fetchUser();
    }, [router]);

    useEffect(() => {
        if (userRole === 'user') {
            const fetchUserOrders = async () => {
                try {
                    setLoading(true);
                    const response = await fetch('http://localhost:8080/orders', {
                        method: 'GET',
                        credentials: 'include',
                    });

                    if (!response.ok) {
                        throw new Error('Errore durante il caricamento degli ordini. Riprova più tardi.');
                    }

                    const data = await response.json();
                    setOrders(data);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchUserOrders();
        }
    }, [userRole]);

    const handleDeleteOrder = async (orderId) => {
        try {
            console.log("Tentativo di cancellazione ordine con ID:", orderId);
            const response = await fetch(`http://localhost:8080/orders/cancel/${orderId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Errore durante la cancellazione dell'ordine: ${errorText}`);
            }

            setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));

            alert('Ordine cancellato con successo.');
        } catch (error) {
            console.error("Errore nella cancellazione dell'ordine:", error.message);
            alert(error.message);
        }
    };


    return (
        <div>
            <Hero />
            <main className={styles.main}>
                <h1 className={styles.title}>I tuoi ordini</h1>

                {loading ? (
                    <p className={styles.centerdText}>Caricamento in corso...</p>
                ) : error ? (
                    <p className={styles.centerdText}>{error}</p>
                ) : (
                    <div className={styles.grid}>
                        {orders.length === 0 ? (
                            <p className={styles.centerdText}>Non hai ordini al momento.</p>
                        ) : (
                            orders.map((order) => (
                                <OrderCard key={order.id} order={order} onDeleteOrder={handleDeleteOrder} />
                            ))
                        )}
                    </div>
                )}
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

function calculateTotalPrice(products) {
    return products.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
}

function OrderCard({ order, onDeleteOrder }) {
    return (
        <div className={styles.card}>
            <h2 className={styles.orderId}>Ordine ID: {order.id}</h2>
            {order.status !== 'cart' && (
                <p className={styles.orderDate}><strong>Data di Ritiro:</strong> {new Date(order.pickupDateTime).toLocaleString()}</p>
            )}            <p className={styles.orderStatus}><strong>Stato:</strong> {order.status}</p>
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

            {(order.status === 'cart' || order.status === 'pending') && (
                <div className={styles.actionButtons}>
                    <button onClick={() => onDeleteOrder(order.id)} className={styles.deleteButton}>
                        Cancella Ordine
                    </button>
                </div>
            )}
        </div>
    );
}
