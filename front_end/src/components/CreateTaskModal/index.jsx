'use client';

import styles from './createTaskModal.module.css';
import BaseModal from '@components/BaseModal';
import { useState, useEffect } from 'react';
import Label from '../Label';
import useCreateTask from '@/hooks/useCreateTask';

export default function CreateTaskModal({
    isOpen,
    setIsOpen,
    projectId,
    members,
    refetchTasks,
}) {
    const dateNow = () => {
        const now = new Date();
        const offset = now.getTimezoneOffset() * 6000;
        return new Date(now - offset).toISOString().split('T')[0];
    };
    const [dueDate, setDueDate] = useState(dateNow());
    useEffect(() => {
        if (isOpen) {
            setDueDate(dateNow());
        }
    }, [isOpen]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('MEDIUM');
    const [assignees, setAssignees] = useState([]);
    const [isOpenAssignee, setIsOpenAssignee] = useState(false);
    const [status, setStatus] = useState('TODO');
    const { createTask, isLoading, error } = useCreateTask();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await createTask({
            projectId,
            title,
            description,
            priority,
            dueDate,
            assigneeIds: assignees.map((assignee) => assignee.user.id),
        });

        if (result.success) {
            setTitle('');
            setDescription('');
            setPriority('MEDIUM');
            refetchTasks();
            setIsOpen(false);
        }
    };

    const handleAddAssignee = (member) => {
        const isAlreadyAdded = assignees.some((assignee) => {
            return assignee.user.id === member.user.id;
        });
        if (!isAlreadyAdded) {
            setAssignees([...assignees, member]);
        }
        setIsOpenAssignee(false);
    };

    const handleRemoveAssignee = (userId) => {
        return setAssignees(
            assignees.filter((assigne) => assigne.user.id !== userId)
        );
    };

    return (
        <BaseModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Créer une tâche"
        >
            <form onSubmit={handleSubmit}>
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
                            required
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
                            required
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
                            required
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
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveAssignee(
                                                    member.user.id
                                                )
                                            }
                                            className={styles.chipRemove}
                                        >
                                            x
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className={styles.searchWrapper}>
                            <button
                                type="button"
                                className={styles.assigneeButton}
                                onClick={() =>
                                    setIsOpenAssignee(!isOpenAssignee)
                                }
                            >
                                Choisir un ou plusieurs membres
                            </button>

                            {isOpenAssignee && (
                                <ul className={styles.dropdown}>
                                    {members.map((member) => (
                                        <li
                                            key={member.user.id}
                                            className={styles.dropdownItem}
                                            onClick={() =>
                                                handleAddAssignee(member)
                                            }
                                        >
                                            <span className={styles.userName}>
                                                {member.user.name}
                                            </span>
                                            <span className={styles.userEmail}>
                                                {member.user.email}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
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
                <button type="submit" className={styles.button}>
                    + Ajouter une tâche
                </button>
            </form>
        </BaseModal>
    );
}
