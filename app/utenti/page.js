"use client";
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';

export default function Utenti() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
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
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className={styles.main}>
            <h1 className={styles.title}>Gestione Utenti</h1>
            {error ? (
                <p className={styles.error}>{error}</p>
            ) : (
                <div className={styles.grid}>
                    {users.map((user, index) => (
                        <UserCard key={index} user={user} />
                    ))}
                </div>
            )}
        </div>
    );
}

function UserCard({ user }) {
    if (!user) {
        return null;
    }

    return (
        <div className={styles.card}>
            <div className={styles.containerDetails}>
                <h2 className={styles.userName}>{user.name} {user.surname}</h2>
                <p className={styles.userEmail}><span>Email:</span> {user.email}</p>
                <p className={styles.userPhone}><span>Telefono:</span> {user.phone}</p>
                <p className={styles.userRole}><span>Ruolo:</span> {user.role}</p>
            </div>
        </div>
    );
}
