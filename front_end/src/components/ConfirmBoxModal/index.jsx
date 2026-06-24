import styles from './confirmBox.module.css';
import BaseModal from '@components/BaseModal';

export default function ConfirmBoxModal({
    title,
    isOpen,
    setIsOpen,
    text,
    onConfirm,
}) {
    return (
        <div className={styles.container}>
            <BaseModal
                title={title}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                text={text}
            >
                <p>{text}</p>
                <div className={styles.containerButton}>
                    <button
                        type="button"
                        onClick={() => onConfirm()}
                        className={styles.button}
                    >
                        Oui
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className={styles.button}
                    >
                        Non
                    </button>
                </div>
            </BaseModal>
        </div>
    );
}
