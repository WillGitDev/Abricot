import Image from 'next/image';
import styles from './sign_in.module.css';
import Link from 'next/link';

export default function Signin() {
  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <Image src="/logo.svg" alt="Logo" height={32} width={250} />
        <form className={styles.form}>
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
                required
              />
            </div>
            <button type="submit" className={styles.button}>
              <span className={styles.connectWord}>Se connecter</span>
            </button>
          </fieldset>
        </form>
        <p>
          <span className={styles.noAccountText}>Déjà inscrit ?</span>{' '}
          <Link href="/sign_in" className={styles.createAccount}>
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
