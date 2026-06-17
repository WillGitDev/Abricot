import { useState } from 'react';

export default function useDeleteTask() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteTask = async ({ projectId, taskId }) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/tasks/deleteTask', {
                method: 'DELETE',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectId, taskId }),
            });
            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Erreur lors de la suppression');
                return { success: false, error: data.message };
            }

            return { success: true, data };
        } catch (err) {
            const errorMessage = 'Erreur réseau : ' + err.message;
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    return { deleteTask, isLoading, error };
}