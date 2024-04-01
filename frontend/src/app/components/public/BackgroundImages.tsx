import styles from '../../../../styles/Auth.module.css';

export default function BackgroundImages() {
  return (
    <>
      <img src='glass.svg' id={styles.photo1} className={styles.photo}></img>
      <img src='glass2.svg' id={styles.photo2} className={styles.photo}></img>
    </>
  );
}
