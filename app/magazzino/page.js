// page.js
"use client";

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import Header from '@/components/header';
import Hero from '@/components/hero';
import Footer from '@/components/footer';



const initialProducts = [
  { id: 1, name: 'Torta Sacher', image: '/images/tortasacker.png', quantity: 1 },
  { id: 2, name: 'Crostata di frutta', image: '/images/crostatadifrutta.png', quantity: 1 },
  { id: 3, name: 'Cheesecake', image: '/images/chesscake.png', quantity: 1 },
  { id: 4, name: 'Millefoglie', image: '/images/millefoglie.png', quantity: 1 },
  { id: 5, name: 'Tiramisù', image: '/images/tiramisu.png', quantity: 1 },
  { id: 6, name: 'Torta Margherita', image: '/images/tortamargherita.png', quantity: 1 },
  { id: 7, name: 'Torta Yogurt', image: '/images/tortayogurt.png', quantity: 1 },
  { id: 8, name: 'Red Velvet Cake', image: '/images/redtorta.png', quantity: 1 },
];


export default function Prodotti() {
  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : initialProducts;
  });

  const [isOpen, setIsOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', image: '', quantity: 1 });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.image) {
      const updatedProducts = [...products, { ...newProduct, id: products.length + 1 }];
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      setNewProduct({ name: '', image: '', quantity: 1 });
      setIsOpen(false);
    }
  };

  const handleDeleteProduct = (id) => {
    const confirmDelete = window.confirm("Sei sicuro di voler eliminare il prodotto?");
    if (confirmDelete) {
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
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
        ? { ...product, quantity: Math.max(1, product.quantity + increment) } // Imposta 1 come quantità minima
        : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  return (
    <div>
      <header>
        <Header />
      </header>
      <Hero />
    <main className={styles.main}>
      <h1 className={styles.title}>IL NOSTRO MAGAZZINO</h1>
      
      {/* Aggiunta del logo sotto il titolo */}
      <div className={styles.logoContainer}>
        <Image
          src="/cestlavie.png"
          alt="Logo C'est La Vie Pasticceria"
          width={200}
          height={100}
          className={styles.logo}
        />
      </div>
      
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
      <button className={styles.addButton} onClick={() => setIsOpen(true)}>
        + Aggiungi Prodotto
      </button>

      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={() => setIsOpen(false)}>&times;</span>
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
            <button onClick={handleAddProduct} className={styles.submitButton}>Aggiungi</button>
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
          width={300}
          height={350}
          className={styles.image}
        />
      </div>
      <h2 className={styles.productName}>{product.name}</h2>
      <div className={styles.quantityControls}>
        <button onClick={() => onQuantityChange(product.id, -1)} className={styles.quantityButton}>-</button>
        <span className={styles.quantityDisplay}>{product.quantity}</span>
        <button onClick={() => onQuantityChange(product.id, 1)} className={styles.quantityButton}>+</button>
      </div>
      <button className={styles.deleteButton} onClick={() => onDelete(product.id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className={styles.deleteIcon}
        >
          <path fill="currentColor" d="M3 6h18v2H3zm4 2h10v14H7zm5-4h-5v2h5zM5 8h14v14H5z"/>
        </svg>
      </button>
    </div>
  );
}
