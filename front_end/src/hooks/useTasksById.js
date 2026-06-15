import { useEffect, useState, useCallback } from 'react';

export default function useTasksById(id) {
    const [tasksById, setTasksById] = useState(null);
    const [isLoadingTasksId, setIsLoadingTasksId] = useState(true);
    const [errorTasksId, setErrorTasksId] = useState(null);

    const fetchTasksById = useCallback(async () => {
        if (!id) return;
        try {
            const response = await fetch(`/api/tasks/getTasksById?id=${id}`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            if (!response.ok) {
                setErrorTasksId(
                    data.message || 'Erreur lors de la récupération des tâches'
                );
                return;
            }
            setTasksById(data);
        } catch (error) {
            setErrorTasksId(`Erreur : ${error}`);
        } finally {
            setIsLoadingTasksId(false);
        }
    }, [id]);

    useEffect(() => {
        fetchTasksById();
    }, [fetchTasksById]);

    return {
        tasksById,
        isLoadingTasksId,
        errorTasksId,
        refetchTasks: fetchTasksById,
    };
}
