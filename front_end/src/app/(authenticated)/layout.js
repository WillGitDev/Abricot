import Header from '@components/Header';
import Footer from '@components/Footer';
import styles from './layout.module.css';

export default function Layout({ children }) {
    return (
        <div>
            <Header name={'Joseph Langevin'} />
            <main className={styles.container}>{children}</main>
            <Footer />
        </div>
    );
}
