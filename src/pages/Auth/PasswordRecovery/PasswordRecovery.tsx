import React, { useEffect, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { doForgetPassword, forgotPassResetState } from 're-ducks/auth';
import styles from '../../../container/authForm/sign.module.scss';
import Image from '../../../assets/img/signIn.svg';
import PasswordRecoveryLogo from '../../../assets/icons/password-recovery.svg';

const PasswordRecovery = () => {
  const email = localStorage.getItem('recoveryEmail');
  const dispatch = useDispatch();

  const handleResendEmail = (event: FormEvent) => {
    event.preventDefault();
    dispatch(
      doForgetPassword(
        { email },
        () => {},
        () => {}
      )
    );
  };

  useEffect((): any => () => dispatch(forgotPassResetState()), [dispatch]);

  return (
    <div className={styles.auth_image_wrapper}>
      <div className={styles.auth_Password_form}>
        <div className={styles.auth_wrapper}>
          <div className={styles.auth_wrapper__content1}>
            <h1 className={styles.auth_wrapper__title}>Password Recovery</h1>
            <p className={styles.auth_wrapper__details}>
              In order to reset your password, we need to verify your Identity. Please click on the verification link sent to{' '}
              <strong className={styles.link__mail}>{email}</strong> to proceed.
            </p>
            <p className={styles.auth_wrapper__resend__mail}>
              Not receiving email?{' '}
              <a className={styles.auth_wrapper__resend__mail} href="/" onClick={handleResendEmail}>
                Resend reset password email.
              </a>
            </p>
            <img className={styles.form} src={PasswordRecoveryLogo} alt="" />
          </div>
        </div>
      </div>
      <div className={styles.auth_image}>
        <img src={Image} alt="" />
      </div>
    </div>
  );
};
export default PasswordRecovery;
