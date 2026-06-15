import styles from './label.module.css';

export default function Label({ tag, fullName, onClick, isActive }) {
    const colorLabel = () => {
        switch (tag) {
            case 'TODO':
                tag = 'À faire';
                return styles.todo;
            case 'IN_PROGRESS':
                tag = 'En cours';
                return styles.inProgress;
            case 'DONE':
                tag = 'Terminée';
                return styles.done;
            case 'owner':
                tag = 'Propriétaire';
                return styles.owner;
            case 'user':
                tag = fullName;
                return styles.user;
        }
    };

    return (
        <div
            className={`${styles.container} ${colorLabel()} 
            ${isActive ? styles.active : ''}`}
            onClick={onClick}
        >
            <p className={styles.label}>{tag}</p>
        </div>
    );
}
