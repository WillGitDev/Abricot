import styles from './cardTasks.module.css';
import Label from '@/components/Label';
import Image from 'next/image';
import { dateFormatDM } from '@/utils/dateFormatDM';

export default function CardTasks({ tasks }) {
  console.log();
  return (
    <>
      {tasks.map((task) => (
        <div key={task.id} className={styles.container}>
          <div className={styles.containerInfoTasks}>
            <h3 className={styles.h3}>{task.title}</h3>
            <p className={styles.txtGrey}>{task.description}</p>
          </div>
          <div className={styles.label}>
            <Label tag={task.status} />
          </div>
          <div className={styles.containerInfoProject}>
            <Image
              src="/logo_file_grey.svg"
              width={18}
              height={15}
              alt="logo de fichier"
            />
            <p className={styles.txtGrey}>{task.project.name}</p>
            <p>|</p>
            <Image
              src="/calendar_grey.svg"
              width={15}
              height={16}
              alt="Logo d'un calendrier"
            />
            <p className={styles.txtGrey}>{dateFormatDM(task.dueDate)}</p>
            <p>|</p>
            <Image
              src="/commentaire.svg"
              width={15}
              height={16}
              alt="Logo d'une bulle de dialogue"
            />
            <p className={styles.txtGrey}>2</p>
          </div>
          <button type="button" className={styles.buttonSeeTasks}>
            Voir
          </button>
        </div>
      ))}
    </>
  );
}
