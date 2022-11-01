import React from 'react';
import SignUpForm from 'container/authForm/SignupForm';
import Image from '../../../assets/img/signIn.svg';
import styles from '../../../container/authForm/sign.module.scss';

const SignUp = () => (
  <div className={styles.auth_signup_wrapper}>
    <div className={styles.auth_form}>
      <SignUpForm />
    </div>
    <div className={styles.auth_image}>
      <img src={Image} alt="" />
    </div>
  </div>
);

export default SignUp;
