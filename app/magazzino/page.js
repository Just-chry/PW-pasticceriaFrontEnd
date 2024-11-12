'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import Header from '@/components/header';
import Hero from '@/components/hero';
import Footer from '@/components/footer';

import styles from './page.module.css';

export default function Prodotti() {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', image: '', quantity: 1, price: '', ingredients: '', description: '', category: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/products', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Errore durante il caricamento dei prodotti. Riprova più tardi.');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.image && newProduct.price && newProduct.ingredients && newProduct.description && newProduct.category) {
      const updatedProducts = [...products, { ...newProduct, id: products.length + 1, quantity: parseInt(newProduct.quantity, 10) }];
      setProducts(updatedProducts);
      setNewProduct({ name: '', image: '', quantity: 1, price: '', ingredients: '', description: '', category: '' });
      setIsOpen(false);
    }
  };

  const handleDeleteProduct = (id) => {
    const confirmDelete = window.confirm('Sei sicuro di voler eliminare il prodotto?');
    if (confirmDelete) {
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct((prevState) => ({ ...prevState, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuantityChange = (id, increment) => {
    const updatedProducts = products.map(product =>
      product.id === id
        ? { ...product, quantity: Math.max(1, (product.quantity || 1) + increment) }
        : product
    );
    setProducts(updatedProducts);
  };

  return (
    <div>
      <header>
        <Header />
      </header>
      <Hero />
      <main className={styles.main}>
        <h1 className={styles.title}>Il nostro magazzino</h1>

        <div className={styles.logoContainer}>
          <Image
            src="/images/logoPasticceria.png"
            alt="Logo C'est La Vie Pasticceria"
            width={200}
            height={100}
            className={styles.logo}
          />
        </div>

        {loading ? (
          <p>Caricamento in corso...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={handleDeleteProduct}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </div>
        )}

        <div className={styles.containerButton}>
          <button className={styles.addButton} onClick={() => setIsOpen(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 480 480"
              width="24"
              height="24"
              fill="#F7AD85">
              <path d="M450 210H270V30a30 30 0 1 0-60 0v180H30a30 30 0 1 0 0 60h180v180a30 30 0 1 0 60 0V270h180a30 30 0 1 0 0-60Z"></path>
            </svg>
            <p>Aggiungi Prodotto</p>
          </button>
        </div>

        {isOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <span className={styles.close} onClick={() => setIsOpen(false)}>
                &times;
              </span>
              <h2>Aggiungi un Nuovo Prodotto</h2>
              <input
                type="text"
                placeholder="Nome del Prodotto"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className={styles.input}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={styles.fileInput}
              />
              <input
                type="text"
                placeholder="Prezzo"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Ingredienti"
                value={newProduct.ingredients}
                onChange={(e) => setNewProduct({ ...newProduct, ingredients: e.target.value })}
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Descrizione"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Categoria"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className={styles.input}
              />

              <input
                type="number"
                placeholder="Quantità"
                value={newProduct.quantity}
                onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value, 10) })}
                className={styles.input}
              />

              {newProduct.image && (
                <div className={styles.imagePreview}>
                  <Image
                    src={newProduct.image}
                    alt="Anteprima Immagine"
                    width={100}
                    height={100}
                    className={styles.imagePreviewImg}
                  />
                </div>
              )}
              <button onClick={handleAddProduct} className={styles.submitButton}>
                Aggiungi
              </button>
            </div>
          </div>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

function ProductCard({ product, onDelete, onQuantityChange }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={300}
          className={styles.image}
        />
      </div>
      <div className={styles.containerDetails}>
        <h2 className={styles.productName}>{product.name}</h2>
        <p className={styles.productPrice}><span>Prezzo:</span> {product.price}€</p>
        <p className={styles.productIngredients}><span>Ingredienti:</span> {product.ingredients ? product.ingredients.join(', ') : 'Non disponibili'}</p>
        <p className={styles.productDescription}><span>Descrizione:</span> {product.description}</p>
        <p className={styles.productCategory}><span>Categoria:</span> {product.category}</p>
        <div className={styles.quantityControls}>
          <button onClick={() => onQuantityChange(product.id, -1)} className={styles.quantityButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="#F3BC9F">
              <path d="M20 11H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1Z"></path>
            </svg>
          </button>
          <span className={styles.quantityDisplay}>{product.quantity}</span>
          <button onClick={() => onQuantityChange(product.id, 1)} className={styles.quantityButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 480 480"
              width="24"
              height="24"
              fill="#F3BC9F">
              <path d="M450 210H270V30a30 30 0 1 0-60 0v180H30a30 30 0 1 0 0 60h180v180a30 30 0 1 0 60 0V270h180a30 30 0 1 0 0-60Z"></path>
            </svg>
          </button>
        </div>
      </div>
      <button className={styles.deleteButton} onClick={() => onDelete(product.id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="#000">
          <path d="m5 7 1 14h12l1-14H5z" fill="#F3BC9F"></path>
          <path d="M20 6h-4V4.5A2.5 2.5 0 0 0 13.5 2h-3A2.5 2.5 0 0 0 8 4.5V6H4c-.55 0-1 .45-1 1s.45 1 1 1h.12l.73 11.66A2.49 2.49 0 0 0 7.35 22h9.3c1.32 0 2.41-1.03 2.5-2.34L19.88 8H20c.55 0 1-.45 1-1s-.45-1-1-1ZM10 4.5c0-.28.22-.5.5-.5h3c.28 0 .5.22.5.5V6h-4V4.5Zm7.15 15.03a.51.51 0 0 1-.5.47h-9.3a.51.51 0 0 1-.5-.47L6.13 8h11.74l-.72 11.53ZM10 10c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1s1-.45 1-1v-6c0-.55-.45-1-1-1ZM14 10c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1s1-.45 1-1v-6c0-.55-.45-1-1-1Z"></path>
        </svg>
      </button>
    </div>
  );
}
