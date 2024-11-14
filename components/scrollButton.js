'use client'

import { useState, useEffect } from "react";

import styles from "@/components/scrollButton.module.css";

export default function ScrollButton() {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const position = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            setScrollPosition(Math.round(position * 100));
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button className={styles.scrollButton} onClick={scrollToTop}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width='30' height='30' fill="#000"><path d="M20 16H4l8-9 8 9z" fill="#F3BC9F"></path><path d="M3.29 15.71c.39.39 1.02.39 1.41 0l7.29-7.29 7.29 7.29a.996 .996 0 1 0 1.41-1.41l-7.98-8.01c-.2-.2-.45-.29-.71-.29s-.51.1-.71.29l-8 8a1 1 0 0 0 0 1.41Z"></path></svg>
            {scrollPosition}%
        </button>
    );
}