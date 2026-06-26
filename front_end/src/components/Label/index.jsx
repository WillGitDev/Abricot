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
            tabIndex={0}
            role="button"
            aria-pressed={isActive}
            className={`${styles.container} ${colorLabel()} 
            ${isActive ? styles.active : ''}`}
            onKeyDown={(e) => {
                if(e.key === 'Enter' || e.key === '') {
                    e.preventDefault();
                    onClick();
                  }
            }}
        >
            <p className={styles.label}>{tag}</p>
        </div>
    );
}
