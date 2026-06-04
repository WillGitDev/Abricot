import { useEffect, useState } from 'react';

export default function useTasks() {
  const [tasks, setTasks] = useState(null);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [errorTasks, setErrorTasks] = useState(null);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch('/api/tasks/getAllTasks', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();

        if (!response.ok) {
          setErrorTasks(data.message || 'Erreur de récupération des tâches.');
          return;
        }
        setTasks(data);
      } catch (error) {
        setErrorTasks('Erreur lors de la récupération des tâches : ', error);
      } finally {
        setIsLoadingTasks(false);
      }
    }
    fetchTasks();
  }, []);
  return { tasks, errorTasks, isLoadingTasks };
}
