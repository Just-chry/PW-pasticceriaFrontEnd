import styles from "@/components/vieniATrovarci.module.css";

export default function VieniATrovarci() {
    return (
        <div className={styles.container}>
            <div className={styles.background}></div>
            <div className={styles.infoContainer}>
                <div className={styles.textContainer}>
                    <h2 className={styles.title}>Vieni a Trovarci!</h2>
                    <p className={styles.subtitle}>
                        Stai cercando una pasticceria artigianale, ti aspettiamo in Via Carlo Croce 4 a Varese, affrettati!
                    </p>
                    <a href='/contacts#pasticceria' className={styles.buttonSubmitA}>
                        <button type="submit" className={styles.buttonSubmit}>Contattaci</button>
                    </a>
                </div>
            </div>
        </div>
    );
}