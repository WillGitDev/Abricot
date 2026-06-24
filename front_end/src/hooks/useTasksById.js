import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';

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
                toast.error(
                    'Erreur lors de la récupération des projets : ',
                    data.message
                );
                setErrorTasksId(
                    data.message || 'Erreur lors de la récupération des tâches'
                );
                return;
            }

            setTasksById(data);
        } catch (error) {
            toast.error('Erreur : ', error);
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
