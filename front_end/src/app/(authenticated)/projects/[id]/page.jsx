'use client';

import { useParams } from 'next/navigation';
import styles from './singleProjectPage.module.css';
import Image from 'next/image';

export default function SingleProjectPage() {
  const params = useParams();
  const projectId = params.id;

  return (
    <div className={styles.container}>
      <div className={styles.containerTopBar}>
        <button className={styles.buttonReturn}>
          <Image src="/arrow.svg" width={10} height={10} alt="return" />
        </button>
        <div className={styles.infoProject}>
          <div className={styles.containerTitleProject}>
            <h2 className={styles.h2}>Nom du projet</h2>
            <a href="/">Modifier</a>
          </div>
          <h3 className={styles.h3}>
            Développez de la nouvelle version de l'API REST avec
            authentification JWT
          </h3>
        </div>
        <button className={styles.buttonCreateTask}>Créer une tâche</button>
        <button className={styles.buttonIa}>
          <Image src="/star_ia.svg" width={21} height={21} alt="logo ia" />
          <span className={styles.iaText}>IA</span>
        </button>
      </div>
    </div>
  );
}
