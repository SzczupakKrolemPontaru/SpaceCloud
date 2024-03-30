import React from 'react';
import styles from '../../../styles/Start.module.css';

export default function NavBar() {
  return (
    <div className={styles.navBar}>
      <a href='/' className={styles.navBar__link}>
        Home
      </a>
      <a href='/' className={styles.navBar__link}>
        About
      </a>
      <a href='/' className={styles.navBar__link}>
        Support
      </a>
      <a href='/login' id={styles.signInButton}>
        SIGN IN
      </a>
    </div>
  );
}
