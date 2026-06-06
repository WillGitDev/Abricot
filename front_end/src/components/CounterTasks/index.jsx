import styles from './counterTasks.module.css';

export default function CounterTasks({ nbrTasks }) {
  return (
    <div className={styles.container}>
      <p>{nbrTasks}</p>
    </div>
  );
}
