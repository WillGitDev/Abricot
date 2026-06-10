import styles from './contributorsLabel.module.css';
import UserInitial from '@components/UserInitial';
import Label from '@components/Label';

export default function ContributorsLabel({ owner, usersProject }) {
  if (!usersProject) {
    usersProject = [];
  }
  return (
    <div className={styles.container}>
      <p>
        Contributeurs{' '}
        <span className={styles.contributorsTxt}>
          {usersProject.length + 1} personnes
        </span>
      </p>

      <div className={styles.containerWorkers}>
        {owner && (
          <div className={styles.containerUser}>
            <UserInitial name={owner} isSmall={true} color="orange" />
            <Label tag="owner" />
          </div>
        )}

        {usersProject.map((user, index) => (
          <div className={styles.containerUser} key={`${user}-${index}`}>
            <UserInitial name={user} isSmall={true} color="grey" />
            <Label fullName={user} tag="user" />
          </div>
        ))}
      </div>
    </div>
  );
}
