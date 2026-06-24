'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './sign_in.module.css';
import Link from 'next/link';
import { toast } from 'sonner';

export default function Signin() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password }),
            });
            const data = await response.json();
            if (!response.ok) {
                toast.error(data.message);
                setError(data.message);
                return;
            }
            toast.success('Vous êtes bien enregistrer');
            router.push('/dashboard');
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.containerForm}>
                <Image
                    src="/logo.svg"
                    alt="logo du site Abricot"
                    height={32}
                    width={250}
                />
                {error && <div className={styles.error}>{error}</div>}
                <form className={styles.form} onSubmit={handleSubmit}>
                    <fieldset className={styles.fieldset}>
                        <legend className={styles.legend}>Inscription</legend>
                        <div className={styles.groupEmail}>
                            <label htmlFor="email" className={styles.label}>
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.groupPassword}>
                            <label htmlFor="password" className={styles.label}>
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className={styles.button}
                            disabled={isLoading}
                        >
                            <span className={styles.connectWord}>
                                {isLoading ? 'Inscription...' : "S'inscrire"}
                            </span>
                        </button>
                    </fieldset>
                </form>
                <p>
                    <span className={styles.noAccountText}>Déjà inscrit ?</span>{' '}
                    <Link href="/" className={styles.createAccount}>
                        Se connecter
                    </Link>
                </p>
            </div>
            <div className={styles.containerImg}>
                <Image
                    src="/img_signin.jpg"
                    fill
                    alt="Image de bureau ordonné avec différents éléments de travail"
                    className={styles.img}
                />
            </div>
        </div>
    );
}
