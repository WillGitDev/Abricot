'use client';

import { useEffect, useState } from 'react';
import styles from './dashboard.module.css';
import Image from 'next/image';
import CardTasks from '@components/CardTasks';
import useProfile from '@/hooks/useProfile';
import useTasks from '@/hooks/useTasks';

export default function Dashboard() {
  const { profile, isLoadingProfile, errorProfile } = useProfile();
  const { tasks, errorTasks, isLoadingTasks } = useTasks();

  if (isLoadingProfile) return <p>Chargement du profile...</p>;
  if (errorProfile) return <p>Erreur: {errorProfile}</p>;

  if (isLoadingTasks) return <p>Chargement des tâches ...</p>;
  if (errorTasks) return <p>Erreur : {errorTasks}</p>;
  console.log('Le nouveau petit hook bien fait : ', tasks);
  return (
    <div className={styles.container}>
      <div className={styles.containerTopBar}>
        <div className={styles.containerTitle}>
          <h1 className={styles.h1}>Tableau de bord</h1>
          <p>
            Bonjour {profile.data.user.name}, voici un aperçu de vos projets et
            tâches
          </p>
        </div>
        <button className={styles.buttonCreate}>+ Créer un projet</button>
      </div>
      <div className={styles.containerChoicePrint}>
        <button className={styles.buttonChoice}>
          <Image src="/check.svg" width={16} height={16} alt="logo_checking" />
          Liste
        </button>
        <button className={styles.buttonChoice}>
          <Image
            src="/calendar.svg"
            width={16}
            height={16}
            alt="logo_calendar"
          />
          Kanban
        </button>
      </div>
      <div className={styles.containerWorks}>
        <h2 className={styles.h2}>
          Mes tâches assignées{' '}
          <span className={styles.h2Subtitle}>
            <br />
            Par ordre de priorité
          </span>
        </h2>
        <input
          type="search"
          placeholder="Rechercher une tâche"
          className={styles.search}
        />
      </div>
      <CardTasks tasks={tasks.data.tasks} />
    </div>
  );
}
