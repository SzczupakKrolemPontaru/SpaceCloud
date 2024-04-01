import React from 'react';
import InputWithIcon from './InputWithIcon';
import WelcomeText from './WelcomeText';
import styles from '../../../../styles/Auth.module.css';

interface InputData {
  labelText: string;
  icon: string;
  placeholder: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FormComponentProps {
  inputs: InputData[];
  welcomeText: string;
}

export default function FormComponent({
  inputs,
  welcomeText,
}: FormComponentProps) {
  return (
    <div className={styles.formDiv}>
      <WelcomeText text={welcomeText} />
      <form>
        {inputs.map((inputData, index) => (
          <InputWithIcon
            key={index}
            labelText={inputData.labelText}
            icon={inputData.icon}
            placeholder={inputData.placeholder}
            type={inputData.type}
            value={inputData.value}
            onChange={inputData.onChange}
          />
        ))}
      </form>
    </div>
  );
}
