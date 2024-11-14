"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // o 'next/router' se usi una versione precedente

const VerificaEmail = () => {
    const [status, setStatus] = useState("Caricamento...");
    const router = useRouter();
    const searchParams = useSearchParams(); // Per ottenere i parametri dalla query

    const token = searchParams.get("token");
    const contact = searchParams.get("contact");

    useEffect(() => {
        if (token && contact) {
            // Chiamata al backend usando fetch
            fetch(`http://localhost:8080/auth/verify?token=${token}&contact=${contact}`)
                .then((response) => {
                    if (!response.ok) {
                        // Se la risposta non è ok, restituiamo un messaggio di errore
                        return response.text().then((data) => {
                            throw new Error(data);  // Lancia un errore con il messaggio di errore restituito dal backend
                        });
                    }
                    return response.text();  // Restituisci il testo della risposta in caso di successo
                })
                .then((data) => {
                    setStatus(data);  // Mostra il messaggio di successo
                    // Redirect a una pagina di login o dove necessario
                    setTimeout(() => {
                        router.push("/login");
                    }, 2000); // Dopo 2 secondi reindirizza al login
                })
                .catch((error) => {
                    setStatus(`Errore nella verifica: ${error.message}`);  // Mostra l'errore
                });
        } else {
            setStatus("Token o contatto mancanti.");
        }
    }, [token, contact, router]);

    return (
        <div>
            <h1>Verifica Email</h1>
            <p>{status}</p>
        </div>
    );
};

export default VerificaEmail;
