import Header from "@/components/header";


import styles from "@/app/page.module.css";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <header>
        <Header />
      </header>

      {/* HERO */}

      <section className={styles.body}>
        {/* CONTENUTI DELLA HOME PAGE */}
      </section>

      <footer>
        {/* FOOTER */}
      </footer>

      {/* SCROLLBUTTON */}
    </main>
  );
}
