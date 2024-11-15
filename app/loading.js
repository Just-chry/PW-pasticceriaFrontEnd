import styles from '@/components/loading.module.css'

export default function Loading() {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Caricamento in corso...</p>
        </div>
    );
}