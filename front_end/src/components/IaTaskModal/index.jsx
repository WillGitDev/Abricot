'use client';

import styles from './iaTaskModal.module.css';
import Image from 'next/image';
import BaseModal from '@components/BaseModal';
import { useState, useEffect } from 'react';
import useGenerateTasks from '@/hooks/useGenerateTasks';
import CardIaTask from '@components/CardIaTask';

export default function IaTaskModal({
    isOpen,
    setIsOpen,
    imgSrc,
    existingTasks,
    projectId,
}) {
    const [description, setDescription] = useState('');
    const [responseIa, setResponseIa] = useState(null);
    const { createTasks, isLoading, error } = useGenerateTasks();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await createTasks({
            prompt: description,
            existingTasks: existingTasks,
        });
        if (result.success) {
            setResponseIa(result.data.tasks);
        }
    };

    const handleDeleteIaTask = (index) => {
        setResponseIa((prev) => prev.filter((task, i) => i !== index));
    };

    const title = responseIa ? 'Vos tâches ...' : 'Créez une tâche';

    return (
        <BaseModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={title}
            imgSrc={imgSrc}
        >
            <div className={styles.container}>
                <div className={styles.containerTasks}>
                    {responseIa &&
                        responseIa.map((task, index) => (
                            <CardIaTask
                                key={task.title}
                                title={task.title}
                                description={task.description}
                                handleDeleteTasks={() =>
                                    handleDeleteIaTask(index)
                                }
                            />
                        ))}
                </div>
                {responseIa && (
                    <div className={styles.containerAdd}>
                        <button type="button" className={styles.addTasksButton}>
                            + Ajouter des tâches
                        </button>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className={styles.containerInput}>
                        {error && <p>{error}</p>}
                        <label htmlFor="description" className={styles.srOnly}>
                            Décrivez les tâches que vous souhaitez ajouter
                        </label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            className={styles.input}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Décrivez les tâches que vous souhaitez ajouter..."
                        />
                        <button type="submit" className={styles.submitButton}>
                            {isLoading ? (
                                'Chargement en cours'
                            ) : (
                                <Image
                                    src="/star_white.svg"
                                    width={8}
                                    height={8}
                                    alt="logo ia"
                                    className={styles.iaLogo}
                                />
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </BaseModal>
    );
}
