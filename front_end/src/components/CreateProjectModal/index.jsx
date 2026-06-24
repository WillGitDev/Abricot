'use client';

import styles from './createProjectModal.module.css';
import BaseModal from '@components/BaseModal';
import { useState, useEffect } from 'react';
import useCreateProject from '@/hooks/useCreateProject';
import useUpdateProject from '@/hooks/useUpdateProject';
import useSearchUsers from '@/hooks/useSearchUsers';
import { toast } from 'sonner';

export default function CreateProjectModal({
    isOpen,
    setIsOpen,
    projectToEdit = null,
    onSuccess,
}) {
    const isEditMode = Boolean(projectToEdit);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [contributors, setContributors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const {
        createProject,
        isLoading: isCreating,
        error: createError,
    } = useCreateProject();
    const {
        updateProject,
        isLoading: isUpdating,
        error: updateError,
    } = useUpdateProject();
    const { searchUsers, results, isSearching, clearResults } =
        useSearchUsers();

    const isLoading = isEditMode ? isUpdating : isCreating;
    const error = isEditMode ? updateError : createError;
    const isFormValid = title.trim() !== '' && description.trim() !== '';

    const ownerId = projectToEdit?.owner?.id;
    const filteredResults = results.filter(
        (user) =>
            user.id !== ownerId && !contributors.some((c) => c.id === user.id)
    );

    useEffect(() => {
        if (!isOpen) return;

        if (projectToEdit) {
            setTitle(projectToEdit.name);
            setDescription(projectToEdit.description || '');

            setContributors(
                projectToEdit.members
                    .filter((m) => m.user.id !== projectToEdit.owner.id)
                    .map((m) => m.user)
            );
        } else {
            setTitle('');
            setDescription('');
            setContributors([]);
        }
        setSearchQuery('');
        clearResults();
    }, [isOpen, projectToEdit]);

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
        setContributors(
            contributors.filter((contributor) => contributor.id !== userId)
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid) return;

        let result;

        if (isEditMode) {
            const originalIds = projectToEdit.members
                .filter((m) => m.user.id !== projectToEdit.owner.id)
                .map((m) => m.user.id);
            const currentIds = contributors.map((c) => c.id);

            const contributorsToAdd = contributors
                .filter((c) => !originalIds.includes(c.id))
                .map((c) => c.email);

            const contributorsToRemove = originalIds.filter(
                (id) => !currentIds.includes(id)
            );

            result = await updateProject({
                projectId: projectToEdit.id,
                name: title,
                description,
                contributorsToAdd,
                contributorsToRemove,
            });
        } else {
            result = await createProject({
                name: title,
                description: description,
                contributors: contributors.map((c) => c.email),
            });
        }

        if (result.success) {
            toast.success('Projet créé');
            setTitle('');
            setDescription('');
            setContributors([]);
            if (onSuccess) onSuccess();
            setIsOpen(false);
        } else {
            toast.error('Une erreur est survenue : ', result.error);
        }
    };

    return (
        <BaseModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={isEditMode ? 'Modifier un projet' : 'Créer un projet'}
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
                        <label htmlFor="contributors-search">Contributeurs</label>

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

                        <div className={styles.searchWrapper}>
                            <input
                                type="text"
                                id='contributors-search'
                                className={styles.input}
                                placeholder="Choisir un ou plusieurs collaborateurs"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                disabled={isLoading}
                                autoComplete="off"
                            />

                            {filteredResults.length > 0 && (
                                <ul className={styles.dropdown}>
                                    {filteredResults.map((user) => (
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
                    {isEditMode
                        ? isLoading
                            ? 'Enregistrement...'
                            : 'Enregistrer'
                        : isLoading
                          ? 'Création en cours...'
                          : 'Créer le projet'}
                </button>
            </form>
        </BaseModal>
    );
}
