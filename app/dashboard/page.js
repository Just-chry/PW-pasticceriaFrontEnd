"use client";

import { useState, useEffect } from 'react';
import styles from './dashboard.module.css';
import Footer from '@/components/footer';  
import Header from '@/components/header';  
import Hero from '@/components/hero'; 

export default function PersonalArea() {
  const [selectedContent, setSelectedContent] = useState('');
  const [activeTab, setActiveTab] = useState('inCorso'); // Tab per "In Corso" e "Completati"
  
  const [formData, setFormData] = useState({
    firstName: 'Luca',
    lastName: 'Rossi',
    email: 'lucarossi@gmail.com',
    birthDate: '',
    phone: '',
    gender: 'M',
    cap: '',
    region: 'Abruzzo',
    privacyPolicy: false,
    termsConditions: false,
    newsletter: false,
    personalizedNews: false,
    surveyParticipation: false,
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // Stato per il pop-up di conferma eliminazione account
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); // Stato per il pop-up di conferma logout

  useEffect(() => {
    const savedData = localStorage.getItem('userFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userFormData', JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevVisibility) => ({
      ...prevVisibility,
      [field]: !prevVisibility[field],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectedContent('');
  };

  const handleMenuClick = (menuItem) => {
    if (menuItem === 'Elimina account') {
      setShowDeleteConfirmation(true); // Mostra il pop-up di conferma eliminazione account
    } else if (menuItem === 'Logout') {
      setShowLogoutConfirmation(true); // Mostra il pop-up di conferma logout
    } else {
      setSelectedContent(menuItem);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Funzione per confermare l'eliminazione account
  const handleDeleteAccountConfirm = () => {
    console.log('Account eliminato');
    setShowDeleteConfirmation(false);
    // Logica per eliminare l'account (es. chiamata API)
  };

  // Funzione per annullare l'eliminazione account
  const handleDeleteAccountCancel = () => {
    setShowDeleteConfirmation(false); // Chiudi il pop-up senza fare nulla
  };

  // Funzione per confermare il logout
  const handleLogoutConfirm = () => {
    console.log('Logout confermato');
    setShowLogoutConfirmation(false);
    // Logica per il logout (es. reset di stato, reindirizzamento, ecc.)
  };

  // Funzione per annullare il logout
  const handleLogoutCancel = () => {
    setShowLogoutConfirmation(false); // Chiudi il pop-up senza fare nulla
  };

  return (
    <>
      {/* Header all'inizio */}
      <Header />
      
      {/* Hero sotto il Header */}
      <Hero /> {/* Aggiungi il componente Hero qui */}

      <main className={styles.container}>
        <section className={styles.sidebar}>
          <h3>Area Personale</h3>
          <div className={styles.menuItem}>Gestione Ordini</div>
          <div className={styles.subMenu}>
            <div onClick={() => handleMenuClick('I miei ordini')}>I miei ordini</div>
          </div>
          <div className={styles.menuItem}>Gestione Profilo</div>
          <div className={styles.subMenu}>
            <div onClick={() => handleMenuClick('I miei dati')}>I miei dati</div>
            <div onClick={() => handleMenuClick('Modifica password')}>Modifica password</div>
            <div onClick={() => handleMenuClick('Gestione consensi')}>Gestione consensi</div>
            <div onClick={() => handleMenuClick('Elimina account')}>Elimina account</div>
            <div onClick={() => handleMenuClick('Logout')}>Logout</div>
          </div>
        </section>

        <section className={styles.mainContent}>
          {selectedContent === 'I miei dati' ? (
            <div className={styles.formContainer}>
              <h2>I Miei Dati</h2>
              <form className={styles.dataForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="firstName">Nome</label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="lastName">Cognome</label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="birthDate">Data di Nascita</label>
                  <input
                    type="date"
                    id="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Telefono</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="gender">Genere</label>
                  <select id="gender" value={formData.gender} onChange={handleInputChange}>
                    <option value="M">Maschio</option>
                    <option value="F">Femmina</option>
                    <option value="O">Altro</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="cap">CAP</label>
                  <input
                    type="text"
                    id="cap"
                    value={formData.cap}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="region">Regione</label>
                  <input
                    type="text"
                    id="region"
                    value={formData.region}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit" className={styles.modifyButton}>Salva modifiche</button>
              </form>
            </div>
          ) : selectedContent === 'I miei ordini' ? (
            <div>
              <h2>I miei ordini</h2>
              <div className={styles.tabContainer}>
                <button
                  className={`${styles.tab} ${activeTab === 'inCorso' ? styles.activeTab : ''}`}
                  onClick={() => handleTabClick('inCorso')}
                >
                  IN CORSO
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'completati' ? styles.activeTab : ''}`}
                  onClick={() => handleTabClick('completati')}
                >
                  COMPLETATI
                </button>
              </div>
              <div className={styles.orderContent}>
                {activeTab === 'inCorso' ? (
                  <p>Non sono presenti ordini in corso.</p>
                ) : (
                  <p>Non sono presenti ordini completati.</p>
                )}
              </div>
            </div>
          ) : selectedContent === 'Modifica password' ? (
            <div className={styles.formContainer}>
              <h2>Modifica Password</h2>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="newPassword">Nuova password*</label>
                  <div className={styles.passwordField}>
                    <input
                      type={showPassword.newPassword ? 'text' : 'password'}
                      id="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                    />
                    <button type="button" onClick={() => togglePasswordVisibility('newPassword')}>
                      {showPassword.newPassword ? 'Nascondi' : 'Mostra'}
                    </button>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="confirmPassword">Conferma password*</label>
                  <div className={styles.passwordField}>
                    <input
                      type={showPassword.confirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                    />
                    <button type="button" onClick={() => togglePasswordVisibility('confirmPassword')}>
                      {showPassword.confirmPassword ? 'Nascondi' : 'Mostra'}
                    </button>
                  </div>
                </div>
                <button type="submit" className={styles.modifyButton}>Salva modifiche</button>
              </form>
            </div>
          ) : selectedContent === 'Gestione consensi' ? (
            <div>
              <h2>Gestione Consensi</h2>
              <form>
                <div className={styles.checkboxGroup}>
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.privacyPolicy}
                      onChange={(e) =>
                        setFormData({ ...formData, privacyPolicy: e.target.checked })
                      }
                    />
                    Privacy Policy
                  </label>
                </div>
                <div className={styles.checkboxGroup}>
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.termsConditions}
                      onChange={(e) =>
                        setFormData({ ...formData, termsConditions: e.target.checked })
                      }
                    />
                    Termini e Condizioni
                  </label>
                </div>
                <div className={styles.checkboxGroup}>
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.newsletter}
                      onChange={(e) =>
                        setFormData({ ...formData, newsletter: e.target.checked })
                      }
                    />
                    Iscriviti alla newsletter
                  </label>
                </div>
                <div className={styles.checkboxGroup}>
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.personalizedNews}
                      onChange={(e) =>
                        setFormData({ ...formData, personalizedNews: e.target.checked })
                      }
                    />
                    Ricevi notizie personalizzate
                  </label>
                </div>
                <div className={styles.checkboxGroup}>
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.surveyParticipation}
                      onChange={(e) =>
                        setFormData({ ...formData, surveyParticipation: e.target.checked })
                      }
                    />
                    Partecipa ai sondaggi
                  </label>
                </div>
                <button type="submit" className={styles.modifyButton}>Salva modifiche</button>
              </form>
            </div>
          ) : selectedContent === 'Elimina account' ? (
            <div>
              <h2>Elimina Account</h2>
              <p>Sei sicuro di voler eliminare il tuo account?</p>
              <button className={styles.deleteButton} onClick={handleDeleteAccountConfirm}>Conferma eliminazione</button>
              <button className={styles.cancelButton} onClick={handleDeleteAccountCancel}>Annulla</button>
            </div>
          ) : selectedContent === 'Logout' ? (
            <div>
              <h2>Logout</h2>
              <p>Sei sicuro di voler effettuare il logout?</p>
              <button className={styles.logoutButton} onClick={handleLogoutConfirm}>Conferma logout</button>
              <button className={styles.cancelButton} onClick={handleLogoutCancel}>Annulla</button>
            </div>
          ) : null}
        </section>
      </main>
      
      <Footer />
    </>
  );
}
