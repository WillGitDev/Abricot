'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import useDeleteProject from '@/hooks/useDeleteProject';
import useDeleteTask from '@/hooks/useDeleteTask';
import styles from './singleProjectPage.module.css';
import Image from 'next/image';
import ContributorsLabel from '@components/ContributorsLabel';
import useTasksById from '@/hooks/useTasksById';
import useAllProjects from '@/hooks/useAllProjects';
import SelectOptions from '@components/SelectOptions';
import CardTasksInfo from '@components/CardTasksInfo';
import { sortTasksByPriority } from '@/utils/sortTasksByPriority';
import CreateTaskModal from '@components/CreateTaskModal';
import CreateProjectModal from '@components/CreateProjectModal';
import IaTaskModal from '@components/IaTaskModal';
import Link from 'next/link';

export default function SingleProjectPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenIaModal, setIsOpenIaModal] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [isOpenProjectModal, setIsOpenProjectModal] = useState(false);
    const [isKanban, setIsKanban] = useState(false); // À voir ici si il faut plutôt l'appeler calendar.
    const params = useParams();
    const router = useRouter();
    const { deleteProject } = useDeleteProject();
    const { deleteTask } = useDeleteTask();
    const projectId = params.id;
    const { tasksById, isLoadingTasksId, errorTasksId, refetchTasks } =
        useTasksById(projectId);
    const {
        allProjects,
        isLoadingAllProjects,
        errorAllProjects,
        refetchProjects,
    } = useAllProjects();
    if (isLoadingTasksId) return <div>Chargement ...</div>;
    if (errorTasksId) return <div>{errorTasksId}</div>;
    if (isLoadingAllProjects) return <div>Chargement ...</div>;
    if (errorAllProjects) return <div>{errorAllProjects}</div>;

    const currentProject = allProjects.find(
        (project) => project.id === projectId
    );
    const isAdmin = currentProject.userRole === 'ADMIN';
    const allMembers = [
        { user: currentProject.owner, role: 'OWNER' },
        ...currentProject.members.filter(
            (member) => member.user.id !== currentProject.owner.id
        ),
    ];
    const currentTasks = sortTasksByPriority(tasksById.data.tasks);
    console.log('Le currentProject : ', currentProject);

    const owner = currentProject.owner.name;
    const canCreateTask =
        currentProject.userRole === 'ADMIN' ||
        currentProject.userRole === 'CONTRIBUTOR';

    const contributorsNames = currentProject.members
        .filter((member) => member.user.id !== currentProject.owner.id)
        .map((member) => member.user.name);
    const getCoworker = (task) => {
        const workers = new Set();
        task.assignees.forEach((assignee) => {
            workers.add(assignee.user.name);
        });
        return [...workers];
    };

    const isCalendar = false;

    const handleOpenCreateModal = () => {
        setTaskToEdit(null);
        setIsOpen(true);
    };

    const handleOpenEditModal = (task) => {
        setTaskToEdit(task);
        setIsOpen(true);
    };

    const handleDelete = async () => {
        const confirmed = window.confirm(
            'Voulez-vous vraiment supprimer ce projet ? Cette action est irréversible.'
        );
        if (!confirmed) return;

        const result = await deleteProject(projectId);
        if (result.success) {
            router.push('/projects');
        }
    };

    const handleDeleteTask = async (taskId) => {
        const confirmed = window.confirm(
            'Voulez-vous vraiment supprimer cette tâche ?'
        );
        if (!confirmed) return;

        const result = await deleteTask({ projectId, taskId });
        if (result.success) {
            refetchTasks();
        }
    };
    return (
        <div className={styles.container}>
            <CreateTaskModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                projectId={projectId}
                members={allMembers}
                refetchTasks={refetchTasks}
                taskToEdit={taskToEdit}
            />
            <CreateProjectModal
                isOpen={isOpenProjectModal}
                setIsOpen={setIsOpenProjectModal}
                projectToEdit={currentProject}
                onSuccess={refetchProjects}
            />
            <IaTaskModal
                isOpen={isOpenIaModal}
                setIsOpen={setIsOpenIaModal}
                title="Test du titre"
                imgSrc="/star.svg"
            />
            <div className={styles.containerTopBar}>
                <Link href="/projects" className={styles.buttonReturn}>
                    <Image
                        src="/arrow.svg"
                        width={10}
                        height={10}
                        alt="return"
                    />
                </Link>
                <div className={styles.infoProject}>
                    <div className={styles.containerTitleProject}>
                        <h2 className={styles.h2}>{currentProject.name}</h2>
                        <button
                            type="button"
                            className={styles.buttonModifyProject}
                            onClick={() => setIsOpenProjectModal(true)}
                            disabled={!isAdmin}
                            title={
                                !isAdmin
                                    ? "Seul l'administrateur peut modifier ce projet."
                                    : undefined
                            }
                        >
                            Modifier
                        </button>
                        {isAdmin && (
                            <button
                                type="button"
                                className={styles.buttonDeleteProject}
                                onClick={handleDelete}
                            >
                                Supprimer
                            </button>
                        )}
                    </div>
                    <h3 className={styles.h3}>{currentProject.description}</h3>
                </div>
                <div className={styles.containerButton}>
                    <button
                        className={styles.buttonCreateTask}
                        onClick={handleOpenCreateModal}
                        disabled={!canCreateTask}
                        title={
                            !canCreateTask
                                ? 'Seul le propriétaire ou les contributeurs peuvent créer une tâche'
                                : undefined
                        }
                    >
                        Créer une tâche
                    </button>
                    <button
                        className={styles.buttonIa}
                        onClick={() => setIsOpenIaModal((prev) => !prev)}
                    >
                        <Image
                            src="/star_ia.svg"
                            width={21}
                            height={21}
                            alt="logo ia"
                        />
                        <span className={styles.iaText}>IA</span>
                    </button>
                </div>
            </div>

            <ContributorsLabel owner={owner} usersProject={contributorsNames} />
            <div className={styles.containerTasks}>
                <div className={styles.containerButtonBar}>
                    <p>
                        Tâches <br />
                        Par ordre de priorité
                    </p>

                    <div className={styles.containerChoicePrint}>
                        <button
                            className={`${styles.buttonChoice} ${!isCalendar ? styles.activeButton : ''}`}
                            onClick={() => setIsKanban(false)}
                        >
                            <Image
                                src="/check.svg"
                                width={16}
                                height={16}
                                alt="logo_checking"
                            />
                            Liste
                        </button>
                        <button
                            className={`${styles.buttonChoice} ${isCalendar ? styles.activeButton : ''}`}
                            onClick={() => setIsKanban(true)}
                        >
                            <Image
                                src="/calendar.svg"
                                width={16}
                                height={16}
                                alt="logo_calendar"
                            />
                            Kanban
                        </button>
                        <div className={styles.containerSelectOptions}>
                            <SelectOptions />
                        </div>
                        <div className={styles.searchBar}>
                            <input
                                type="search"
                                placeholder="Rechercher une tâche"
                                className={styles.search}
                            />
                            <button
                                type="button"
                                className={styles.buttonSearchBar}
                                aria-label="Rechercher"
                            >
                                <Image
                                    src="/loupe.svg"
                                    width={14}
                                    height={14}
                                    alt="Logo de loupe pour la recherche"
                                    className={styles.logoGlass}
                                />
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.taskInfo}>
                    {currentTasks.map((task) => (
                        <CardTasksInfo
                            task={task}
                            usersProject={getCoworker(task)}
                            onEdit={() => handleOpenEditModal(task)}
                            onDelete={() => handleDeleteTask(task.id)}
                            key={task.id}
                            canEdit={canCreateTask}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
