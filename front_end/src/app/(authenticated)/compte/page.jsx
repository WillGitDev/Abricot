'use client';

import styles from './compte.module.css';
import { useState, useEffect } from 'react';
import useProfile from '@/hooks/useProfile.js';
import useUpdateProfile from '@/hooks/useUpdateProfile';
import useUpdatePassword from '@/hooks/useUpdatePassword';

export default function Compte() {
    const { profile, isLoadingProfile, errorProfile } = useProfile();
    const { updateProfile, isLoading: isUpdatingProfile } = useUpdateProfile();
    const { updatePassword, isLoading: isUpdatingPassword } =
        useUpdatePassword();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    // Pour vérifier que si l'on change de mot de passe que
    // l'on puisse vérifier que les deux champs sont remplies.
    const changePassword = currentPassword || newPassword;
    useEffect(() => {
        if (profile) {
            setName(profile.data.user.name.split(' ')[1] || '');
            setSurname(profile.data.user.name.split(' ')[0] || '');
            setEmail(profile.data.user.email || '');
        }
    }, [profile]);

    const isLoading = isUpdatingProfile || isUpdatingPassword;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        if (changePassword) {
            if (!currentPassword) {
                setErrorMessage(
                    'Veuillez renseigner votre ancien mot de passe.'
                );
                return;
            }
            if (!newPassword) {
                setErrorMessage('Veuillez renseigner le nouveau mot de passe.');
                return;
            }
        }

        const fullName = `${surname} ${name}`.trim();
        const profileResult = await updateProfile({ name: fullName, email });

        if (!profileResult.success) {
            setErrorMessage(
                profileResult.error || 'Erreur lors de la mise à jour.'
            );
            return;
        }

        if (changePassword) {
            const passwordResult = await updatePassword({
                currentPassword,
                newPassword,
            });

            if (!passwordResult.success) {
                setErrorMessage(
                    passwordResult.error ||
                        'Erreur lors du changement de mot de passe.'
                );
                return;
            }

            setCurrentPassword('');
            setNewPassword('');
        }

        setSuccessMessage('Vos informations ont été mises à jour.');
    };

    if (isLoadingProfile) return <div>Loading ...</div>;
    if (errorProfile) {
        return (
            <div>{`Erreur lors de la récupération du profile : ${errorProfile}`}</div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerInfoUser}>
                <h1 className={styles.title}>Mon compte</h1>
                <p className={styles.nameUser}>{profile.data.user.name}</p>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.containerInput}>
                    <label htmlFor="name">Nom</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.containerInput}>
                    <label htmlFor="surname">Prénom</label>
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.containerInput}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.containerInput}>
                    <label htmlFor="currentPassword">Ancien mot de passe</label>
                    <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.containerInput}>
                    <label htmlFor="newPassword">Nouveau mot de passe</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={styles.input}
                    />
                </div>

                {successMessage && (
                    <p className={styles.success}>{successMessage}</p>
                )}
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}

                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isLoading}
                >
                    {isLoading
                        ? 'Enregistrement...'
                        : 'Modifier les informations'}
                </button>
            </form>
        </div>
    );
}
