import Header from "@/components/header";
import Hero from "@/components/hero";

import UserExperience from "@/components/userExperience";
import ChiSiamo from "@/components/chiSiamo";
import ChiSiamoTeam from "@/components/chiSiamoTeam";
import SliderTorte from "@/components/sliderTorte";
import Newsletter from "@/components/newsletter";
import ProductsWall from "@/components/productsWall";
import VieniATrovarci from "@/components/vieniATrovarci";

import Footer from '@/components/footer';

import ScrollButton from "@/components/scrollButton";

import styles from "@/app/page.module.css";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <header>
        <Header />
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

      <ScrollButton />
    </main>
  );
}
