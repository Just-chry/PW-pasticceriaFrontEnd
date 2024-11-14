"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Footer from "@/components/footer";

import styles from "./page.module.css";

export default function VerificaEmail() {
    const [status, setStatus] = useState("Caricamento...");
    const searchParams = useSearchParams(); 

    const token = searchParams.get("token");
    const contact = searchParams.get("contact");

    useEffect(() => {
        if (token && contact) {
            fetch(`http://localhost:8080/auth/verify?token=${token}&contact=${contact}&type=registration`)
                .then((response) => {
                    if (!response.ok) {
                        return response.text().then((data) => {
                            throw new Error(data);  
                        });
                    }
                    return response.text(); 
                })
                .then((data) => {
                    setStatus(data);  
                })
                .catch((error) => {
                    setStatus(`Errore nella verifica: ${error.message}`); 
                });
        } else {
            setStatus("Token o contatto mancanti.");
        }
    }, [token, contact]);

    return (
        <>
            <div className={styles.heroContainer}>
                <div className={styles.heroBackground}></div>
                <div className={styles.formContainer}>
                    <h1 className={styles.title}>Verifica email</h1>
                    <p className={styles.paragraph}>{status}</p>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </>
    );
}