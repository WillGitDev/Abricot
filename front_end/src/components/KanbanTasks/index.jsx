import styles from './kanbanTasks.module.css';
import CardTasks from '@components/CardTasks';
import CounterTasks from '@components/CounterTasks';

export default function KanbanTasks({ tasks }) {
  const tasksTodo = tasks.TODO || [];
  const tasksInProgress = tasks.IN_PROGRESS || [];
  const tasksDone = tasks.DONE || [];

  return (
    <div className={styles.container}>
      <div className={`${styles.todo} ${styles.status}`}>
        <div className={styles.containerTitle}>
          <h2 className={styles.title}>À faire</h2>
          <CounterTasks nbrTasks={tasksTodo.length} />
        </div>
        <div className={styles.containerTasks}>
          {tasksTodo.map((task) => (
            <CardTasks task={task} variant="" key={task.id} />
          ))}
        </div>
      </div>
      <div className={`${styles.status} ${styles.inProgress}`}>
        <div className={styles.containerTitle}>
          <h2 className={styles.title}>En cours</h2>
          <CounterTasks nbrTasks={tasksInProgress.length} />
        </div>
        <div className={styles.containerTasks}>
          {tasksInProgress.map((task) => (
            <CardTasks task={task} variant="" key={task.id} />
          ))}
        </div>
      </div>
      <div className={`${styles.status} ${styles.end}`}>
        <div className={styles.containerTitle}>
          <h2 className={styles.title}>Terminées</h2>
          <CounterTasks nbrTasks={tasksDone.length} />
        </div>
        {tasksDone.map((task) => (
          <CardTasks task={task} variant="" key={task.id} />
        ))}
      </div>
    </div>
  );
}
