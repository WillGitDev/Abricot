import { useEffect, useState } from 'react';

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [errorProjects, setErrorProjects] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/project/getAllProjects', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();

        if (!response.ok) {
          setErrorProjects(
            data.message || 'Erreur lors de la récupération des projets'
          );
          return;
        }
        setProjects(data);
      } catch (error) {
        setErrorProjects(
          'Erreur lors de la récupération des projets : ',
          error
        );
      } finally {
        setIsLoadingProjects(false);
      }
    }
    fetchProjects();
  }, []);
  return { projects, errorProjects, isLoadingProjects };
}
