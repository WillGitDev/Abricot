import styles from './footer.module.css';
import Image from 'next/image';

export default function Footer() {
  return (
    <div className={styles.containerFooter}>
      <Image
        src="/logo_black.svg"
        width={100}
        height={15}
        className={styles.logo}
        alt="Logo abricot"
      />
      <p className={styles.text}>Abricot 2025</p>
    </div>
  );
}
