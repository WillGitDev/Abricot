import styles from './cardProjects.module.css';
import Image from 'next/image';
import UserInitial from '@components/UserInitial';
import Label from '../Label';

export default function CardProjects({ project, totalTasks, taskDone }) {
  // Un objet set pour compter en fonction l'id le nombre de
  // colaborateur sur le projet.
  const userIds = new Set();
  const fullNameTeams = new Set();
  const percentage =
    totalTasks > 0 ? Math.round((taskDone / totalTasks) * 100) : 0;
  project.tasks.forEach((task) => {
    task.assignees.forEach((assignee) => {
      userIds.add(assignee.userId);
      fullNameTeams.add(assignee.user.name);
    });
  });
  const owner = project.owner.name;
  const usersProject = new Set();
  project.tasks.map((task) => {
    task.assignees.map((assignee) => {
      usersProject.add(assignee.user.name);
    });
  });
  usersProject.delete(owner);

  return (
    <div className={styles.container} key={project.id}>
      <div className={styles.containerTitle}>
        <h2 className={styles.titleProject}>{project.name}</h2>
        <h3 className={styles.description}>{project.description}</h3>
      </div>
      <div className={styles.progressBar}>
        <div className={styles.containerTitleProgressBar}>
          <p className={styles.progressText}>Progression</p>
          <p className={styles.progressText}>{percentage} %</p>
        </div>
        <progress
          max={totalTasks}
          value={taskDone}
          className={styles.progress}
        />
        <p className={styles.endTasks}>0/2 tâches terminées</p>
      </div>
      <div className={styles.teams}>
        <Image src={'/teams.svg'} width={12} height={12} alt="Logo teams" />
        <p className={styles.teamsNumber}>Équipe ({usersProject.size + 1})</p>
      </div>
      <div className={styles.containerOwners}>
        <UserInitial name={owner} isSmall={true} color="orange" />

        <Label tag="owner" />
        <div className={styles.projectPartners}>
          {[...usersProject].map((user) => (
            <div key={user} className={styles.userInitial}>
              <UserInitial name={user} isSmall={true} color="grey" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
