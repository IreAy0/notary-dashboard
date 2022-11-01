import React from 'react';
import ReSetPasswordForm from 'container/authForm/ResetPasswordForm';
import Image from '../../../assets/img/signIn.svg';
import styles from '../../../container/authForm/sign.module.scss';

const ReSetPassword = () => (
  <div className={styles.auth_image_wrapper}>
    <div className={styles.auth_Password_form}>
      <ReSetPasswordForm />
    </div>
    <div className={styles.auth_image}>
      <img src={Image} alt="" />
    </div>
  </div>
);

export default ReSetPassword;
