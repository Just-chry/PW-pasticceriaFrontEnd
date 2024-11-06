import Header from "@/components/header";
import Hero from "@/components/hero";

import Footer from '@/components/footer';

import styles from "@/app/page.module.css";


export default function HomePage() {
  return (
    <main className={styles.main}>
      <header>
        <Header />
      </header>
      <Hero />
      <section className={styles.body}>
        {/* CONTENUTI DELLA HOME PAGE */}
      </section>

      <footer>
        <Footer />
      </footer>

      {/* SCROLLBUTTON */}
    </main>
  );
}
