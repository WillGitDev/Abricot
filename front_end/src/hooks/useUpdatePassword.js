import { useState } from 'react';
import { toast } from 'sonner';

export default function useUpdatePassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updatePassword = async ({ currentPassword, newPassword }) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/password', {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentPassword, newPassword }),
            });
            const data = await response.json();

            if (!response.ok) {
                toast.error(
                    'Erreur lors de la modification du mot de passe : ',
                    data.message
                );
                setError(
                    data.message ||
                        'Erreur lors de la modification du mot de passe'
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

    return { updatePassword, isLoading, error };
}
