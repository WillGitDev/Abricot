'use client';

import styles from './projects.module.css';
import useAllProjects from '@/hooks/useAllProjects';
import ListCardProject from '@components/ListCardProject';

export default function Projects() {
    const { allProjects, errorAllProjects, isLoadingAllProjects } = useAllProjects();
    if (isLoadingAllProjects) return <p>Chargement des projets ...</p>;
    if (errorAllProjects) return <p>Erreur: {errorAllProjects}</p>;

    return (
        <>
            <div className={styles.container}>
                <div className={styles.containerTopBar}>
                    <div className={styles.containerTitle}>
                        <h1 className={styles.h1}>Mes projets</h1>
                        <p>Gérer vos projets</p>
                    </div>
                </div>
                <button className={styles.buttonCreate}>
                    + Créer un projet
                </button>
            </div>
            <div className={styles.containerProject}>
                <ListCardProject projects={allProjects} />
            </div>
        </>
    );
}
