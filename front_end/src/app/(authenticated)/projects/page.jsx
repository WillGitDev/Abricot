import styles from './projects.module.css';

export default function Projects() {
  return (
    <div className={styles.container}>
      <div className={styles.containerTitle}>
        <h1 className={styles.h1}>Mes projets</h1>
        <p>Gérer vos projets</p>
      </div>
      <button className={styles.buttonCreate}>+ Créer un projet</button>
    </div>
  );
}
