"use client";

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
  const [quantity, setQuantity] = useState(1);
  const [showCartButtons, setShowCartButtons] = useState(false);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await fetch('http://localhost:8080/user', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const userData = await response.json();
          if (userData.role !== 'user' && userData.role !== 'admin') {
            router.push('/not-found'); 
          }
        } else {
          router.push('/login'); 
          setTimeout(() => {
            alert("Devi prima fare il login"); 
          }, 1000);
        }
      } catch (error) {
        console.error('Errore di rete:', error);
      }
    };

    checkUserSession();
  }, [router]);

  useEffect(() => {
    if (!id) return;

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
          quantity: quantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Errore durante l'aggiunta del prodotto al carrello. Riprova più tardi.");
      }

      alert('Prodotto aggiunto al carrello con successo.');
      setShowCartButtons(true);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleContinueShopping = () => {
    router.push('/productsCategory');;
  };

  const handleViewCart = () => {
    router.push('/cart');
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (isNaN(value)) {
      setQuantity(0);
    } else if (value > 0 && value <= product.quantity) {
      setQuantity(value);
    } else if (value > product.quantity) {
      setQuantity(product.quantity);
    }
  };

  const handleButtonChange = (change) => {
    setQuantity(prevQuantity => {
      const newQuantity = prevQuantity + change;
      if (newQuantity >= 1 && newQuantity <= product.quantity) {
        return newQuantity;
      }
      return prevQuantity;
    });
  };

  const handleBlur = () => {
    if (quantity === 0) {
      setQuantity(1);
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
        product && (
          <div className={styles.productContainer}>
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
              <div className={styles.quantityInputContainer}>
                <label htmlFor="quantity" className={styles.quantityLabel}>Quantità:</label>

                <div className={styles.quantityControls}>
                  <button onClick={() => handleButtonChange(-1)} className={styles.quantityButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="#F3BC9F">
                      <path d="M20 11H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1Z"></path>
                    </svg>
                  </button>

                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    max={product.quantity}
                    value={quantity === 0 ? "" : quantity}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={styles.quantityInput}
                  />

                  <button onClick={() => handleButtonChange(1)} className={styles.quantityButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" width="20" height="20" fill="#F3BC9F">
                      <path d="M450 210H270V30a30 30 0 1 0-60 0v180H30a30 30 0 1 0 0 60h180v180a30 30 0 1 0 60 0V270h180a30 30 0 1 0 0-60Z"></path>
                    </svg>
                  </button>
                </div>

                <p className={styles.availableQuantity}>Quantità disponibile: {product.quantity}</p>
              </div>
              <button onClick={handleAddToCart} className={styles.productButton}>
                Aggiungi al carrello
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width='30' height='30' fill="#000">
                  <path d="M5 8h16l-2 7H7L5 8z" fill="#F3BC9F"></path>
                  <path d="M9 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM17 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM21 7H5.75l-.79-2.77A1 1 0 0 0 4 3.5H3c-.55 0-1 .45-1 1s.45 1 1 1h.25l2.48 8.69A2.5 2.5 0 0 0 8.13 16h9.74a2.5 2.5 0 0 0 2.4-1.81l1.69-5.91A1 1 0 0 0 21 7Zm-2.65 6.64a.5.5 0 0 1-.48.36H8.13a.5.5 0 0 1-.48-.36L6.33 9h13.35l-1.33 4.64Z"></path>
                </svg>
              </button>
              {showCartButtons && (
                <div className={styles.cartButtonsContainer}>
                  <button onClick={handleContinueShopping} className={styles.continueShoppingButton}>
                    Continua ad acquistare
                  </button>
                  <button onClick={handleViewCart} className={styles.viewCartButton}>
                    Visualizza il carrello
                  </button>
                </div>
              )}
            </div>
          </div>
        )
      )}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
