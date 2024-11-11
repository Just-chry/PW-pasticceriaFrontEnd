import Image from "next/image";

import italiaOnline from '@/public/images/italiaOnline.png';
import pagineGialle from '@/public/images/pagineGialle.png';
import pagineBianche from '@/public/images/pagineBianche.png';

import styles from "@/components/footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.section}>
                    <h3>Sede e contatti</h3>
                    <p>Via Carlo Croce, 4 - 21100 Varese (VA)</p>
                    <p>Via Giuseppe Garibaldi, 5 - 21100 Varese (VA)</p>
                    <p>+39 327 7380932</p>
                    <p>pasticceriacestlavie@gmail.com</p>
                </div>
                <div className={styles.sectionBoutique}>
                    <h3>Orari boutique</h3>
                    <div className={styles.hoursContainerBoutique}>
                        <div className={styles.daysColumnBoutique}>
                            <p>Lunedì</p>
                            <p>Mar - Ven</p>
                            <p>Sabato</p>
                            <p>Domenica</p>
                        </div>
                        <div className={styles.hoursColumnBoutique}>
                            <p>Chiuso</p>
                            <p>8:30 - 19:00</p>
                            <p>9:00 - 19:00</p>
                            <p>9:00 - 13:00<br />15:00 - 19:00</p>
                        </div>
                    </div>
                </div>
                <div className={styles.sectionLab}>
                    <h3>Orari Laboratorio</h3>
                    <div className={styles.hoursContainerLab}>
                        <div className={styles.daysColumnLab}>
                            <p>Lunedì</p>
                            <p>Mar - Sab</p>
                            <p>Domenica</p>
                        </div>
                        <div className={styles.hoursColumnLab}>
                            <p>Chiuso</p>
                            <p>7:30 - 13:00<br />14:30 - 16:00</p>
                            <p>8:00 - 12:30</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <p>P.I. <span className={styles.noTelLink}>03468950120</span></p>
            </div>
            <div className={styles.footerLinks}>
                <a href="#">Informazioni Legali</a>
                <span>|</span>
                <a href="#">Privacy Policy e Cookie Policy</a>
                <span>|</span>
                <span>Designed by italiaonline <a href="https://www.italiaonline.it/"><Image src={italiaOnline} alt="italiaonline" width="70" /></a></span>
                <span>|</span>
                <span>Questa azienda è presente anche su <a href="https://www.paginegialle.it/"><Image src={pagineGialle} alt="paginegialle" width="50" className={styles.imageMobile} /></a> e <a href="https://www.paginebianche.it/"><Image src={pagineBianche} alt="pagineBianche" width="50" className={styles.imageMobile} /></a></span>
            </div>
        </footer>
    );
}
