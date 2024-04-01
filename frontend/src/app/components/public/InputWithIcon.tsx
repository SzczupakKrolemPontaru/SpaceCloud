import React from 'react';
import styles from '../../../../styles/Auth.module.css';

interface InputWithIconProps {
  labelText: string;
  icon: string;
  placeholder: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputWithIcon({
  labelText,
  icon,
  placeholder,
  type,
  value,
  onChange,
}: InputWithIconProps) {
  return (
    <>
      <label className={styles.inputLabel}>{labelText}</label>
      <div className={styles.inputDiv}>
        <img src={icon} />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
}
