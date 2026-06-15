'use client';

import styles from './createProjectModal.module.css';
import BaseModal from '@components/BaseModal';
import { useState } from 'react';
import useCreateProject from '@/hooks/useCreateProject';
import useSearchUsers from '@/hooks/useSearchUsers';

export default function CreateProjectModal({ isOpen, setIsOpen }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [contributors, setContributors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const { createProject, isLoading, error } = useCreateProject();
    const { searchUsers, results, isSearching, clearResults } =
        useSearchUsers();
    const isFormValid = title.trim() !== '' && description.trim() !== '';

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        searchUsers(value);
    };

    const handleAddContributor = (user) => {
        const isAlreadyAdded = contributors.some(
            (contributor) => contributor.id === user.id
        );
        if (!isAlreadyAdded) {
            setContributors([...contributors, user]);
        }
        setSearchQuery('');
        clearResults();
    };

    const handleRemoveContributor = (userId) => {
        setContributors(contributors.filter((c) => c.id !== userId));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid) return;

        const result = await createProject({
            name: title,
            description: description,
            contributors: contributors.map((c) => c.email),
        });

        if (result.success) {
            setTitle('');
            setDescription('');
            setContributors([]);
            setIsOpen(false);
        }
    };

    return (
        <BaseModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Créer un projet"
        >
            <form onSubmit={handleSubmit}>
                <div className={styles.containerInputLabel}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title">Titre*</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className={styles.input}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="description">Description*</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            className={styles.input}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Contributeurs</label>

                        {/* Chips des contributeurs sélectionnés */}
                        {contributors.length > 0 && (
                            <div className={styles.chipsContainer}>
                                {contributors.map((user) => (
                                    <span key={user.id} className={styles.chip}>
                                        {user.name || user.email}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveContributor(user.id)
                                            }
                                            className={styles.chipRemove}
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Champ de recherche + liste déroulante */}
                        <div className={styles.searchWrapper}>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Choisir un ou plusieurs collaborateurs"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                disabled={isLoading}
                                autoComplete="off"
                            />

                            {/* Liste des résultats */}
                            {results.length > 0 && (
                                <ul className={styles.dropdown}>
                                    {results.map((user) => (
                                        <li
                                            key={user.id}
                                            className={styles.dropdownItem}
                                            onClick={() =>
                                                handleAddContributor(user)
                                            }
                                        >
                                            <span className={styles.userName}>
                                                {user.name}
                                            </span>
                                            <span className={styles.userEmail}>
                                                {user.email}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {isSearching && (
                                <p className={styles.searching}>Recherche...</p>
                            )}
                        </div>
                    </div>

                    {error && <p className={styles.error}>{error}</p>}
                </div>
                <button
                    type="submit"
                    className={`${styles.button} ${isFormValid && !isLoading ? styles.buttonActive : ''}`}
                    disabled={!isFormValid || isLoading}
                >
                    {isLoading ? 'Création en cours...' : 'Créer le projet'}
                </button>
            </form>
        </BaseModal>
    );
}
