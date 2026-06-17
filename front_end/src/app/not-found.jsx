import styles from './notfound.module.css';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404 Page non trouvée</h1>
            <Link href="/" className={styles.link}>
                Retour à l'acceuil
            </Link>
        </div>
    );
}
