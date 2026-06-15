import { useState } from 'react';

export default function useCreateProject() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createProject = async (projectData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/project/postProject', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Erreur lors de la création du projet');
        return { success: false, error: data.message };
      }

      setError(null);
      return { success: true, data };
    } catch (err) {
      const errorMessage = 'Erreur réseau : ' + err.message;
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { createProject, isLoading, error };
}
