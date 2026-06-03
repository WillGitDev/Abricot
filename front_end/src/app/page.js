'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
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
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }
      router.push('/dashboard');
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <Image src="/logo.svg" alt="Logo" height={32} width={250} />
        {error && <div className={styles.error}>{error}</div>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Connexion</legend>
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
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
                {isLoading ? 'Connexion...' : 'Se connecter'}
              </span>
            </button>
            <a href="#" className={styles.forgotPassword}>
              Mot de passe oublié ?
            </a>
          </fieldset>
        </form>
        <p>
          <span className={styles.noAccountText}>Pas encore de compte ?</span>{' '}
          <Link href="/sign_in" className={styles.createAccount}>
            Créer un compte
          </Link>
        </p>
      </div>
      <div className={styles.containerImg}>
        <Image
          src="/img_login.jpg"
          fill
          alt="Image de bureau ordonné avec différents éléments de travail"
          className={styles.img}
        />
      </div>
    </div>
  );
}
