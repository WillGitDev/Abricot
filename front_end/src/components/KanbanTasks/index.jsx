import styles from './kanbanTasks.module.css';
import CardTasks from '@components/CardTasks';
import CounterTasks from '@components/CounterTasks';

export default function KanbanTasks({ tasks }) {
  const tasksTodo = tasks.TODO || [];
  const tasksInProgress = tasks.IN_PROGRESS || [];
  const tasksDone = tasks.DONE || [];
  console.log('La grandeur du tableau : ', tasksDone);
  console.log('Le tasks todo :', tasksTodo);
  return (
    <div className={styles.container}>
      <div className={`${styles.todo} ${styles.status}`}>
        <div className={styles.containerTitle}>
          <h2 className={styles.title}>À faire</h2>
          <CounterTasks nbrTasks={tasksTodo.length} />
        </div>
        <div className={styles.containerTasks}>
          <CardTasks tasks={tasksTodo} variant="" />
        </div>
      </div>
      <div className={`${styles.status} ${styles.inProgress}`}>
        <div className={styles.containerTitle}>
          <h2 className={styles.title}>En cours</h2>
          <CounterTasks nbrTasks={tasksInProgress.length} />
        </div>
        <div className={styles.containerTasks}>
          <CardTasks tasks={tasksInProgress} variant="" />
        </div>
      </div>
      <div className={`${styles.status} ${styles.end}`}>
        <div className={styles.containerTitle}>
          <h2 className={styles.title}>Terminées</h2>
          <CounterTasks nbrTasks={tasksDone.length} />
        </div>
        <CardTasks tasks={tasksDone} variant="" />
      </div>
    </div>
  );
}
