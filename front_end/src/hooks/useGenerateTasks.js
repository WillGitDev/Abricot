import { useState } from 'react';

export default function useGenerateTasks() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const createTasks = async ({ prompt, existingTasks }) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/ia/generateTasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, existingTasks }),
            });
            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.message ||
                        'Erreur lors de la récupération des tâches du LLM'
                );
                return { success: false, error: data.message };
            }

            return { success: true, data };
        } catch (error) {
            setError(`Erreur réseau : ${error.message}`);
            return {
                success: false,
                error: `Erreur réseau : ${error.message}`,
            };
        } finally {
            setIsLoading(false);
        }
    };
    return { createTasks, isLoading, error };
}
