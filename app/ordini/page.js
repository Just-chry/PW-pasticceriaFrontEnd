'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/header';
import Hero from '@/components/hero';
import Footer from '@/components/footer';
import styles from './page.module.css';

export default function Ordini() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:8080/orders/all', {
                    method: 'GET',
                    credentials: 'include', // Include cookies for authentication
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

        fetchOrders();
    }, []);

    return (
        <div>
            <header>
                <Header />
            </header>
            <Hero />
            <main className={styles.main}>
                <h1 className={styles.title}>Tutti gli Ordini</h1>

                {loading ? (
                    <p>Caricamento in corso...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className={styles.grid}>
                        {orders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))}
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

function OrderCard({ order }) {
    return (
        <div className={styles.card}>
            <h2 className={styles.orderId}>Ordine ID: {order.id}</h2>
            <p className={styles.orderDate}><strong>Data di Ritiro:</strong> {new Date(order.pickupDateTime).toLocaleString()}</p>
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
        </div>
    );
}
