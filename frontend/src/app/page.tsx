import React from 'react';
import { Inter } from '@next/font/google';
import styles from '../../styles/Start.module.css';
import NavBar from './components/NavBar';
import MiddleSection from './components/MiddleSection';
import ImagesSection from './components/ImagesSection';

const inter = Inter({ subsets: ['latin'] });

export default function MainPage() {
  return (
    <div className={inter.className}>
      <div className={styles.rootDiv}>
        <div className={styles.mainNavBar}>
          <p id={styles.pSpaceCloud}>
            Space
            <span id={styles.spanSpaceCloud}>Cloud</span>
          </p>
          <NavBar />
        </div>
        <MiddleSection />
        <ImagesSection />
      </div>
    </div>
  );
}