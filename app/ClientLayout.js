'use client';

import { useEffect, useState } from "react";
import ScrollButton from "@/components/scrollButton";

export default function ClientLayout({ children }) {
    const [Header, setHeader] = useState(null);
    const [userData, setUserData] = useState({
        name: "",
        surname: "",
        email: "",
        role: ""
    });

    useEffect(() => {
        const fetchUserData = async () => {
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
                    setUserData(userData);
                    console.log(userData);
                    if (userData.role === "user") {
                        const { default: Header } = await import('@/app/dashboardUtente/components/header');
                        setHeader(() => Header);
                    } else if (userData.role === "admin") {
                        const { default: Header } = await import('@/app/dashboardAdmin/components/header');
                        setHeader(() => Header);
                    }
                } else {
                    const { default: Header } = await import('@/components/header');
                    setHeader(() => Header);
                    throw new Error('Errore nella richiesta dei dati utente');
                }
            } catch (error) {
                const { default: Header } = await import('@/components/header');
                setHeader(() => Header);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            {Header && <Header />}
            <main>
                {children}
                <ScrollButton />
            </main>
        </div>
    );
}