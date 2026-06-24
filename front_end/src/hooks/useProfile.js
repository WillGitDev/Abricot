import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function useProfile() {
    const [profile, setProfile] = useState(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const [errorProfile, setErrorProfile] = useState(null);
    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await fetch('/api/profile', {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();
                if (!response.ok) {
                    toast.error(
                        data.message || 'Erreur de récupération du profil'
                    );
                    setErrorProfile(data.message || 'Erreur de profil');
                    return;
                }

                setProfile(data);
            } catch (error) {
                toast.error(
                    'Erreur lors de la récupération du profile : ',
                    error
                );
                setErrorProfile(
                    'Erreur lors de la récupération du profile : ',
                    error
                );
            } finally {
                setIsLoadingProfile(false);
            }
        }
        fetchProfile();
    }, []);
    return { profile, isLoadingProfile, errorProfile };
}
