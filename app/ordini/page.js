'use client';

import { useEffect, useState } from 'react';
import styles from './ordini.module.css';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Funzione per caricare gli ordini
    const fetchOrders = async () => {
        try {
            const sessionId = document.cookie.replace(
                /(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/,
                "$1"
            );  // Ottieni il sessionId dai cookie

            const response = await fetch('http://localhost:3000/orders', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionId}`, // Invia sessionId nel header
                },
            });

            if (!response.ok) {
                throw new Error('Errore nel recupero degli ordini');
            }

            const data = await response.json();
            setOrders(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>I tuoi Ordini</h1>

            {loading && <p>Caricamento ordini...</p>}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className={styles.ordersList}>
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order.id} className={styles.orderCard}>
                            <h3>Ordine {order.id}</h3>
                            <p>Data: {order.date}</p>
                            <ul>
                                {order.items.map((item, index) => (
                                    <li key={index}>
                                        <strong>{item.name}</strong>: {item.quantity} x {item.price}€
                                    </li>
                                ))}
                            </ul>
                            <p><strong>Totale: </strong>{order.totalPrice}€</p>
                        </div>
                    ))
                ) : (
                    <p>Non hai ancora effettuato ordini.</p>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;
