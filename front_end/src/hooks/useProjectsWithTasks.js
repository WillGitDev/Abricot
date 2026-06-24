import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function useProjectsWithTasks() {
    const [projects, setProjects] = useState({ data: { projects: [] } });
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);
    const [errorProjects, setErrorProjects] = useState(null);

    const fetchProjects = useCallback(async () => {
        try {
            const response = await fetch('/api/project/getProjectsWithTasks', {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(
                    'Erreur lors de la récupération des projets : ',
                    data.message
                );
                setErrorProjects(
                    data.message || 'Erreur lors de la récupération des projets'
                );
                return;
            }
            setProjects(data);
        } catch (error) {
            toast.error('Erreur lors de la récupération des projets : ', error);
            setErrorProjects(
                'Erreur lors de la récupération des projets : ',
                error
            );
        } finally {
            setIsLoadingProjects(false);
        }
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    return {
        projects,
        errorProjects,
        isLoadingProjects,
        refetchProjects: fetchProjects,
    };
}
