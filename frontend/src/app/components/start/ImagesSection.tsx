import React from 'react';
import styles from '../../../../styles/Start.module.css';
import IconSection from '../public/IconsSection';

export default function ImagesSection() {
  return (
    <>
      <img src='pc.svg' className={styles.photo} />
      <img src='glass.svg' className={styles.photo} id={styles.photo2} />
      <IconSection />
    </>
  );
}
