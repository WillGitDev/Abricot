'use client';

import styles from './dashboard.module.css';
import Image from 'next/image';
import { useState } from 'react';
import useProfile from '@/hooks/useProfile';
import useTasks from '@/hooks/useTasks';
import { sortTasksByPriority } from '@/utils/sortTasksByPriority';
import ListTasks from '@components/ListTasks';
import KanbanTasks from '@components/KanbanTasks';
import { sortTasksByStatus } from '@/utils/sortTasksByStatus';
import CreateProjectModal from '@components/CreateProjectModal';
import Loader from '@components/Loader';
import { filterTask } from '@/utils/filterTask';

export default function Dashboard() {
    const { profile, isLoadingProfile, errorProfile } = useProfile();
    const { tasks, userTasks, errorTasks, isLoadingTasks } = useTasks();
    const [isKanban, setIsKanban] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [search, setSearch] = useState('');
    const filteredTasks = filterTask(userTasks, search);

    const handleOpenModal = () => {
        setIsOpenModal((isOpenModal) => !isOpenModal);
    };
    if (isLoadingProfile) return <Loader />;

    if (isLoadingTasks) return <Loader />;

    const sortedTaskByPriority = sortTasksByPriority(filteredTasks);
    const sortedTaskByStatus = sortTasksByStatus(filteredTasks);

    return (
        <>
            <div className={styles.container}>
                <CreateProjectModal
                    isOpen={isOpenModal}
                    setIsOpen={setIsOpenModal}
                />
                <div className={styles.containerTopBar}>
                    <div className={styles.containerTitle}>
                        <h1 className={styles.h1}>Tableau de bord</h1>
                        <p className={styles.txtTitle}>
                            Bonjour {profile.data.user.name}, voici un aperçu de
                            vos projets et tâches
                        </p>
                    </div>
                    <button
                        className={styles.buttonCreate}
                        onClick={handleOpenModal}
                    >
                        + Créer un projet
                    </button>
                </div>
                <div className={styles.containerChoicePrint}>
                    <button
                        className={`${styles.buttonChoice} ${!isKanban ? styles.activeButton : ''}`}
                        onClick={() => setIsKanban(false)}
                    >
                        <Image
                            src="/check.svg"
                            width={16}
                            height={16}
                            alt="logo_checking"
                        />
                        Liste
                    </button>
                    <button
                        className={`${styles.buttonChoice} ${isKanban ? styles.activeButton : ''}`}
                        onClick={() => setIsKanban(true)}
                    >
                        <Image
                            src="/calendar.svg"
                            width={16}
                            height={16}
                            alt="logo_calendar"
                        />
                        Kanban
                    </button>
                </div>
            </div>
            {isKanban ? (
                <KanbanTasks
                    tasks={sortedTaskByStatus}
                    search={search}
                    setSearch={setSearch}
                />
            ) : (
                <ListTasks
                    tasks={sortedTaskByPriority}
                    search={search}
                    setSearch={setSearch}
                />
            )}
        </>
    );
}
