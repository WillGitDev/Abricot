import styles from './label.module.css';

export default function Label({ tag }) {
  const colorLabel = () => {
    switch (tag) {
      case 'TODO':
        tag = 'À faire';
        return styles.aFaire;
      case 'IN_PROGRESS':
        tag = 'En cours';
        return styles.enCours;
      case 'DONE':
        tag = 'Terminée';
        return styles.terminee;
      case 'proprietaire':
        tag = 'Propriétaire';
        return styles.proprietaire;
    }
  };

  return (
    <div className={`${styles.container} ${colorLabel()}`}>
      <p className={styles.label}>{tag}</p>
    </div>
  );
}
