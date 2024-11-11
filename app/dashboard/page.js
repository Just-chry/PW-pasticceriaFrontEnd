"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
    const [username, setUsername] = useState("Utente");

    // Simula il recupero del nome utente dal server o dal local storage
    useEffect(() => {
        // Puoi modificare questo con il recupero reale del nome utente
        const storedUsername = localStorage.getItem("username") || "Utente";
        setUsername(storedUsername);
    }, []);

    return (
        <div>
            <header>
                <h1>Dashboard di {username}</h1>
                <nav>
                    <Link href="/">Home</Link> |{" "}
                    <Link href="/profile">Profilo</Link> |{" "}
                    <Link href="/settings">Impostazioni</Link> |{" "}
                    <Link href="/logout">Logout</Link>
                </nav>
            </header>

            <main>
                <h2>Benvenuto nella tua Dashboard</h2>
                <p>Qui puoi gestire le tue informazioni e visualizzare i dati.</p>

                <div>
                    <div>
                        <h3>Statistiche</h3>
                        <p>Visualizza le tue statistiche personali qui.</p>
                    </div>
                    <div>
                        <h3>Notifiche</h3>
                        <p>Non ci sono nuove notifiche.</p>
                    </div>
                    <div>
                        <h3>Attività recenti</h3>
                        <p>Non ci sono attività recenti.</p>
                    </div>
                </div>
            </main>

            <footer>
                <p>© 2024 Pasticceria C'est La Vie. Tutti i diritti riservati.</p>
            </footer>
        </div>
    );
}
