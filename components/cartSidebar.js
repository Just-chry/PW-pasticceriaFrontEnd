'use client';

import React from 'react';
import styles from './cartSidebar.module.css';
import { useCart } from '../context/CartContext';

export default function CarrelloSidebar({ carrello = [] }) {
  const { isCartOpen, closeCart } = useCart(); // Usa il contesto per controllare l'apertura

  return (
    <div className={`${styles.sidebar} ${isCartOpen ? styles.open : ''}`}>
      <div className={styles.header}>
        <h2>Il tuo carrello ({carrello.length} elemento{carrello.length !== 1 && 'i'})</h2>
        <button className={styles.closeButton} onClick={closeCart}>×</button>
      </div>
      {carrello.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Il carrello è vuoto</p>
        </div>
      ) : (
        <div className={styles.cartContent}>
          {carrello.map((item, index) => (
            <div key={index} className={styles.cartItem}>
              <img src={item.img} alt={item.name} className={styles.itemImage} />
              <div className={styles.itemDetails}>
                <h3>{item.name}</h3>
                <p>{item.price}€</p>
                <div className={styles.quantityControl}>
                  <button>-</button>
                  <span>{item.quantity}</span>
                  <button>+</button>
                </div>
                <button className={styles.removeItem}>Rimuovi articolo</button>
              </div>
            </div>
          ))}
          <div className={styles.total}>
            <p>Subtotale: <span>{carrello.reduce((acc, item) => acc + item.price * item.quantity, 0)}€</span></p>
          </div>
        </div>
      )}
    </div>
  );
}