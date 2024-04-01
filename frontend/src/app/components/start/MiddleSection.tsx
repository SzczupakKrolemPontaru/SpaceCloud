import styles from '../../../../styles/Start.module.css';

export default function MiddleSection() {
  return (
    <div className={styles.middleSection}>
      <p id={styles.pcsText}>Personal Cloud Storage</p>
      <p className={styles.middleSectionMainText}>
        A perfect <span style={{ color: 'var(--purpleColor)' }}>storage</span>
      </p>
      <p className={styles.middleSectionMainText}>
        just <span style={{ color: 'var(--purpleColor)' }}>for you.</span>
      </p>
      <p id={styles.middleSectionInfoText}>
        Store, share and collaborate on files and folders from any mobile
        device, tablet or computer.
      </p>
    </div>
  );
}
