'use client';

import styles from './projects.module.css';
import { useState } from 'react';
import useAllProjects from '@/hooks/useAllProjects';
import ListCardProject from '@components/ListCardProject';
import CreateProjectModal from '@components/CreateProjectModal';

export default function Projects() {
    const {
        allProjects,
        errorAllProjects,
        isLoadingAllProjects,
        refetchProjects,
    } = useAllProjects();
    const [isOpenModal, setIsOpenModal] = useState(false);

    if (isLoadingAllProjects) return <p>Chargement des projets ...</p>;
    if (errorAllProjects) return <p>Erreur: {errorAllProjects}</p>;

    return (
        <>
            <CreateProjectModal
                isOpen={isOpenModal}
                setIsOpen={setIsOpenModal}
                onSuccess={refetchProjects}
            />
            <div className={styles.container}>
                <div className={styles.containerTopBar}>
                    <div className={styles.containerTitle}>
                        <h1 className={styles.h1}>Mes projets</h1>
                        <p>Gérer vos projets</p>
                    </div>
                </div>
                <button
                    className={styles.buttonCreate}
                    onClick={() => setIsOpenModal(true)}
                >
                    + Créer un projet
                </button>
            </div>
            <div className={styles.containerProject}>
                <ListCardProject projects={allProjects} />
            </div>
        </>
    );
}
