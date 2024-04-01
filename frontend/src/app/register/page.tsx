'use client';
import axios from 'axios';
import React, { useState } from 'react';
import styles from '../../../styles/Auth.module.css';
import AuthFooter from '../components/public/AuthFooter';
import AuthSectionTitle from '../components/public/AuthSectionTitle';
import BackgroundImages from '../components/public/BackgroundImages';
import FormComponent from '../components/public/FormComponent';
import IconSection from '../components/public/IconsSection';

interface LoginProps {
  userName: string;
  userPassword: string;
}

export default function Login() {
  const [userName, setUserName] = useState('');
  const [userPassword, setPassword1] = useState('');
  const [password, setPassword2] = useState('');
  const [loginError, setLoginError] = useState(false);
  const inputsData = [
    {
      labelText: 'Username',
      icon: 'person.svg',
      placeholder: 'eg. eljotero',
      type: 'text',
      value: userName,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setUserName(e.target.value),
    },
    {
      labelText: 'Password',
      icon: 'pass.svg',
      placeholder: '********',
      type: 'password',
      value: userPassword,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword1(e.target.value),
    },
    {
      labelText: 'Enter password again',
      icon: 'pass.svg',
      placeholder: '********',
      type: 'password',
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword2(e.target.value),
    },
  ];

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (userName === '' || userPassword === '' || password === '') {
      alert('Please fill in all fields');
      return;
    }
    if (userPassword !== password) {
      alert('Passwords do not match');
      return;
    }
    const formData: LoginProps = {
      userName,
      userPassword,
    };
    setLoginError(false);
    axios
      .post(`http://localhost:3000/users/register`, formData)
      .then((res) => {
        if (res.status === 201) {
          alert('User registered successfully');
          window.location.href = '/login';
        } else if (res.status === 409) {
          alert('User already exists');
        }
      })
      .catch((err) => {
        setLoginError(true);
      });
  };
  return (
    <>
      <div className={styles.flexbox}>
        <div
          className={`${styles.authSection} ${loginError ? styles.error : ''}`}
          style={{ height: '65%' }}
        >
          <AuthSectionTitle />
          <FormComponent inputs={inputsData} welcomeText='Create an account' />
          <AuthFooter type='register' onClick={handleSubmit} />
        </div>
      </div>
      <BackgroundImages />
      <IconSection />
    </>
  );
}
