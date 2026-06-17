'use client';

import * as Dialog from '@radix-ui/react-dialog';
import styles from './baseModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

export default function BaseModal({
    isOpen,
    setIsOpen,
    title,
    imgSrc,
    children,
}) {
    return (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className={styles.modalOverlay} />

                <Dialog.Content
                    className={styles.modalContent}
                    aria-describedby="dialog-description"
                >
                    <div className={styles.headerRow}>
                        <Dialog.Title className={styles.modalTitle}>
                            {imgSrc ? (
                                <Image
                                    src={imgSrc}
                                    width={20}
                                    height={20}
                                    alt="image logo"
                                />
                            ) : (
                                ''
                            )}
                            <span className={styles.title}>{title}</span>
                        </Dialog.Title>
                        <Dialog.Close asChild>
                            <button
                                className={styles.closeButton}
                                aria-label="Fermer"
                            >
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    className={styles.xMark}
                                />
                            </button>
                        </Dialog.Close>
                    </div>

                    <div className={styles.modalBody}>{children}</div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
