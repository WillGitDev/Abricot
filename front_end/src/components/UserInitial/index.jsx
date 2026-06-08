import styles from './userInitial.module.css';
import { initialName } from '@/utils/initialName';

export default function UserInitial({ name, isSmall = false, color = 'grey' }) {
  const fullNameLetter = initialName(name);
  const colorMap = {
    orange: styles.bgOrange,
    darkorange: styles.bgDarkOrange,
    grey: styles.bgGrey,
  };

  const sizeClass = isSmall ? styles.small : styles.large;
  const colorClass = colorMap[color.toLowerCase() || styles.grey];
  return (
    <div className={`${sizeClass}  ${colorClass} ${styles.container}`}>
      <p>{fullNameLetter}</p>
    </div>
  );
}
