import React from 'react';
import styles from '../../../styles/Login.module.css';
import { Inter } from '@next/font/google';
import IconSection from '../components/IconsSection';
import InputWithIcon from './components/InputWithIcon';

const inter = Inter({ subsets: ['latin'] });

export default function Login() {
  return (
    <div className={inter.className}>
      <div className={styles.rootDiv}>
        <div className={styles.flexbox}>
          <div className={styles.chart}>
            <div className={styles.titleDiv}>
              <p>
                Space
                <span>Cloud</span>
              </p>
            </div>
            <div className={styles.formDiv}>
              <div id={styles.welcomeDiv}>
                <p id={styles.pHello}>Hello!</p>
                <p id={styles.pLogIn}>Log in to access your account.</p>
              </div>
              <form>
                <label className={styles.label}> Email address</label>
                <InputWithIcon
                  icon='person.svg'
                  placeholder='eg. kontakt@dgolebiowski.pl'
                  type='email'
                />
                <label className={styles.label}>Password</label>
                <InputWithIcon
                  icon='pass.svg'
                  placeholder='********'
                  type='password'
                />
              </form>
            </div>
            <a href='#' id={styles.passReminder}>
              Forgot password?
            </a>
            <div id={styles.flex}>
              <div id={styles.buttonDiv}>
                <button id={styles.submitButton}>
                  Log in <img src='arrow.svg' />
                </button>
              </div>
              <p id={styles.navigate}>
                Don't have account? <a href='#'>Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <img src='glass.svg' id={styles.photo1} className={styles.photo}></img>
      <img src='glass2.svg' id={styles.photo2} className={styles.photo}></img>
      <IconSection />
    </div>
  );
}
