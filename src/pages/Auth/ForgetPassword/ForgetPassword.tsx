import React from 'react';
import ForgotPasswordForm from 'container/authForm/ForgotPasswordForm';
import Image from '../../../assets/img/signIn.svg';
import styles from '../../../container/authForm/sign.module.scss';

const ForgotPassword = () => (
  <div className={styles.auth_image_wrapper}>
    <div className={styles.auth_Password_form}>
      <ForgotPasswordForm />
    </div>
    <div className={styles.auth_image}>
      <img src={Image} alt="" />
    </div>
  </div>
);

export default ForgotPassword;
