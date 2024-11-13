'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Hero from '@/components/hero';
import Footer from '@/components/footer';

import styles from '@/app/products/[id]/page.module.css';

export default function Product() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await fetch('http://localhost:8080/user', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          router.push('/login'); // Esegui il reindirizzamento
          setTimeout(() => {
            alert("Devi prima fare il login"); // Mostra l'alert dopo un breve intervallo
          }, 500);
        }
      } catch (error) {
        console.error('Errore di rete:', error);
      }
    };

    checkUserSession();
  }, [router]);



  useEffect(() => {
    if (!id || !product) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:8080/products/${id}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Errore durante il recupero del prodotto. Riprova più tardi.');
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const response = await fetch('http://localhost:8080/orders/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Errore durante l'aggiunta del prodotto al carrello. Riprova più tardi.");
      }

      alert('Prodotto aggiunto al carrello con successo.');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
      <div>
        <Hero />
        {error ? (
            <div>
              <p className={styles.centerdText}>Errore durante il caricamento del prodotto. Riprova più tardi.</p>
            </div>
        ) : loading ? (
            <div className={styles.centerdText}>Caricamento in corso...</div>
        ) : (
            <div className={styles.productContainer}>
              {product.length === 0 ? (
                  <p className={styles.centerdText}>Prodotto non trovato. Torna presto per nuovi dolci!</p>
              ) : (
                  <>
                    <div className={styles.productImageWrapper}>
                      <img src={product.image} alt={product.name} width='800' height='600' className={styles.productImage} />
                    </div>
                    <div className={styles.productDetails}>
                      <div className={styles.titleAndPrice}>
                        <h1 className={styles.productTitle}>{product.name}</h1>
                        <p className={styles.productPrice}>{product.price}€</p>
                      </div>
                      <div className={styles.descriptionAndingredients}>
                        <p className={styles.productDescription}><span>Descrizione:</span> {product.description ? product.description : 'Non disponibile'}</p>
                        <p className={styles.productIngredients}><span>Ingredienti:</span> {product.ingredients ? product.ingredients.join(', ') : 'Non disponibili'}</p>
                      </div>
                      <div className={styles.quantityContainer}>
                        <button onClick={() => handleQuantityChange(-1)} className={styles.quantityButton}>
                          -
                        </button>
                        <span className={styles.quantityDisplay}>{product.quantity}</span>
                        <button onClick={() => handleQuantityChange(1)} className={styles.quantityButton}>
                          +
                        </button>
                      </div>
                    </div>
                    <button onClick={handleAddToCart} className={styles.productButton}>
                      Aggiungi al carrello
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width='30' height='30' fill="#000">
                        <path d="M5 8h16l-2 7H7L5 8z" fill="#F3BC9F"></path>
                        <path d="M9 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM17 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM21 7H5.75l-.79-2.77A1 1 0 0 0 4 3.5H3c-.55 0-1 .45-1 1s.45 1 1 1h.25l2.48 8.69A2.5 2.5 0 0 0 8.13 16h9.74a2.5 2.5 0 0 0 2.4-1.81l1.69-5.91A1 1 0 0 0 21 7Zm-2.65 6.64a.5.5 0 0 1-.48.36H8.13a.5.5 0 0 1-.48-.36L6.33 9h13.35l-1.33 4.64Z"></path>
                      </svg>
                    </button>
                  </>
              )}
            </div>
        )}
        <footer>
          <Footer />
        </footer>
      </div>
  );
}
