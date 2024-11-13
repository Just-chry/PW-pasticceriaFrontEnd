'use client'

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function Carrello({ onRemoveItem, }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://localhost:8080/orders', {
          method: "GET",
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error("Errore durante il recupero del carrello. Riprova più tardi.");
        }

        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

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
        }),
      });
  
      if (!response.ok) {
        throw new Error('Errore durante la creazione dell\'ordine. Riprova più tardi.');
      }
  
      alert('Ordine creato con successo.');
      router.push('/cart');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartHeader}>
        <h1>Carrello</h1>
      </div>
      
      {loading ? (
        <p className={styles.centeredText}>Caricamento in corso...</p>
      ) : error ? (
        <p className={styles.centeredText}>{error}</p>
      ) : (
        <div className={styles.cartProducts}>
          {cartItems.length === 0 ? (
            <p className={styles.centeredText}>Il carrello è vuoto. Torna alla pagina dei prodotti per aggiungere articoli.</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className={styles.cartProduct}>
                <img src={item.image} alt={item.name} className={styles.cartProductImage} />
                <div className={styles.cartProductDetails}>
                  <h2>{item.name}</h2>
                  <p>{item.price}€</p>
                  <div className={styles.productQuantityControl}>
                    <button className={styles.quantityDecrease} onClick={() => onRemoveItem(item.id, -1)}>-</button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button className={styles.quantityIncrease} onClick={() => onRemoveItem(item.id, 1)}>+</button>
                  </div>
                  <a href="#" className={styles.removeProduct} onClick={() => onRemoveItem(item.id, item.quantity)}>Rimuovi articolo</a>
                </div>
                <div className={styles.cartProductTotal}>
                  <p><strong>{(item.price * item.quantity).toFixed(2)}€</strong></p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {cartItems.length > 0 && !loading && !error && (
        <div className={styles.cartSummary}>
          <div className={styles.cartSummaryDetails}>
            <h2>Totale Carrello</h2>
            <div className={styles.subtotal}>
              <p>Subtotal</p>
              <p><strong>{cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}€</strong></p>
            </div>
            <div className={styles.shipping}>
              <p>Spedizione</p>
              <p><strong>GRATUITO</strong></p>
              <p>Ritiro in sede (gratis)</p>
              <a href="#">Modifica indirizzo</a>
            </div>
            <div className={styles.shippingMethod}>
              <input type="radio" id="pickup" name="shipping-method" defaultChecked />
              <label htmlFor="pickup">Ritiro in sede (gratis)</label>
            </div>
            <div className={styles.total}>
              <p><strong>Totale</strong></p>
              <p><strong>{cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}€</strong></p>
            </div>
            <button onClick={handleCreateOrder} className={styles.createOrderButton}>Crea Ordine</button>
          </div>
        </div>
      )}
    </div>
  );
}
