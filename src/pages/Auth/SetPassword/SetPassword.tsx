import React from 'react';
import SetPasswordForm from 'container/authForm/SetPasswordForm';
import Image from '../../../assets/img/signIn.svg';
import styles from '../../../container/authForm/sign.module.scss';

const SetPassword = () => (
   <div className={styles.auth_signup_wrapper}>
   <div className={styles.auth_form}>
        <SetPasswordForm />
      </div>
    <div className={styles.auth_image}>
      <img src={Image} alt="" />
    </div>
  </div>
);

export default SetPassword;
