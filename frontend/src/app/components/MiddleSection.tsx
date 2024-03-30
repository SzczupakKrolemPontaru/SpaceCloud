import styles from '../../../styles/Start.module.css';

export default function MiddleSection() {
  return (
    <div className={styles.middleSection}>
      <p id={styles.pcsText}>Personal Cloud Storage</p>
      <p className={styles.middleSectionMainText}>
        A perfect <span className={styles.textPurple}>storage</span>
      </p>
      <p className={styles.middleSectionMainText}>
        just <span className={styles.textPurple}>for you.</span>
      </p>
      <p id={styles.middleSectionInfoText}>
        Store, share and collaborate on files and folders from any mobile
        device, tablet or computer.
      </p>
    </div>
  );
}
