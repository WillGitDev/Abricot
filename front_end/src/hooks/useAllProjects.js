import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';

export default function useAllProjects() {
    const [allProjects, setAllProjects] = useState([]);
    const [isLoadingAllProjects, setIsLoadingAllProjects] = useState(true);
    const [errorAllProjects, setErrorAllProjects] = useState(null);

    const fetchAllProjects = useCallback(async () => {
        try {
            const response = await fetch('/api/project/getProjects', {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(
                    'Erreur lors de la récupération des projets : ',
                    data.message
                );
                setErrorAllProjects(
                    data.message || 'Erreur lors de la récupération des projets'
                );
                return;
            }

            setAllProjects(data.data.projects);
        } catch (error) {
            toast.error('Erreur réseau : ', error);
            setErrorAllProjects('Erreur réseau : ' + error.message);
        } finally {
            setIsLoadingAllProjects(false);
        }
    }, []);

    useEffect(() => {
        fetchAllProjects();
    }, [fetchAllProjects]);

    return {
        allProjects,
        isLoadingAllProjects,
        errorAllProjects,
        refetchProjects: fetchAllProjects,
    };
}
