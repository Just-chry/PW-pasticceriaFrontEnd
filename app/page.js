'use client'

import {useEffect, useState} from "react";

import Hero from "@/components/hero";

import UserExperience from "@/components/userExperience";
import ChiSiamo from "@/components/chiSiamo";
import ChiSiamoTeam from "@/components/chiSiamoTeam";
import SliderTorte from "@/components/sliderCategory";
import Newsletter from "@/components/newsletter";
import ProductsWall from "@/components/productsWall";
import VieniATrovarci from "@/components/vieniATrovarci";

import Footer from '@/components/footer';

import styles from "@/app/page.module.css";

export default function HomePage() {

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
    <main className={styles.main}>
      <header>
        {Header && <Header />}
      </header>
      <Hero />
      <section className={styles.body}>
        <UserExperience />
        <ChiSiamo />
        <ChiSiamoTeam />
        <SliderTorte />
        <Newsletter />
        <ProductsWall />
        <VieniATrovarci />
      </section>

      <footer>
        <Footer />
      </footer>

    </main>
  );
}
