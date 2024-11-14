"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import Footer from "@/components/footer";

import styles from "./page.module.css";

export default function ResetPassword() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [token] = useState(new URLSearchParams(window.location.search).get("token"));
    const [contact] = useState(new URLSearchParams(window.location.search).get("contact"));
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const handleResetPasswordSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Le password non corrispondono. Riprova.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    contact,
                    password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || "Errore durante il reset della password.");
            }

            alert("Password resettata con successo! Ora puoi effettuare il login.");
            router.push("/login");
        } catch (error) {
            alert(error.message);
        }
    };


    return (
        <>
            <div className={styles.heroContainer}>
                <div className={styles.heroBackground}></div>
                <div className={styles.formContainer}>
                    <h1 className={styles.title}>Password dimenticata?</h1>
                    <form className={styles.form} onSubmit={handleResetPasswordSubmit}>
                        <label className={styles.label} htmlFor="password">Nuova password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className={styles.input}
                            value={password}
                            onChange={handlePasswordChange}
                            ref={inputRef}
                            required
                        />
                        <label className={styles.label} htmlFor="confirmPassword">Conferma nuova password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className={styles.input}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                        <button type="submit" className={styles.button}>Reset password</button>
                    </form>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </>
    );
}