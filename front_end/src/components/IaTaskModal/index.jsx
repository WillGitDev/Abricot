'use client';

import styles from './iaTaskModal.module.css';
import Image from 'next/image';
import BaseModal from '@components/BaseModal';

export default function IaTaskModal({ isOpen, setIsOpen, imgSrc }) {
    return (
        <BaseModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={'Créer une tâche'}
            imgSrc={imgSrc}
        >
            <div className={styles.container}>
                <div className={styles.containerTasks}></div>
                <form>
                    <div className={styles.containerInput}>
                        <label htmlFor="description" className={styles.srOnly}>
                            Décrivez les tâches que vous souhaitez ajouter
                        </label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            className={styles.input}
                            placeholder="Décrivez les tâches que vous souhaitez ajouter..."
                        />
                        <button type="submit" className={styles.submitButton}>
                            <Image
                                src="/star_white.svg"
                                width={8}
                                height={8}
                                alt="logo ia"
                                className={styles.iaLogo}
                            />
                        </button>
                    </div>
                </form>
            </div>
        </BaseModal>
    );
}
