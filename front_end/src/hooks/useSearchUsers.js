import { useState } from 'react';
import { toast } from 'sonner';

export default function useSearchUsers() {
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

    const searchUsers = async (query) => {
        if (!query || query.trim().length < 2) {
            setResults([]);
            return;
        }

        setIsSearching(true);

        try {
            const response = await fetch(`/api/users/search?query=${query}`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();

            if (response.ok) {
                setResults(data.data.users);
            } else {
                toast.error('Erreur de recherche : ', data.message);
                setError('Erreur de la recherche : ', data.message);
                setResults([]);
            }
        } catch (error) {
            toast.error('Erreur serveur : ', error);
            setError('Erreur serveur : ', error);
            setResults([]);
        } finally {
            setIsSearching(false);
        }
    };
    const clearResults = () => setResults([]);
    return { searchUsers, results, isSearching, clearResults };
}
