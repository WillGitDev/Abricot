'use client';

import styles from './cardTasksInfo.module.css';
import Image from 'next/image';
import { dateFormatDM } from '@/utils/dateFormatDM';
import Label from '@components/Label';
import UserInitial from '@components/UserInitial';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CardTaskInfo({ task, usersProject }) {
    const dueDate = dateFormatDM(task.dueDate);
    const usersProjectArray = [...usersProject];
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.containerTitle}>
                    <div className={styles.titleLabel}>
                        <p className={styles.title}>{task.title}</p>
                        <Label tag={task.status} />
                    </div>
                    <p className={styles.subtitle}>{task.description}</p>
                </div>
                <div className={styles.containerDueDate}>
                    <p className={styles.txtDueDate}>Échéance: </p>
                    <Image
                        src="/calendar_black.svg"
                        width={15}
                        height={15}
                        alt="logo de calendrier"
                    />
                    <p className={styles.dueDate}>{dueDate}</p>
                </div>
                <div className={styles.txtAssignee}>
                    <p>Assigné à :</p>
                    <div className={styles.label}>
                        {usersProjectArray.map((user) => (
                            <div className={styles.userLabel} key={user}>
                                <UserInitial name={user} isSmall={true} />
                                <Label tag="user" fullName={user} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.commentaires}>
                <button
                    className={styles.buttonExpand}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                >
                    <span>Commentaires({task.comments.length})</span>
                    <FontAwesomeIcon
                        icon={isOpen ? faChevronUp : faChevronDown}
                        className={`${styles.chevron} ${isOpen ? styles.rotated : ''}`}
                    />
                </button>
                <div
                    className={`${styles.containerComments} ${isOpen && styles.open}`}
                >
                    {task.comments.map((comment, index) => (
                        <div
                            key={`${task.id}-${index}`}
                            className={styles.commentItem}
                        >
                            <UserInitial
                                name={comment.author.name}
                                isSmall={true}
                                color="orange"
                            />
                            <p>{comment.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
