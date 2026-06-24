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
import ConfirmBoxModal from '@components/ConfirmBoxModal';
import { toast } from 'sonner';
import Loader from '@components/Loader';
import { filterTask } from '@/utils/filterTask';

export default function SingleProjectPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenValidateModal, setIsOpenValidateModal] = useState(false);
    const [messageValidate, setMessageValidate] = useState(null);
    const [isOpenIaModal, setIsOpenIaModal] = useState(false);
    const [pendingDelete, setPendingDelete] = useState(null);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [isOpenProjectModal, setIsOpenProjectModal] = useState(false);
    const [isCalendar, setIsCalendar] = useState(false);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
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
    if (isLoadingTasksId) return <Loader />;

    if (isLoadingAllProjects) return <Loader />;

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
    const labelToStatus = {
        Tous: 'ALL',
        'À faire': 'TODO',
        'En cours': 'IN_PROGRESS',
        Terminée: 'DONE',
    };
    const filteredTasks = filterTask(tasksById?.data?.tasks, search);
    const statusFiltered =
        statusFilter === 'ALL'
            ? filteredTasks
            : filteredTasks.filter((task) => task.status === statusFilter);
    const currentTasks = sortTasksByPriority(statusFiltered);

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

    const handleOpenCreateModal = () => {
        setTaskToEdit(null);
        setIsOpen(true);
    };

    const handleOpenEditModal = (task) => {
        setTaskToEdit(task);
        setIsOpen(true);
    };

    const handleDelete = async () => {
        setMessageValidate('Voulez-vous vraiment supprimer ce projet ?');
        setPendingDelete({ type: 'project' });
        setIsOpenValidateModal(true);
    };

    const handleDeleteTask = async (taskId) => {
        setMessageValidate('Voulez-vous vraiment supprimer cette tâche ?');
        setPendingDelete({ type: 'task', taskId });
        setIsOpenValidateModal(true);
    };

    const handleConfirmDelete = async () => {
        if (pendingDelete?.type === 'project') {
            const result = await deleteProject(projectId);
            if (result.success) {
                router.push('/projects');
                toast.success('Projet supprimé');
            } else {
                toast.error('Échec de la suppression du projet');
            }
        } else {
            const result = await deleteTask({
                projectId,
                taskId: pendingDelete?.taskId,
            });
            if (result.success) {
                refetchTasks();
                toast.success('Tâche supprimé');
            } else {
                toast.error('Échec de la suppression de la tâche');
            }
        }
        setIsOpenValidateModal(false);
        setPendingDelete(null);
    };

    const handleSelectStatus = (label) => {
        setStatusFilter(labelToStatus[label]);
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
                existingTasks={tasksById.data.tasks}
                projectId={currentProject.id}
                refetchTasks={refetchTasks}
                members={allMembers}
            />
            <ConfirmBoxModal
                isOpen={isOpenValidateModal}
                setIsOpen={setIsOpenValidateModal}
                title="Confirmez votre choix"
                text={messageValidate}
                onConfirm={handleConfirmDelete}
            />

            <div className={styles.containerTopBar}>
                <Link href="/projects" className={styles.buttonReturn}>
                    <Image
                        src="/arrow.svg"
                        width={15}
                        height={15}
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
                        <div className={styles.containerButtonChoice}>
                            <button
                                className={`${styles.buttonChoice} ${!isCalendar ? styles.activeButton : ''}`}
                                onClick={() => setIsCalendar(false)}
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
                                onClick={() => setIsCalendar(true)}
                            >
                                <Image
                                    src="/calendar.svg"
                                    width={16}
                                    height={16}
                                    alt="logo_calendar"
                                />
                                Calendrier
                            </button>
                        </div>

                        <div className={styles.containerSelectOptions}>
                            <SelectOptions
                                options={Object.keys(labelToStatus)}
                                onSelect={handleSelectStatus}
                            />
                        </div>
                        <div className={styles.searchBar}>
                            <input
                                type="search"
                                placeholder="Rechercher une tâche"
                                className={styles.search}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
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
                <div
                    className={`${isCalendar ? styles.taskCalendar : styles.taskList}`}
                >
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
