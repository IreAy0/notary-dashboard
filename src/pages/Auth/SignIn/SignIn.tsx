import React from 'react';
import SignInForm from 'container/authForm/SignInForm';
import Image from '../../../assets/img/signIn.svg';
import styles from '../../../container/authForm/sign.module.scss';

const SignIn = () => (
  <div className={styles.auth_image_wrapper}>
    <div className={styles.auth_Password_form}>
      <SignInForm />
    </div>
    <div className={styles.auth_image}>
      <img src={Image} alt="" />
    </div>
  </div>
);

export default SignIn;
