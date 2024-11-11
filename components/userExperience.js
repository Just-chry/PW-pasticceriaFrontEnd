'use client'

import { useState, useRef, useEffect } from "react";

import { FaArrowLeft, FaSearch, FaUser, FaConciergeBell, FaShoppingCart, FaStore, FaArrowRight } from "react-icons/fa";
import styles from "@/components/userExperience.module.css";

export default function UserExperience() {

  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    if (containerRef.current) {
      setSteps(containerRef.current.querySelectorAll(`.${styles.step}`));
    }
  }, [containerRef]);

  const handleScroll = (direction) => {
    if (steps.length === 0) return;

    let newIndex = currentIndex;

    if (direction === 'right') {
      newIndex = Math.min(currentIndex + 1, steps.length - 1);
    } else {
      newIndex = Math.max(currentIndex - 1, 0);
    }

    setCurrentIndex(newIndex);
    steps[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };


  return (

    <div className={styles.userExperienceContainer} ref={containerRef}>
      <button
        className={styles.arrowButtonLeft}
        onClick={() => handleScroll('left')}
        disabled={currentIndex === 0}>
        <FaArrowLeft />
      </button>
      <div className={styles.step}>
        <FaSearch className={styles.icon} />
        <p className={styles.stepText}>Consulta il sito</p>
      </div>
      <div className={styles.step}>
        <FaUser className={styles.icon} />
        <p className={styles.stepText}>Effettua la login/registrazione</p>
      </div>
      <div className={styles.step}>
        <FaConciergeBell className={styles.icon} />
        <p className={styles.stepText}>Scegli il servizio</p>
      </div>
      <div className={styles.step}>
        <FaShoppingCart className={styles.icon} />
        <p className={styles.stepText}>Ordina online</p>
      </div>
      <div className={styles.step}>
        <FaStore className={styles.icon} />
        <p className={styles.stepText}>Ritira in negozio</p>
      </div>
      <button
        className={styles.arrowButtonRight}
        onClick={() => handleScroll('right')}
        disabled={currentIndex === steps.length - 1}>
        <FaArrowRight />
      </button>
    </div>
  );
}
