import { useState } from 'react';

export default function useUpdateProject() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateProject = async ({
        projectId,
        name,
        description,
        contributorsToAdd = [],
        contributorsToRemove = [],
    }) => {
        setIsLoading(true);
        setError(null);

        try {
            const responsePut = await fetch('/api/project/putProject', {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectId, name, description }),
            });
            const dataPut = await responsePut.json();
            if (!responsePut.ok) {
                setError(dataPut.message || 'Erreur lors de la modification');
                return { success: false, error: dataPut.message };
            }

            for (const email of contributorsToAdd) {
                const resAdd = await fetch('/api/project/addContributor', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ projectId, email }),
                });
                if (!resAdd.ok) {
                    const dataAdd = await resAdd.json();
                    console.error('Échec ajout contributeur', email, dataAdd);
                    setError(
                        dataAdd.message ||
                            `Impossible d'ajouter le contributeur ${email}`
                    );
                    return { success: false, error: dataAdd.message };
                }
            }

            for (const userId of contributorsToRemove) {
                const resRemove = await fetch(
                    '/api/project/removeContributor',
                    {
                        method: 'DELETE',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ projectId, userId }),
                    }
                );
                if (!resRemove.ok) {
                    const dataRemove = await resRemove.json();
                    console.error(
                        'Échec retrait contributeur',
                        userId,
                        dataRemove
                    );
                    setError(
                        dataRemove.message ||
                            `Impossible de retirer le contributeur`
                    );
                    return { success: false, error: dataRemove.message };
                }
            }

            return { success: true, data: dataPut };
        } catch (err) {
            const errorMessage = 'Erreur réseau : ' + err.message;
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    return { updateProject, isLoading, error };
}
