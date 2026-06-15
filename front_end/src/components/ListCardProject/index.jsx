import styles from './listCardProject.module.css';
import CardProjects from '@components/CardProjects';
import Link from 'next/link';

export default function ListCardProject({ projects }) {
    return (
        <div className={styles.container}>
            {projects.map((project) => {
                const totalTasks = project.tasks ? project.tasks.length : 0;
                const taskDone = project.tasks
                    ? project.tasks.filter((task) => task.status === 'DONE')
                          .length
                    : 0;

                return (
                    <Link key={project.id} href={`/projects/${project.id}`}>
                        <CardProjects
                            project={project}
                            totalTasks={totalTasks}
                            taskDone={taskDone}
                        />
                    </Link>
                );
            })}
        </div>
    );
}
