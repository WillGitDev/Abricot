import { useEffect, useState } from 'react';

export default function useTasksById(id) {
  const [tasksById, setTasksById] = useState(null);
  const [isLoadingTasksId, setIsLoadingTasksId] = useState(true);
  const [errorTasksId, setErrorTasksId] = useState(null);

  useEffect(() => {
    if (!id) return;
    async function fetchTasksById() {
      try {
        const response = await fetch(`/api/tasks/getTasksById?id=${id}`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();

        if (!response.ok) {
          setErrorTasksId(
            data.message ||
              "Erreur lors de la récupération des tâches avec l'id"
          );
          return;
        }
        setTasksById(data);
      } catch (error) {
        setErrorTasksId(
          `Erreur lors de la récupération des tâches avec l'id : ${error}`
        );
      } finally {
        setIsLoadingTasksId(false);
      }
    }
    fetchTasksById();
  }, [id]);
  return { tasksById, isLoadingTasksId, errorTasksId };
}
