'use client';

import styles from './projects.module.css';
import { useState } from 'react';
import useAllProjects from '@/hooks/useAllProjects';
import ListCardProject from '@components/ListCardProject';
import CreateProjectModal from '@components/CreateProjectModal';
import Loader from '@components/Loader';

export default function Projects() {
    const {
        allProjects,
        isLoadingAllProjects,
        errorAllProjects,
        refetchProjects,
    } = useAllProjects();

    const [isOpenModal, setIsOpenModal] = useState(false);

    if (isLoadingAllProjects) return <Loader />;
    console.log('dddd', allProjects);
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
            {console.log('Tous les projets : ', allProjects)}
            <div className={styles.containerProject}>
                <ListCardProject projects={allProjects} />
            </div>
        </>
    );
}
