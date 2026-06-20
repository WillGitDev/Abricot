'use clien';
import styles from './cardTasks.module.css';
import Label from '@/components/Label';
import Image from 'next/image';
import { dateFormatDM } from '@/utils/dateFormatDM';
import SeeTaskModal from '@components/SeeTaskModal';
import { useState } from 'react';

/**
 * Composants pour l'affichage des cartes. Passez le tableau de
 * tâches et si l'affichage doit-être en forme longue ne rien spécifier
 * sinon renseigner une chaine de caractère quelconque pour avoir la position
 * sous forme carré.
 * @param {Object} props - L'objet contenant les propiétés du composant.
 * @param {Array} props.tasks - Le tableau contenant les tâches à afficher.
 * @param {string} props.variant - [props.variant='dashboard'] - Le style en fonction de l'affichage du composant.
 * Long ne rien renseigner, en format carré renseigner une chaine de caractère quelconque.
 * @returns {JSX.Element} Le rendu HTML/React des cartes de tâches.
 */
export default function CardTasks({ task, variant = 'dashboard' }) {
    const cardClass = variant === 'dashboard' ? styles.long : styles.carre;
    const printFormatCarre = variant !== 'dashboard';
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className={cardClass}>
                <SeeTaskModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    task={task}
                />
                <div className={styles.containerInfoTasks}>
                    <h3 className={styles.h3}>{task.title}</h3>
                    <p className={`${styles.txtGrey} ${styles.description}`}>
                        {task.description}
                    </p>
                </div>
                <div
                    className={`${styles.labelSize} ${printFormatCarre ? styles.labelCarre : styles.label}`}
                >
                    <Label tag={task.status} />
                </div>
                <div
                    className={`${styles.containerInfoProject} ${printFormatCarre ? styles.containerInfoProjectCarre : ''}`}
                >
                    <Image
                        src="/logo_file_grey.svg"
                        width={18}
                        height={15}
                        alt="logo de fichier"
                    />
                    <p
                        className={`${styles.txtGrey} ${styles.infoProjectFont}`}
                    >
                        {task.project.name}
                    </p>
                    <p>|</p>
                    <Image
                        src="/calendar_grey.svg"
                        width={15}
                        height={16}
                        alt="Logo d'un calendrier"
                    />
                    <p
                        className={`${styles.txtGrey} ${styles.infoProjectFont}`}
                    >
                        {dateFormatDM(task.dueDate)}
                    </p>
                    <p>|</p>
                    <Image
                        src="/commentaire.svg"
                        width={15}
                        height={16}
                        alt="Logo d'une bulle de dialogue"
                    />
                    <p
                        className={`${styles.txtGrey} ${styles.infoProjectFont}`}
                    >
                        {task.comments.length}
                    </p>
                </div>
                <button
                    type="button"
                    className={`${styles.buttonSize} ${printFormatCarre ? styles.buttonSeeTasksCarre : styles.buttonSeeTasks}`}
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    Voir
                </button>
            </div>
        </>
    );
}
