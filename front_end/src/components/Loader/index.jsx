import styles from './loader.module.css';

export default function Loader() {
    return (
        <div
            className={styles.spinner}
            role="status"
            aria-label="Chargement"
        ></div>
    );
}
