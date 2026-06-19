import styles from './cardIaTask.module.css';
import Image from 'next/image';

export default function CardIaTask({ title, description, handleDeleteTasks }) {
    return (
        <div className={styles.container}>
            <div className={styles.containerTitle}>
                <h2 className={styles.title}>{title}</h2>
                <h3 className={styles.description}>{description}</h3>
            </div>
            <div className={styles.containerEditButton}>
                <button
                    type="button"
                    className={styles.button}
                    onClick={handleDeleteTasks}
                >
                    <Image
                        src="/trash.svg"
                        width={15}
                        height={15}
                        alt="une icone de corbeille"
                    />
                    <p className={styles.textButton}>Supprimer</p>
                </button>
                <p>|</p>
                <button type="button" className={styles.button}>
                    <Image
                        src="/edit.svg"
                        width={15}
                        height={15}
                        alt="Une icone de crayon"
                    />
                    <p className={styles.textButton}>Modifier</p>
                </button>
            </div>
        </div>
    );
}
