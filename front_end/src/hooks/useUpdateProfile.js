import { useState } from 'react';
import { toast } from 'sonner';

export default function useUpdateProfile() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateProfile = async ({ name, email }) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
            });
            const data = await response.json();

            if (!response.ok) {
                toast.error(
                    'Erreur lors de la modification du profil : ',
                    data.message
                );
                setError(
                    data.message || 'Erreur lors de la modification du profil'
                );
                return { success: false, error: data.message };
            }

            return { success: true, data };
        } catch (err) {
            const errorMessage = 'Erreur réseau : ' + err.message;
            toast.error(errorMessage);
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    return { updateProfile, isLoading, error };
}
