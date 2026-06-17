import { useState } from 'react';

export default function useDeleteProject() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteProject = async (projectId) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/project/deleteProject', {
                method: 'DELETE',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectId }),
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

    return { deleteProject, isLoading, error };
}