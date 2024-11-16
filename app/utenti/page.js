"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Hero from '@/components/hero';
import Footer from "@/components/footer";
import styles from './page.module.css';

export default function Utenti() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8080/user/all', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
            }
        } catch (error) {
            setError('Errore di connessione con il server');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const checkUserRole = async () => {
            try {
                const response = await fetch('http://localhost:8080/user', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    if (userData.role !== 'admin') {
                        router.push('/not-found');
                        return;
                    }
                } else {
                    router.push('/not-found');
                    return;
                }
            } catch (error) {
                console.error('Errore durante il controllo del ruolo utente:', error);
                router.push('/not-found');
                return;
            }
        };

        checkUserRole().then(() => {
            fetchUsers();
        });
    }, [router]);

    return (
        <>
            <Hero />
            <div className={styles.main}>
                <h1 className={styles.title}>Gestione utenti</h1>
                {loading ? (
                    <p className={styles.centerdText}>Caricamento in corso...</p>
                ) : error ? (
                    <p className={styles.centerdText}>{error}</p>
                ) : users.length === 0 ? (
                    <p className={styles.centerdText}>Nessun utente presente!</p>
                ) : (
                    <div className={styles.grid}>
                        {users.map((user, index) => (
                            <UserCard key={index} user={user} onVerificationSuccess={fetchUsers} />
                        ))}
                    </div>
                )}
            </div>
            <footer>
                <Footer />
            </footer>
        </>
    );
}

function UserCard({ user, onVerificationSuccess }) {
    if (!user) {
        return null;
    }

    const handleVerify = async (field) => {
        if (!user.id) {
            alert('ID utente non trovato.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/user/verify/${user.id}?field=${field}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert(`${field} dell'utente verificato con successo.`);
                onVerificationSuccess();
            } else {
                const errorMessage = await response.text();
                alert(`Errore durante la verifica: ${errorMessage}`);
            }
        } catch (error) {
            alert('Errore durante la verifica.');
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.containerDetails}>
                <h2 className={styles.userName}>{user.name} {user.surname}</h2>

                {/* Mostra il campo email se presente */}
                {user.email && (
                    <>
                        <p className={styles.userEmail}><span>Email:</span> {user.email}</p>
                        <p className={styles.userVerified}>
                            <span>Email Verificata:</span> {user.emailVerified ? 'Sì' : 'No'}
                            {!user.emailVerified && (
                                <button onClick={() => handleVerify('email')}>Verifica</button>
                            )}
                            {user.emailVerified && (
                                <i className="verified-icon">✔️</i>
                            )}
                        </p>
                    </>
                )}

                {/* Mostra il campo telefono se presente */}
                {user.phone && (
                    <>
                        <p className={styles.userPhone}><span>Telefono:</span> {user.phone}</p>
                        <p className={styles.userVerified}>
                            <span>Telefono Verificato:</span> {user.phoneVerified ? 'Sì' : 'No'}
                            {!user.phoneVerified && (
                                <button onClick={() => handleVerify('phone')}>Verifica</button>
                            )}
                            {user.phoneVerified && (
                                <i className="verified-icon">✔️</i>
                            )}
                        </p>
                    </>
                )}

                <p className={styles.userRole}><span>Ruolo:</span> {user.role}</p>
            </div>
        </div>
    );
}


