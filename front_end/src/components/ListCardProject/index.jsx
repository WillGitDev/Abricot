import styles from './listCardProject.module.css';
import CardProjects from '@components/CardProjects';
import Link from 'next/link';
import useTasksById from '@/hooks/useTasksById';

export default function ListCardProject({ projects }) {
    return (
        <div className={styles.container}>
            {projects.map((project) => {
                return (
                    <Link key={project.id} href={`/projects/${project.id}`}>
                        <CardProjects
                            project={project}
                            projectId={project.id}
                        />
                    </Link>
                );
            })}
        </div>
    );
}
