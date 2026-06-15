import { useState } from 'react';

export default function useCreateTask() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const createTask = async (taskData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/tasks/postTask', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.message || 'Erreur lors de la création de la tâche'
                );
                return { success: false, error: data.message };
            }

            setError(null);
            return { success: true, data };
        } catch (error) {
            const errorMessage = 'Erreur réseau : ' + error.message;
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };
    return { createTask, isLoading, error };
}
