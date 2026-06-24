import { useState } from 'react';
import { toast } from 'sonner';

export default function useUpdateTask() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateTask = async (taskData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/tasks/putTask', {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(
                    'Erreur lors de la modification de la tâche : ',
                    data.message
                );
                setError(
                    data.message || 'Erreur lors de la modification de la tâche'
                );
                return { success: false, error: data.message };
            }

            setError(null);
            return { success: true, data };
        } catch (error) {
            const errorMessage = 'Erreur réseau : ' + error.message;
            toast.error(errorMessage);
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    return { updateTask, isLoading, error };
}
