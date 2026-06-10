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
import UserInitial from '@/components/UserInitial';

export default function Dashboard() {
  const { profile, isLoadingProfile, errorProfile } = useProfile();
  const { tasks, userTasks, errorTasks, isLoadingTasks } = useTasks();
  const [isKanban, setIsKanban] = useState(false);

  if (isLoadingProfile) return <p>Chargement du profile...</p>;
  if (errorProfile) return <p>Erreur: {errorProfile}</p>;

  if (isLoadingTasks) return <p>Chargement des tâches ...</p>;
  if (errorTasks) return <p>Erreur : {errorTasks}</p>;
  const sortedTaskByPriority = sortTasksByPriority(userTasks);
  const sortedTaskByStatus = sortTasksByStatus(userTasks);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerTopBar}>
          <div className={styles.containerTitle}>
            <h1 className={styles.h1}>Tableau de bord</h1>
            <p>
              Bonjour {profile.data.user.name}, voici un aperçu de vos projets
              et tâches
            </p>
          </div>
          <button className={styles.buttonCreate}>+ Créer un projet</button>
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
        <KanbanTasks tasks={sortedTaskByStatus} />
      ) : (
        <ListTasks tasks={sortedTaskByPriority} />
      )}
    </>
  );
}
