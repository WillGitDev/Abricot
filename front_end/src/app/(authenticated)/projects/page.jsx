'use client';

import styles from './projects.module.css';
import useProjects from '@/hooks/useProjects';
import ListCardProject from '@components/ListCardProject';

export default function Projects() {
  const { projects, errorProjects, isLoadingProjects } = useProjects();
  if (isLoadingProjects) return <p>Chargement des tâches ...</p>;
  if (errorProjects) return <p>Erreur: {errorProjects}</p>;
  console.log('Les projets : ', projects);
  const isSingleProject = false;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerTopBar}>
          <div className={styles.containerTitle}>
            <h1 className={styles.h1}>Mes projets</h1>
            <p>Gérer vos projets</p>
          </div>
        </div>
        <button className={styles.buttonCreate}>+ Créer un projet</button>
      </div>
      <div className={styles.containerProject}>
        <ListCardProject projects={projects} />
      </div>
    </>
  );
}
