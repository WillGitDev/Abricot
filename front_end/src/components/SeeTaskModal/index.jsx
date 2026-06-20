'use client';

import styles from './seeTaskModal.module.css';
import BaseModal from '@components/BaseModal';
import { useState, useEffect } from 'react';
import Label from '../Label';

export default function SeeTaskModal({
    isOpen,
    setIsOpen,
    members = [],
    task = null,
}) {
    const [dueDate, setDueDate] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('MEDIUM');
    const [assignees, setAssignees] = useState([]);
    const [isOpenAssignee, setIsOpenAssignee] = useState(false);
    const [status, setStatus] = useState(task.status);
    console.log('La tâche : ', task);
    useEffect(() => {
        if (!isOpen) return;
        setTitle(task.title) || '';
        setDescription(task.description || '');
        setPriority(task.priority || '');
        setStatus(task.status || '');
        setDueDate(task.dueDate.split('T')[0] || '');
        setAssignees(task.assignees || []);
    }, [isOpen, task]);

    return (
        <BaseModal isOpen={isOpen} setIsOpen={setIsOpen} title="Voir la tâche">
            <form>
                <div className={styles.containerInputLabel}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title">Titre*</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className={styles.input}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            readOnly
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="description">Description*</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            className={styles.input}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            readOnly
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="dueDate">Échéance*</label>
                        <input
                            type="date"
                            id="dueDate"
                            name="dueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            min={dueDate}
                            className={styles.input}
                            readOnly
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <span id="assignee">Assigné à :</span>
                        {assignees.length > 0 && (
                            <div className={styles.chipsContainer}>
                                {assignees.map((member) => (
                                    <span
                                        key={member.user.id}
                                        className={styles.chip}
                                    >
                                        {member.user.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className={styles.choiceLabel}>
                        <p>Statut:</p>
                        <div className={styles.containerLabel}>
                            <Label
                                tag="TODO"
                                isActive={status === 'TODO'}
                                onClick={() => setStatus('TODO')}
                            />
                            <Label
                                tag="IN_PROGRESS"
                                isActive={status === 'IN_PROGRESS'}
                                onClick={() => setStatus('IN_PROGRESS')}
                            />
                            <Label
                                tag="DONE"
                                isActive={status === 'DONE'}
                                onClick={() => setStatus('DONE')}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </BaseModal>
    );
}
