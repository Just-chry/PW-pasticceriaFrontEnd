"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import Footer from "@/components/footer";

import styles from "./page.module.css";

export default function VerifyOTP() {
    const router = useRouter();
    const [otp, setOtp] = useState("");
    const [contact] = useState(new URLSearchParams(window.location.search).get("contact"));
    const [type] = useState(new URLSearchParams(window.location.search).get("type"));
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleOtpChange = (e) => setOtp(e.target.value);

    const handleOtpSubmit = async (e) => {
        e.preventDefault();

        let formattedContact = contact;
        if (!formattedContact.startsWith("+39")) {
            formattedContact = `+39${formattedContact}`;
        }

        const encodedContact = encodeURIComponent(formattedContact);
        const encodedType = encodeURIComponent(type);

        try {
            const response = await fetch(`http://localhost:8080/auth/verify?token=${otp}&contact=${encodedContact}&type=${encodedType}`, {
                method: "GET",
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || "Errore nella verifica del codice OTP.");
            }

            alert("Verifica completata con successo!");
            if (type === "registration") {
                router.push("/login");
            } if (type === "password-reset") {
                setTimeout(() => {
                    router.push(`/reset-password?contact=${encodeURIComponent(contact)}&token=${otp}`);
                }, 500);
                console.log("OTP Token: ", otp);
            }

        } catch (error) {
            alert(error.message);
        }
    };



    return (
        <>
            <div className={styles.heroContainer}>
                <div className={styles.heroBackground}></div>
                <div className={styles.formContainer}>
                    <h1 className={styles.title}>Verifica OTP</h1>
                    <form className={styles.form} onSubmit={handleOtpSubmit}>
                        <label className={styles.label} htmlFor="otp">Inserisci il codice OTP</label>
                        <input
                            type="text"
                            id="otp"
                            name="otp"
                            className={styles.input}
                            value={otp}
                            onChange={handleOtpChange}
                            ref={inputRef}
                            required
                        />
                        <button type="submit" className={styles.button}>Verifica</button>
                    </form>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </>
    );
}