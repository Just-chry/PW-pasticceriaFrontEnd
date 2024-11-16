"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

import Image from 'next/image';

import Hero from '@/components/hero';

import Footer from '@/components/footer';

import styles from './page.module.css';

export default function Prodotti() {
    const router = useRouter();
    const [userRole, setUserRole] = useState(null);
    const [products, setProducts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editProductModal, setEditProductModal] = useState({ isOpen: false, product: null });
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [newProduct, setNewProduct] = useState({
        name: '',
        image: '',
        quantity: 1,
        price: '',
        ingredients: '',
        description: '',
        category: '',
        isVisible: true
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://localhost:8080/user', {
                    method: 'GET',
                    credentials: 'include'
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

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8080/products/admin', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Errore durante il caricamento dei prodotti. Riprova più tardi.');
            }

            const data = await response.json();
            const productsWithVisibility = data.map(product => ({
                ...product,
                isVisible: product.is_visible
            }));
            setProducts(productsWithVisibility);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchProductsByCategory = async (category) => {
        try {
            setLoading(true);
            let url = 'http://localhost:8080/products/admin';

            if (category !== 'All') {
                url = `http://localhost:8080/products/category/admin?category=${category}`;
            }

            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Errore durante il caricamento dei prodotti. Riprova più tardi.');
            }

            const data = await response.json();
            const productsWithVisibility = data.map(product => ({
                ...product,
                isVisible: product.is_visible
            }));
            setProducts(productsWithVisibility);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (userRole === 'admin') {
            fetchProductsByCategory(selectedCategory);
        }
    }, [userRole, selectedCategory]);


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProduct((prevState) => ({ ...prevState, image: file, previewImage: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };


    const handleAddProduct = async () => {
        if (
            !newProduct.name ||
            !newProduct.image ||
            !newProduct.price ||
            isNaN(newProduct.price.replace(",", ".")) ||
            !newProduct.ingredients ||
            !newProduct.description ||
            !newProduct.category ||
            !newProduct.quantity
        ) {
            alert('Per favore, compila tutti i campi e inserisci un prezzo valido.');
            return;
        }

        try {
            if (newProduct.image) {
                const fileReader = new FileReader();
                fileReader.onloadend = async () => {
                    const base64Image = fileReader.result;

                    const productData = {
                        name: newProduct.name,
                        image: base64Image,
                        quantity: newProduct.quantity,
                        price: parseFloat(newProduct.price.replace(",", ".")),
                        ingredientNames: newProduct.ingredients.split(",").map(ingredient => ingredient.trim()),
                        description: newProduct.description,
                        category: newProduct.category,
                        isVisible: newProduct.isVisible ? 1 : 0,
                    };

                    const response = await fetch('http://localhost:8080/products/add', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(productData),
                    });

                    if (!response.ok) {
                        throw new Error('Errore durante l\'aggiunta del prodotto. Riprova più tardi.');
                    }

                    setNewProduct({
                        name: '',
                        image: '',
                        quantity: 1,
                        price: '',
                        ingredients: '',
                        description: '',
                        category: '',
                        isVisible: true,
                    });
                    setIsOpen(false);

                    await fetchProductsByCategory(selectedCategory);
                };

                fileReader.readAsDataURL(newProduct.image);
            } else {
                alert('Seleziona un\'immagine per il prodotto.');
            }
        } catch (error) {
            console.error('Errore:', error.message);
            alert(`Errore durante l'aggiunta del prodotto: ${error.message}`);
        }
    };


    const handleModifyProduct = (product) => {
        setEditProductModal({ isOpen: true, product });
    };

    const handleEditProductChange = (e) => {
        const { name, value } = e.target;
        setEditProductModal((prevState) => {
            if (name === "price") {
                const formattedValue = value.replace(",", ".");

                return {
                    ...prevState,
                    product: {
                        ...prevState.product,
                        [name]: formattedValue === "" ? "" : formattedValue,
                    },
                };
            }

            return {
                ...prevState,
                product: {
                    ...prevState.product,
                    [name]: value,
                },
            };
        });
    };

    const handleEditProductSave = async () => {
        try {
            const { product } = editProductModal;

            if (!product.price || isNaN(parseFloat(product.price))) {
                alert("Inserisci un prezzo valido.");
                return;
            }

            const updatedProductData = {
                ...product,
                ingredientNames: Array.isArray(product.ingredients)
                    ? product.ingredients
                    : product.ingredients.split(",").map(ingredient => ingredient.trim()),
                isVisible: product.isVisible ? 1 : 0
            };

            const response = await fetch(`http://localhost:8080/products/${product.id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProductData),
            });

            if (!response.ok) {
                throw new Error('Errore durante la modifica del prodotto. Riprova più tardi.');
            }

            await fetchProducts();

            setEditProductModal({ isOpen: false, product: null });
        } catch (error) {
            console.error('Errore:', error.message);
            alert(`Errore durante la modifica del prodotto: ${error.message}`);
        }
    };

    const handleDeleteProduct = async (id) => {
        const confirmDelete = window.confirm('Sei sicuro di voler eliminare il prodotto?');
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:8080/products/${id}`, {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Errore durante l'eliminazione del prodotto: ${id}`);
                }

                const updatedProducts = products.filter(product => product.id !== id);
                setProducts(updatedProducts);

                alert(`Prodotto con ID ${id} rimosso con successo`);

            } catch (error) {
                console.error(error.message);
                alert(`Errore durante l'eliminazione del prodotto: ${error.message}`);
            }
        }
    };

    const handleQuantityChange = async (id, increment) => {
        try {
            const url = increment > 0
                ? `http://localhost:8080/products/${id}/increment`
                : `http://localhost:8080/products/${id}/decrement`;

            const response = await fetch(url, {
                method: increment > 0 ? 'PUT' : 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Errore durante aggiornamento della quantità del prodotto.');
            }

            setProducts((prevProducts) =>
                prevProducts.map(product =>
                    product.id === id
                        ? { ...product, quantity: product.quantity + increment }
                        : product
                )
            );

        } catch (error) {
            console.error(error.message);
        }
    };

    const handleVisibilityChange = async (id, isVisible) => {
        try {
            const response = await fetch(`http://localhost:8080/products/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isVisible }),
            });

            if (!response.ok) {
                throw new Error(`Errore durante l'aggiornamento della visibilità del prodotto con ID ${id}`);
            }

            setProducts((prevProducts) =>
                prevProducts.map(product =>
                    product.id === id ? { ...product, isVisible: isVisible } : product
                )
            );

        } catch (error) {
            console.error(error.message);
            alert(`Errore durante l'aggiornamento della visibilità del prodotto: ${error.message}`);
        }
    };

    const handleNewProductQuantityChange = (increment) => {
        setNewProduct((prevState) => {
            const newQuantity = prevState.quantity + increment;
            return {
                ...prevState,
                quantity: newQuantity >= 1 ? newQuantity : 1,
            };
        });
    };


    return (
        <div>
            <Hero />
            <main className={styles.main}>
                <h1 className={styles.title}>Il nostro magazzino</h1>
                <div className={styles.categoryButtons}>
                    <button
                        onClick={() => handleCategoryChange('All')}
                        className={`${styles.categoryButton} ${selectedCategory === 'All' ? styles.activeCategoryButton : ''}`}
                    >
                        Tutti
                    </button>
                    <button
                        onClick={() => handleCategoryChange('Macarons')}
                        className={`${styles.categoryButton} ${selectedCategory === 'Macarons' ? styles.activeCategoryButton : ''}`}
                    >
                        Macarons
                    </button>
                    <button
                        onClick={() => handleCategoryChange('Cookies')}
                        className={`${styles.categoryButton} ${selectedCategory === 'Cookies' ? styles.activeCategoryButton : ''}`}
                    >
                        Biscotti
                    </button>
                    <button
                        onClick={() => handleCategoryChange('Jams')}
                        className={`${styles.categoryButton} ${selectedCategory === 'Jams' ? styles.activeCategoryButton : ''}`}
                    >
                        Confetture o Marmellate
                    </button>
                    <button
                        onClick={() => handleCategoryChange('Bars')}
                        className={`${styles.categoryButton} ${selectedCategory === 'Bars' ? styles.activeCategoryButton : ''}`}
                    >
                        Tavolette di Cioccolato
                    </button>
                    <button
                        onClick={() => handleCategoryChange('Cakes')}
                        className={`${styles.categoryButton} ${selectedCategory === 'Cakes' ? styles.activeCategoryButton : ''}`}
                    >
                        Torte
                    </button>
                </div>

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
                                onModify={handleModifyProduct}
                                onDelete={handleDeleteProduct}
                                onQuantityChange={handleQuantityChange}
                                onVisibilityChange={handleVisibilityChange}
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
                            <path
                                d="M450 210H270V30a30 30 0 1 0-60 0v180H30a30 30 0 1 0 0 60h180v180a30 30 0 1 0 60 0V270h180a30 30 0 1 0 0-60Z"></path>
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
                                required
                            />
                            <div className={styles.fileInputContainer}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className={styles.hiddenFileInput}
                                    id="fileInput"
                                />
                                <button
                                    onClick={() => document.getElementById('fileInput').click()}
                                    className={styles.fileButton}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width='24' height='24'
                                        fill="#000">
                                        <path d="M12 15H4v5h16v-5h-8z" fill="#F3BC9F"></path>
                                        <path
                                            d="M20 15c-.55 0-1 .45-1 1v2.5c0 .28-.22.5-.5.5h-13c-.28 0-.5-.22-.5-.5V16c0-.55-.45-1-1-1s-1 .45-1 1v2.5A2.5 2.5 0 0 0 5.5 21h13a2.5 2.5 0 0 0 2.5-2.5V16c0-.55-.45-1-1-1ZM7.71 9.71 11 6.42v9.59c0 .55.45 1 1 1s1-.45 1-1v-9.6l3.29 3.29c.2.2.45.29.71.29s.51-.1.71-.29a1 1 0 0 0 0-1.41l-5-5a1 1 0 0 0-1.41 0l-5 5A1 1 0 1 0 7.71 9.7Z"></path>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width='24' height='24'
                                        fill="#000">
                                        <path d="m3 17 4-4 3.12 3L15 11l6.06 6-1 2H4l-1-2z" fill="#F3BC9F"></path>
                                        <g>
                                            <path
                                                d="M19.5 4h-15A2.5 2.5 0 0 0 2 6.5v11A2.5 2.5 0 0 0 4.5 20h15a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 19.5 4Zm-15 2h15c.28 0 .5.22.5.5v8.09l-4.29-4.29a1 1 0 0 0-1.41 0l-4.29 4.29-2.29-2.29a1 1 0 0 0-1.41 0l-2.29 2.29V6.5c0-.28.22-.5.5-.5Zm15 12h-15a.5.5 0 0 1-.5-.5v-.09l3-3 2.29 2.29a1 1 0 0 0 1.41 0l4.29-4.29 5 5v.09a.5.5 0 0 1-.5.5Z"></path>
                                            <circle cx="9.5" cy="9.5" r="2"></circle>
                                        </g>
                                    </svg>
                                    <p> Carica immagine</p>
                                </button>
                            </div>
                            <input
                                type="text"
                                placeholder="Prezzo"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                className={styles.input}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Ingredienti"
                                value={newProduct.ingredients}
                                onChange={(e) => setNewProduct({ ...newProduct, ingredients: e.target.value })}
                                className={styles.input}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Descrizione"
                                value={newProduct.description}
                                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                className={styles.input}
                                required
                            />
                            <select
                                value={newProduct.category}
                                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                className={styles.input}
                                required
                            >
                                <option value="">Seleziona una categoria</option>
                                <option value="Macarons">Macarons</option>
                                <option value="Cookies">Cookies</option>
                                <option value="Jams">Jams</option>
                                <option value="Bars">Bars</option>
                                <option value="Cakes">Cakes</option>
                            </select>
                            <div className={styles.checkboxContainer}>
                                <input
                                    type="checkbox"
                                    checked={Boolean(newProduct.isVisible)}
                                    onChange={() => setNewProduct({ ...newProduct, isVisible: !newProduct.isVisible })}
                                    className={styles.checkbox}
                                />
                                <label>Rendi visibile il prodotto</label>
                            </div>
                            <label className={styles.labelQuantity}>Quantità:</label>
                            <div className={styles.quantityControls}>
                                <button onClick={() => handleNewProductQuantityChange(-1)}
                                    className={styles.quantityButton}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"
                                        fill="#F3BC9F">
                                        <path
                                            d="M20 11H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1Z"></path>
                                    </svg>
                                </button>
                                <input
                                    type="number"
                                    placeholder="Quantità"
                                    value={newProduct.quantity}
                                    onChange={(e) => setNewProduct({
                                        ...newProduct,
                                        quantity: parseInt(e.target.value, 10)
                                    })}
                                    className={styles.quantityInput}
                                    required
                                />
                                <button onClick={() => handleNewProductQuantityChange(1)}
                                    className={styles.quantityButton}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" width="20" height="20"
                                        fill="#F3BC9F">
                                        <path
                                            d="M450 210H270V30a30 30 0 1 0-60 0v180H30a30 30 0 1 0 0 60h180v180a30 30 0 1 0 60 0V270h180a30 30 0 1 0 0-60Z"></path>
                                    </svg>
                                </button>
                            </div>
                            {newProduct.previewImage ? (
                                <Image
                                    src={newProduct.previewImage}
                                    alt="Anteprima Immagine"
                                    width={100}
                                    height={100}
                                    className={styles.imagePreviewImg}
                                />
                            ) : (
                                <p>Seleziona un'immagine per vedere l'anteprima</p>
                            )}
                            <button onClick={handleAddProduct} className={styles.submitButton}>
                                Aggiungi
                            </button>
                        </div>
                    </div>
                )}

                {editProductModal.isOpen && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <span className={styles.close}
                                onClick={() => setEditProductModal({ isOpen: false, product: null })}>
                                &times;
                            </span>
                            <h2>Modifica Prodotto</h2>
                            {editProductModal.product.image && (
                                <Image
                                    src={editProductModal.product.image}
                                    alt="Immagine del Prodotto"
                                    width={125}
                                    height={100}
                                    className={styles.imagePreviewImg}
                                />
                            )}
                            <input
                                type="text"
                                name="name"
                                placeholder="Nome del Prodotto"
                                value={editProductModal.product.name}
                                onChange={handleEditProductChange}
                                className={styles.input}
                            />
                            <input
                                type="text"
                                name="price"
                                placeholder="Prezzo"
                                value={editProductModal.product.price}
                                onChange={handleEditProductChange}
                                className={styles.input}
                            />
                            <input
                                type="text"
                                name="ingredients"
                                placeholder="Ingredienti"
                                value={Array.isArray(editProductModal.product.ingredients) ? editProductModal.product.ingredients.join(', ') : editProductModal.product.ingredients}
                                onChange={handleEditProductChange}
                                className={styles.input}
                            />
                            <input
                                type="text"
                                name="description"
                                placeholder="Descrizione"
                                value={editProductModal.product.description}
                                onChange={handleEditProductChange}
                                className={styles.input}
                            />
                            <select
                                name="category"
                                value={editProductModal.product.category}
                                onChange={handleEditProductChange}
                                className={styles.input}
                            >
                                <option value="">Seleziona una categoria</option>
                                <option value="Macarons">Macarons</option>
                                <option value="Cookies">Cookies</option>
                                <option value="Jams">Jams</option>
                                <option value="Bars">Bars</option>
                                <option value="Cakes">Cakes</option>
                            </select>

                            <button onClick={handleEditProductSave} className={styles.submitButton}>
                                Salva Modifiche
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

function ProductCard({ product, onModify, onDelete, onQuantityChange, onVisibilityChange }) {
    if (!product) {
        return null;
    }
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                {product.image ? (
                    <Image
                        src={product.image.startsWith('/') ? product.image : `/${product.image}`}
                        alt={product.name}
                        width={400}
                        height={300}
                        className={styles.image}
                    />
                ) : (
                    <p>Immagine non disponibile</p>
                )}
            </div>

            <div className={styles.containerDetails}>
                <h2 className={styles.productName}>{product.name}</h2>
                <p className={styles.productPrice}><span>Prezzo:</span> {product.price}€</p>
                <p className={styles.productIngredients}>
                    <span>Ingredienti:</span> {product.ingredients ? product.ingredients.join(', ') : 'Non disponibili'}
                </p>
                <p className={styles.productDescription}><span>Descrizione:</span> {product.description}</p>
                <p className={styles.productCategory}><span>Categoria:</span> {product.category}</p>
                <div className={styles.visibleAndQuantity}>
                    <div className={styles.checkboxContainer}>
                        <input
                            type="checkbox"
                            checked={Boolean(product.isVisible)}
                            onChange={() => onVisibilityChange(product.id, !product.isVisible)}
                            className={styles.checkbox}
                        />
                        <label>Visibile agli utenti</label>
                    </div>

                    <div className={styles.quantityControls}>
                        <button onClick={() => onQuantityChange(product.id, -1)} className={styles.quantityButton}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="20"
                                height="20"
                                fill="#F3BC9F">
                                <path d="M20 11H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1Z"></path>
                            </svg>
                        </button>
                        <span className={styles.quantityDisplay}>{product.quantity}</span>
                        <button onClick={() => onQuantityChange(product.id, 1)} className={styles.quantityButton}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 480 480"
                                width="20"
                                height="20"
                                fill="#F3BC9F">
                                <path
                                    d="M450 210H270V30a30 30 0 1 0-60 0v180H30a30 30 0 1 0 0 60h180v180a30 30 0 1 0 60 0V270h180a30 30 0 1 0 0-60Z"></path>
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
                        <path
                            d="M20 6h-4V4.5A2.5 2.5 0 0 0 13.5 2h-3A2.5 2.5 0 0 0 8 4.5V6H4c-.55 0-1 .45-1 1s.45 1 1 1h.12l.73 11.66A2.49 2.49 0 0 0 7.35 22h9.3c1.32 0 2.41-1.03 2.5-2.34L19.88 8H20c.55 0 1-.45 1-1s-.45-1-1-1ZM10 4.5c0-.28.22-.5.5-.5h3c.28 0 .5.22.5.5V6h-4V4.5Zm7.15 15.03a.51.51 0 0 1-.5.47h-9.3a.51.51 0 0 1-.5-.47L6.13 8h11.74l-.72 11.53ZM10 10c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1s1-.45 1-1v-6c0-.55-.45-1-1-1ZM14 10c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1s1-.45 1-1v-6c0-.55-.45-1-1-1Z"></path>
                    </svg>
                </button>

                <button className={styles.modifyButton} onClick={() => onModify(product)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#000">
                        <path
                            d="m21 9-2-3-4 1L14 3h-4L9 6.4 5 6 3 9l3 3-3 3 2 3h4l1 3 4 0 1.5-3.61L19 18l1.5-3-2.4-3L21 9Zm-7 5h-4v-4h4v4Z"
                            fill="#F3BC9F"></path>
                        <path
                            d="M12 22c-.61 0-1.23-.06-1.86-.18a1.5 1.5 0 0 1-1.18-1.75 1.48 1.48 0 0 0-2.43-1.41c-.61.53-1.56.49-2.1-.15a10.03 10.03 0 0 1-1.86-3.21 1.5 1.5 0 0 1 .93-1.9c.6-.21 1-.77 1-1.41s-.4-1.2-1-1.41a1.48 1.48 0 0 1-.92-1.9 10 10 0 0 1 1.85-3.21 1.5 1.5 0 0 1 2.11-.14 1.49 1.49 0 0 0 2.43-1.41 1.5 1.5 0 0 1 1.17-1.75 9.7 9.7 0 0 1 3.72 0c.8.15 1.33.94 1.18 1.75a1.48 1.48 0 0 0 2.43 1.4 1.48 1.48 0 0 1 2.1.14 9.97 9.97 0 0 1 1.86 3.22 1.5 1.5 0 0 1-.93 1.9c-.6.21-1 .77-1 1.41s.41 1.2 1 1.41c.77.26 1.2 1.11.92 1.9a10 10 0 0 1-1.85 3.21 1.5 1.5 0 0 1-2.11.14 1.51 1.51 0 0 0-1.72-.17c-.55.32-.83.95-.71 1.57a1.5 1.5 0 0 1-1.18 1.75c-.63.12-1.25.18-1.86.18Zm-1-2.07c.68.09 1.34.09 2.02 0a3.5 3.5 0 0 1 5.35-3.09c.41-.54.75-1.12 1-1.75a3.49 3.49 0 0 1 0-6.18 7.81 7.81 0 0 0-1-1.75 3.5 3.5 0 0 1-5.35-3.09 7.59 7.59 0 0 0-2.02 0 3.5 3.5 0 0 1-5.35 3.09 8.04 8.04 0 0 0-1 1.75 3.49 3.49 0 0 1 0 6.18c.26.62.6 1.21 1 1.75a3.5 3.5 0 0 1 5.35 3.09ZM12 15c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3Zm0-4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1Z"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}
