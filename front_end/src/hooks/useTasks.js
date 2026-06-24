import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function useTasks() {
    const [tasks, setTasks] = useState(null);
    const [userTasks, setUserTasks] = useState(null);
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
                    toast.error(
                        'Erreur lors de la récupération des tâches : ',
                        data.message
                    );
                    setErrorTasks(
                        data.message ||
                            'Erreur lors de la récupération des tâches.'
                    );
                    return;
                }

                setTasks(data);
                setUserTasks(data.data.tasks);
            } catch (error) {
                toast.error(
                    'Erreur lors de la récupération des tâches : ',
                    error
                );
                setErrorTasks(
                    `Erreur lors de la récupération des tâches :  ${error}`
                );
            } finally {
                setIsLoadingTasks(false);
            }
        }
        fetchTasks();
    }, []);
    return { tasks, userTasks, errorTasks, isLoadingTasks };
}
