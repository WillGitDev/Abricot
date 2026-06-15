import Header from '@components/Header';
import Footer from '@components/Footer';
import styles from './layout.module.css';

export default function Layout({ children }) {
    return (
        <div>
            <Header name={'Joseph Langevin'} />
            <div className={styles.container}>{children}</div>
            <Footer />
        </div>
    );
}
