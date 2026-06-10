'use client';

import { useParams } from 'next/navigation';
import styles from './singleProjectPage.module.css';
import Image from 'next/image';
import ContributorsLabel from '@/components/ContributorsLabel';
import useTasksById from '@/hooks/useTasksById';
import useProjects from '@/hooks/useProjects';
import SelectOptions from '@components/SelectOptions';
import CardTasksInfo from '@components/CardTasksInfo';
import { sortTasksByPriority } from '@/utils/sortTasksByPriority';

export default function SingleProjectPage() {
    const params = useParams();
    const projectId = params.id;
    const { tasksById, isLoadingTasksId, errorTasksId } =
        useTasksById(projectId);
    const { projects, isLoadingProjects, errorProjects } = useProjects();
    if (isLoadingTasksId) return <div>Chargement ...</div>;
    if (errorTasksId) return <div>{errorTasksId}</div>;
    if (isLoadingProjects) return <div>Chargement ...</div>;
    if (errorProjects) return <div>{errorProjects}</div>;

    const currentProject = projects.data.projects.find(
        (project) => project.id === projectId
    );
    const currentTasks = sortTasksByPriority(tasksById.data.tasks);

    const owner = currentProject.owner.name;
    const coworker = new Set();
    currentTasks.forEach((task) => {
        task.assignees.forEach((assignee) => {
            coworker.add(assignee.user.name);
        });
    });
    const getCoworker = (task) => {
        const workers = new Set();
        task.assignees.forEach((assignee) => {
            workers.add(assignee.user.name);
        });
        return [...workers];
    };
    // coworker.delete(owner);
    const isCalendar = false;

    return (
        <div className={styles.container}>
            <div className={styles.containerTopBar}>
                <button className={styles.buttonReturn}>
                    <Image
                        src="/arrow.svg"
                        width={10}
                        height={10}
                        alt="return"
                    />
                </button>
                <div className={styles.infoProject}>
                    <div className={styles.containerTitleProject}>
                        <h2 className={styles.h2}>
                            {tasksById.data.tasks[0].project.name}
                        </h2>
                        <a href="/">Modifier</a>
                    </div>
                    <h3 className={styles.h3}>{currentProject.description}</h3>
                </div>
                <div className={styles.containerButton}>
                    <button className={styles.buttonCreateTask}>
                        Créer une tâche
                    </button>
                    <button className={styles.buttonIa}>
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

            <ContributorsLabel owner={owner} usersProject={[...coworker]} />
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
                        <SelectOptions />
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
                            key={task.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
