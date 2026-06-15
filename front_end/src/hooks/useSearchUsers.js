import { useState } from 'react';

export default function useSearchUsers() {
    const [results, setResults] = useState([]);

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
                setResults([]);
            }
        } catch (error) {
            setResults([]);
        } finally {
            setIsSearching(false);
        }
    };
    const clearResults = () => setResults([]);
    return { searchUsers, results, isSearching, clearResults };
}
