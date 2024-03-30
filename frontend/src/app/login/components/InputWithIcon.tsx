import React from 'react';
import styles from '../../../../styles/Login.module.css';

interface InputWithIconProps {
  icon: string;
  placeholder: string;
  type: string;
}

export default function InputWithIcon({
  icon,
  placeholder,
  type,
}: InputWithIconProps) {
  return (
    <div className={styles.inputDiv}>
      <img src={icon} />
      <input type={type} placeholder={placeholder} />
    </div>
  );
}
