'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from '../../../lib/axios';
import styles from '../../../styles/Auth.module.css';
import { setToken } from '../../store/tokenSlice';
import { setUser } from '../../store/userSlice';
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
  const [userPassword, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const dispatch = useDispatch();

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
        setPassword(e.target.value),
    },
  ];

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (userName === '' || userPassword === '') {
      alert('Please fill in all fields');
      return;
    }
    const formData: LoginProps = {
      userName,
      userPassword,
    };
    setLoginError(false);
    axios
      .post(`/users/login`, formData)
      .then((res) => {
        if (res.status === 201) {
          dispatch(setToken(res.data.token));
          dispatch(setUser(res.data.userName));
          window.location.href = '/dashboard';
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
          style={{ height: '60%' }}
        >
          <AuthSectionTitle />
          <FormComponent
            inputs={inputsData}
            welcomeText='Log in to access your account.'
          />
          <AuthFooter type='login' onClick={handleSubmit} />
        </div>
      </div>
      <BackgroundImages />
      <IconSection />
    </>
  );
}
