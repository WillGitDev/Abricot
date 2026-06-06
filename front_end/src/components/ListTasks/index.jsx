import CardTasks from '@components/CardTasks';
import styles from './listTasks.module.css';
import Image from 'next/image';

/**
 * Composant pour l'affichage des tâches pour la vue liste des tâches.
 * @param {Object} props - L'objet contenant les propriétés du composant.
 * @param {Array} props.tasks - La liste des tâches à afficher.
 * @param {string} props.cardClass - La classe pour switcher entre un positionnement
 * en ligne ou en format plus petit pour correspondre aux éléments demandés dans la maquette.
 * @returns {JSX.Element} - Le rendu HTLM/React des cartes de tâches.
 */
export default function ListTasks({ tasks, cardClass }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerSearchBar}>
          <h2 className={styles.h2}>
            Mes tâches assignées{' '}
            <span className={styles.h2Subtitle}>
              <br />
              Par ordre de priorité
            </span>
          </h2>
          <div className={styles.searchBar}>
            <input
              type="search"
              placeholder="Rechercher une tâche"
              className={styles.search}
            />
            <button
              type="button"
              className={styles.buttonSearchBar}
              aria-label="Rechercher"
            >
              <Image
                src="/loupe.svg"
                width={14}
                height={14}
                alt="Logo de loupe pour la recherche"
                className={styles.logoGlass}
              />
            </button>
          </div>
        </div>
        <CardTasks tasks={tasks} variant={cardClass} />
      </div>
    </>
  );
}
