import Link from 'next/link';
import styles from '../../../../styles/Start.module.css';

export default function NavBar() {
  return (
    <div className={styles.navBar}>
      <Link className={styles.navBar__link} href='/'>
        Home
      </Link>
      <Link className={styles.navBar__link} href='/'>
        About
      </Link>
      <Link className={styles.navBar__link} href='/'>
        Support
      </Link>
      <Link id={styles.signInButton} href='/login'>
        SIGN IN
        <img src='arrow.svg' id={styles.icon} />
      </Link>
    </div>
  );
}
