'use client';

import styles from './header.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isActiveDashboard = pathname === '/dashboard';
  const isActiveProjects = pathname === '/projects';

  return (
    <header className={styles.containerHeader}>
      <div className={styles.logo}>
        <Image src="/logo.svg" alt="Logo" width={150} height={20} />
      </div>
      <div className={styles.containerButton}>
        <Link href="/dashboard" className={styles.button}>
          <button
            className={`${styles.button} ${isActiveDashboard ? styles.activeButton : ''}`}
          >
            <Image
              src="/logo_carre.svg"
              alt="Logo"
              width={24}
              height={24}
              className={isActiveDashboard ? styles.activeLogo : ''}
            />
            Tableau de bord
          </button>
        </Link>
        <Link href="/projects" className={styles.button}>
          <button
            className={`${styles.button} ${isActiveProjects ? styles.activeButton : ''}`}
          >
            <Image
              src="/logo_file.svg"
              alt="logo"
              width={23}
              height={30}
              className={isActiveProjects ? styles.activeLogo : ''}
            />
            Projets
          </button>
        </Link>
      </div>
      <div className={styles.user}>
        <p>AD</p>
      </div>
    </header>
  );
}
