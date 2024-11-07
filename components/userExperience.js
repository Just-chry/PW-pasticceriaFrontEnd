import { FaSearch, FaUser, FaConciergeBell, FaShoppingCart, FaStore } from "react-icons/fa";
import styles from "@/components/userExperience.module.css";

export default function UserExperience() {
  return (
    <div className={styles.userExperienceContainer}>
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
    </div>
  );
}
